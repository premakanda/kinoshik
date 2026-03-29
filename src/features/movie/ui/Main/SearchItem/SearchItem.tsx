import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import s from "./SearchItem.module.css";
import { useFetchPopularApiQuery, useFetchSearchApiQuery } from "@/features/movie/api/movieApi";
import { Path } from "@/common/routing/Routing";
import MovieItem from "../MoviesList/MovieItem/MovieItem";
import { useFavorites } from "@/common/hooks/useFavorites";

type SearchItemProps = {
  mode?: "home" | "search";
};

export const SearchItem = ({ mode = "home" }: SearchItemProps) => {
  const isSearchPage = mode === "search";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();

  const initialQuery = isSearchPage ? (searchParams.get("query")?.trim() ?? "") : "";
  const initialPage = isSearchPage ? Number(searchParams.get("page") ?? "1") : 1;

  const [search, setSearch] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [page, setPage] = useState(Number.isFinite(initialPage) && initialPage > 0 ? initialPage : 1);

  const { data: popularData } = useFetchPopularApiQuery({ language: "en-US", page: 1 }, { skip: isSearchPage });

  const {
    data: searchData,
    isLoading,
    isError,
  } = useFetchSearchApiQuery(
    {
      query: submittedQuery,
      language: "en-US",
      page,
      include_adult: false,
    },
    { skip: !isSearchPage || !submittedQuery },
  );

  const firstMovie = popularData?.results?.[0];
  const backdropUrl = firstMovie?.backdrop_path ? `https://image.tmdb.org/t/p/w1280${firstMovie.backdrop_path}` : null;

  const handleSearch = () => {
    const normalizedQuery = search.trim();

    if (!normalizedQuery) {
      if (isSearchPage) {
        setSubmittedQuery("");
        setPage(1);
        setSearchParams({}, { replace: true });
      }
      return;
    }

    if (!isSearchPage) {
      navigate(`${Path.Search}?query=${encodeURIComponent(normalizedQuery)}`);
      return;
    }

    setSubmittedQuery(normalizedQuery);
    setPage(1);
    setSearchParams({ query: normalizedQuery, page: "1" }, { replace: true });
  };

  const handleInputChange = (value: string) => {
    setSearch(value);

    if (isSearchPage && value.trim() === "") {
      setSubmittedQuery("");
      setPage(1);
      setSearchParams({}, { replace: true });
    }
  };

  const handleToggleFavorite = (item: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
  }) => {
    toggleFavorite({
      id: item.id,
      title: item.title,
      img: item.poster_path,
      vote: item.vote_average,
    });
  };

  const totalPages = searchData?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    if (!submittedQuery || nextPage < 1 || nextPage > totalPages) {
      return;
    }

    setPage(nextPage);
    setSearchParams({ query: submittedQuery, page: String(nextPage) }, { replace: true });
  };

  return (
    <section
      className={`${s.search} ${isSearchPage ? s.searchPage : ""}`}
      style={{
        backgroundImage:
          !isSearchPage && backdropUrl
            ? `linear-gradient(rgba(4, 21, 45, 0) 0%, rgb(18, 18, 18) 79.17%), url(${backdropUrl})`
            : "none",
      }}>
      <div className={s.container}>
        {/* <div className={s.blockList}> */}
          {!isSearchPage && (
            <>
              <h1 className={s.title}>Welcome</h1>
              <p className={s.text}>Browse highlighted titles from TMDB</p>
            </>
          )}

          {isSearchPage && <h1 className={s.searchPageTitle}>Search Results</h1>}

          <div className={s.input}>
            <input
              className={s.inputField}
              type="search"
              placeholder="Search for a movie"
              value={search}
              onChange={(e) => handleInputChange(e.currentTarget.value)}
            />
            <button onClick={handleSearch} className={s.inputBtn} disabled={!search.trim()}>
              Search
            </button>
          </div>

          {isSearchPage && (
            <div className={s.resultsBlock}>
              {!submittedQuery && <p className={s.message}>Enter a movie title to start searching</p>}

              {submittedQuery && isError && <p className={s.message}>Error fetching results</p>}

              {submittedQuery && !isLoading && !isError && searchData?.results.length === 0 && (
                <p className={s.message}>No matches found for "{submittedQuery}"</p>
              )}

              {submittedQuery && !isLoading && !isError && !!searchData?.results.length && (
                <>
                  <p className={s.resSearch}>Results for "{submittedQuery}"</p>
                  <ul className={s.items}>
                    {searchData.results.map((item) => (
                      <li className={s.listItem} key={item.id}>
                        <MovieItem
                          id={item.id}
                          path={`movie/${item.id}`}
                          title={item.title}
                          vote={item.vote_average}
                          img={item.poster_path}
                          isLiked={isFavorite(item.id)}
                          onLikeClick={() => handleToggleFavorite(item)}
                        />
                      </li>
                    ))}
                  </ul>

                  {totalPages > 1 && (
                    <div className={s.pagination}>
                      <button className={s.pageBtn} onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                        Prev
                      </button>
                      <span className={s.pageInfo}>
                        Page {page} of {totalPages}
                      </span>
                      <button
                        className={s.pageBtn}
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}>
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        {/* </div> */}
      </div>
    </section>
  );
};
