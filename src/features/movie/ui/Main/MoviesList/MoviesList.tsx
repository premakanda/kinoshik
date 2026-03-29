import { useNavigate } from "react-router";
import s from "./MoviesList.module.css";
import type { Movie, Response } from "@/features/movie/api/movieApi.types";
import MovieItem from "./MovieItem/MovieItem";
import { useFavorites } from "@/common/hooks/useFavorites";

interface Props {
  data: Response | undefined;
  title: string;
  viewMoreLink?: string; // опциональная ссылка для кнопки "View more"
  limit?: number; // опциональное ограничение количества фильмов
  loading?: boolean; // флаг загрузки для отображения скелетона
}

export const MoviesList = ({ data, title, viewMoreLink, limit, loading }: Props) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const movies = limit ? data?.results.slice(0, limit) : data?.results || [];

  const handleViewMore = () => {
    if (viewMoreLink) {
      navigate(viewMoreLink);
    }
  };
  const handleToggleFavorite = (item: Movie) => {
    toggleFavorite({
      id: item.id,
      title: item.title,
      img: item.poster_path,
      vote: item.vote_average,
    });
  };

  return (
    <div className={s.moviesInner}>
      <div className={s.titleInner}>
        <h2 className={s.title}>{title}</h2>
        {viewMoreLink && (
          <button className={s.link} onClick={handleViewMore}>
            View more
          </button>
        )}
      </div>
      <ul className={s.list}>
        {movies?.map((item) => (
          <li className={s.listItem} key={item.id}>
            <MovieItem
              key={item.id}
              id={item.id}
              path={`movie/${item.id}`}
              title={item.title}
              vote={item.vote_average}
              img={item.poster_path}
              isLiked={isFavorite(item.id)}
              onLikeClick={() => handleToggleFavorite(item)}
              loading={loading}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
