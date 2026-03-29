import { useParams, Link } from "react-router";
import s from "./MoviePage.module.css";
import { BackButton } from "@/common/components/BackButton/BackButton";
import {
  useFetchCreditsApiQuery,
  useFetchMovieDetailsApiQuery,
  useFetchSimilarApiQuery,
} from "@/features/movie/api/movieApi";

const formatReleaseYear = (releaseDate: string | undefined) => {
  if (!releaseDate) return "N/A";
  return releaseDate.slice(0, 4);
};

const formatRuntime = (runtimeMinutes: number | null | undefined) => {
  if (!runtimeMinutes) return "N/A";
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;

  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  return `${minutes}m`;
};

export const MoviePage = () => {
  const { id } = useParams();
  const movieId = id ?? "";
  const shouldSkip = !movieId;

  const { data: movie, isError: isMovieError, isLoading: isMovieLoading } = useFetchMovieDetailsApiQuery(
    { id: movieId },
    { skip: shouldSkip }
  );

  const { data: creditsData, isLoading: isCreditsLoading } = useFetchCreditsApiQuery(
    { id: movieId, params: { language: "en-US" } },
    { skip: shouldSkip }
  );

  const { data: similarData, isLoading: isSimilarLoading } = useFetchSimilarApiQuery(
    { id: movieId, params: { language: "en-US", page: 1 } },
    { skip: shouldSkip }
  );

  const isLoading = isMovieLoading || isCreditsLoading || isSimilarLoading;

  if (!movieId) return <div className={s.page}></div>;
  if (isMovieError) return <div className={s.page}>Movie not found</div>;
  if (isLoading || !movie) return <div className={s.page}></div>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
    : null;

  const cast = creditsData?.cast?.slice(0, 6) ?? [];
  const castCards = Array.from({ length: 6 }, (_, idx) => cast[idx]);

  const similarMovies = similarData?.results?.slice(0, 6) ?? [];
  const similarCards = Array.from({ length: 6 }, (_, idx) => similarMovies[idx]);

  return (
    <div className={s.page}>
      <div className={s.container}>
        <aside className={s.right}>
          {posterUrl ? (
            <img className={s.poster} src={posterUrl} alt={`Poster of ${movie?.title}`} />
          ) : (
            <div className={s.posterFallback}>No poster</div>
          )}
        </aside>
        <section className={s.left}>
          <div className={s.titleRow}>
            <h1 className={s.title}>{movie?.title}</h1>
            <BackButton />
          </div>

          <div className={s.metaLine}>
            <span>Release year: {formatReleaseYear(movie.release_date)}</span>
            <span>Rating: {movie.vote_average.toFixed(1)}</span>
            <span>Runtime: {formatRuntime(movie.runtime)}</span>
          </div>

          <p className={s.overview}>{movie.overview}</p>

          <h2 className={s.sectionTitle}>Genres</h2>
          <div className={s.genresRow}>
            {movie.genres.map((g) => (
              <span key={g.id} className={s.genrePill}>
                {g.name}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className={s.wrapper}>

      <div className={s.castSection}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Cast</h2>
          <div className={s.castGrid}>
            {castCards.map((actor, index) => {
              const profileUrl = actor?.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : null;
              const fallbackLetter = actor?.name?.[0]?.toUpperCase() ?? "?";

              return (
                <div key={actor?.id ?? `placeholder-${index}`} className={s.actorCard}>
                  {profileUrl ? (
                    <img
                      className={s.actorImg}
                      src={profileUrl}
                      alt={actor?.name ?? "Actor"}
                      width={90}
                      height={90}
                    />
                  ) : (
                    <div className={s.actorFallback} aria-label="No actor photo">
                      {fallbackLetter}
                    </div>
                  )}

                  <div className={s.actorName} title={actor?.name ?? ""}>
                    {actor?.name ?? "Unknown"}
                  </div>
                  <div className={s.actorRole} title={actor?.character ?? ""}>
                    {actor?.character ? `as ${actor.character}` : "Role N/A"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={s.similarSection}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Similar Movies</h2>
          <div className={s.similarGrid}>
            {similarCards.map((m, index) => {
              if (!m) {
                return (
                  <div key={`similar-placeholder-${index}`} className={s.similarCard}>
                    <div className={s.similarFallback}>No poster</div>
                    <div className={s.similarTitle}>Unknown</div>
                  </div>
                );
              }

              return (
                <Link key={m.id} to={`/movie/${m.id}`} className={s.similarCard}>
                  {m.poster_path ? (
                    <img
                      className={s.similarPoster}
                      src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                      alt={m.title}
                    />
                  ) : (
                    <div className={s.similarFallback}>No poster</div>
                  )}
                  <div className={s.similarTitle}>{m.title}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

