import { useEffect, useMemo, useState } from "react";
import s from "./FilteredPages.module.css";
import type { DiscoverMovieSortBy } from "@/common/enums";
import { useFetchDiscoverApiQuery, useFetchGenreApiQuery } from "@/features/movie/api/movieApi";
import MovieItem from "@/features/movie/ui/Main/MoviesList/MovieItem/MovieItem";
import { useFavorites } from "@/common/hooks/useFavorites";

export const FilteredPages = () => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const sortOptions: Array<{ label: string; value: DiscoverMovieSortBy }> = useMemo(
    () => [
      { label: "Popularity ↓", value: "popularity.desc" },
      { label: "Popularity ↑", value: "popularity.asc" },
      { label: "Rating ↓", value: "vote_average.desc" },
      { label: "Rating ↑", value: "vote_average.asc" },
      { label: "Release date ↓", value: "release_date.desc" },
      { label: "Release date ↑", value: "release_date.asc" },
      { label: "Title A→Z", value: "original_title.asc" },
      { label: "Title Z→A", value: "original_title.desc" },
    ],
    [],
  );

  const DEFAULT_SORT: DiscoverMovieSortBy = "popularity.desc";
  const DEFAULT_MIN = 0.0;
  const DEFAULT_MAX = 10.0;

  const [sortBy, setSortBy] = useState<DiscoverMovieSortBy>(DEFAULT_SORT);
  const [ratingMin, setRatingMin] = useState<number>(DEFAULT_MIN);
  const [ratingMax, setRatingMax] = useState<number>(DEFAULT_MAX);
  const [debouncedMin, setDebouncedMin] = useState<number>(DEFAULT_MIN);
  const [debouncedMax, setDebouncedMax] = useState<number>(DEFAULT_MAX);
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const clamp01 = (n: number) => Math.min(10, Math.max(0, n));
  const step01 = (n: number) => Math.round(n * 10) / 10;

  // Debounce 200ms for rating sliders to avoid spamming requests.
  useEffect(() => {
    const t = window.setTimeout(() => {
      setDebouncedMin(ratingMin);
      setDebouncedMax(ratingMax);
    }, 200);
    return () => window.clearTimeout(t);
  }, [ratingMin, ratingMax]);

  const withGenresParam = selectedGenreIds.length ? selectedGenreIds.join(",") : undefined;

  const { data: genresData, isLoading: genresLoading, isError: genresError } = useFetchGenreApiQuery("");

  const discoverParams = useMemo(
    () => ({
      page,
      sort_by: sortBy,
      "vote_average.gte": debouncedMin,
      "vote_average.lte": debouncedMax,
      ...(withGenresParam ? { with_genres: withGenresParam } : {}),
    }),
    [page, sortBy, debouncedMin, debouncedMax, withGenresParam],
  );

  const {
    data: discoverData,
    isLoading: discoverLoading,
    isError: discoverError,
  } = useFetchDiscoverApiQuery(discoverParams);

  const totalPages = discoverData?.total_pages ?? 0;

  // const clampToStep = (value: number) => Math.round(value * 10) / 10;

  const handleToggleGenre = (id: number) => {
    setPage(1);
    setSelectedGenreIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // const handleMinChange = (next: number) => {
  //   const v = clampToStep(next);
  //   setPage(1);
  //   setRatingMin(v > ratingMax ? ratingMax : v);
  // };

  // const handleMaxChange = (next: number) => {
  //   const v = clampToStep(next);
  //   setPage(1);
  //   setRatingMax(v < ratingMin ? ratingMin : v);
  // };

  const handleReset = () => {
    setSortBy(DEFAULT_SORT);
    setRatingMin(DEFAULT_MIN);
    setRatingMax(DEFAULT_MAX);
    setDebouncedMin(DEFAULT_MIN);
    setDebouncedMax(DEFAULT_MAX);
    setSelectedGenreIds([]);
    setPage(1);
  };

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    if (totalPages <= 0) return;
    setPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <div className={s.container}>
      <div className={s.filtredInner}>
        <aside className={s.sidebar}>
          <div className={s.block}>
            <h2 className={s.blockTitle}>Sort</h2>
            <select
              className={s.select}
              value={sortBy}
              onChange={(e) => {
                setPage(1);
                setSortBy(e.currentTarget.value as DiscoverMovieSortBy);
              }}>
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className={s.block}>
            <h2 className={s.blockTitle}>Rating</h2>
            <div className={s.rangeRow}>
              {/* <div className={s.bubbles}>
          <div className={s.bubble} style={{ left: `${minPercent}%` }}>
            {ratingMin.toFixed(1)}
          </div>
          <div className={s.bubble} style={{ left: `${maxPercent}%` }}>
            {ratingMax.toFixed(1)}
          </div>
        </div> */}

              <span className={s.rangeValue}>{ratingMin.toFixed(1)}</span>
              <span className={s.rangeDash}>—</span>
              <span className={s.rangeValue}>{ratingMax.toFixed(1)}</span>
            </div>

            {/* <div className={s.ratingValues}>
              <span>Min: {ratingMin.toFixed(1)}</span>
              <span>Max: {ratingMax.toFixed(1)}</span>
            </div> */}

            {/* <div className={s.sliders}>
              <label className={s.sliderRow}>
                <span className={s.sliderLabel}>Min</span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.1}
                  value={ratingMin}
                  onChange={(e) => handleMinChange(Number(e.currentTarget.value))}
                />
              </label>
              <label className={s.sliderRow}>
                <span className={s.sliderLabel}>Max</span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.1}
                  value={ratingMax}
                  onChange={(e) => handleMaxChange(Number(e.currentTarget.value))}
                />
              </label>
            </div> */}
            {(() => {
              const minPercent = (ratingMin / 10) * 100;
              const maxPercent = (ratingMax / 10) * 100;
              return (
                <div className={s.rangeWrap}>
                  <div className={s.track} />
                  <div
                    className={s.trackSelected}
                    style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
                  />
                  {/* Левый ползунок (min) */}
                  <input
                    className={`${s.range} ${s.rangeMin}`}
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    value={ratingMin}
                    onChange={(e) => {
                      setPage(1);
                      const next = step01(clamp01(Number(e.currentTarget.value)));
                      // не даём min пересечь max
                      setRatingMin(next > ratingMax ? ratingMax : next);
                    }}
                  />
                  {/* Правый ползунок (max) */}
                  <input
                    className={`${s.range} ${s.rangeMax}`}
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    value={ratingMax}
                    onChange={(e) => {
                      setPage(1);
                      const next = step01(clamp01(Number(e.currentTarget.value)));
                      // не даём max пересечь min
                      setRatingMax(next < ratingMin ? ratingMin : next);
                    }}
                  />
                </div>
              );
            })()}
          </div>

          <div className={s.block}>
            <h2 className={s.blockTitle}>Genres</h2>
            {genresLoading ? (
              <div className={s.message}>Loading genres...</div>
            ) : genresError ? (
              <div className={s.message}>Failed to load genres</div>
            ) : (
              <div className={s.genreGrid}>
                {genresData?.genres.map((g) => {
                  const active = selectedGenreIds.includes(g.id);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      className={`${s.genrePill} ${active ? s.genrePillActive : ""}`}
                      onClick={() => handleToggleGenre(g.id)}>
                      {g.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button type="button" className={s.resetBtn} onClick={handleReset}>
            Reset filters
          </button>
        </aside>

        <section className={s.results}>
          <div className={s.resultsHeader}>
            {/* <h1 className={s.title}>Filtered Movies</h1> */}
            {/* <div className={s.subTitle}>
              {discoverLoading ? "Loading..." : `Results: ${discoverData?.total_results ?? 0}`}
            </div> */}
          </div>

          {discoverError ? (
            <div className={s.message}>Failed to load movies</div>
          ) : discoverLoading ? (
            <div className={s.message}>Loading movies...</div>
          ) : discoverData?.results?.length ? (
            <ul className={s.grid}>
              {discoverData.results.map((m) => (
                <li key={m.id} className={s.gridItem}>
                  <MovieItem
                    id={m.id}
                    path={`movie/${m.id}`}
                    title={m.title}
                    vote={m.vote_average}
                    img={m.poster_path}
                    size="sm"
                    isLiked={isFavorite(m.id)}
                    onLikeClick={() =>
                      toggleFavorite({
                        id: m.id,
                        title: m.title,
                        img: m.poster_path,
                        vote: m.vote_average,
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className={s.message}>No movies found</div>
          )}

          <div className={s.pagination}>
            <button type="button" className={s.pageBtn} onClick={handlePrev} disabled={page <= 1}>
              Prev
            </button>
            <span className={s.pageInfo}>
              Page {page} of {totalPages || 1}
            </span>
            <button
              type="button"
              className={s.pageBtn}
              onClick={handleNext}
              disabled={totalPages <= 0 || page >= totalPages}>
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
