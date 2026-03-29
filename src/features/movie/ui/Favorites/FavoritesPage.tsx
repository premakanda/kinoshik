import { type FavoriteMovie, useFavorites } from "@/common/hooks/useFavorites";
import MovieItem from "../Main/MoviesList/MovieItem/MovieItem";
import s from "./FavoritesPage.module.css"

export const FavoritesPage = () => {
    const { favorites: globalFavorites, toggleFavorite } = useFavorites();
    
    const handleToggleFavorite = (id: number) => {
        const movie = globalFavorites.find(fav => fav.id === id);
        if (movie) {
            toggleFavorite({
                id: movie.id,
                title: movie.title,
                img: movie.posterUrl,
                vote: movie.vote_average
            });
        }
    };

    return (
        <div className={s.container}>
            <h1 className={s.title}>Favorite Movies</h1>
            {globalFavorites.length === 0 && <div className={s.text}>Add movies to favorites to see them on this page.</div>}
            <div className={s.moviesList}>
            {globalFavorites.map((movie: FavoriteMovie) => (
                <MovieItem 
                    key={movie.id}
                    id={movie.id}
                    path={`movie/${movie.id}`}
                    title={movie.title}
                    vote={movie.vote_average}
                    img={movie.posterUrl}
                    isLiked={true}
                    onLikeClick={() => handleToggleFavorite(movie.id)}
                />
            ))}
            </div>
        </div>
    );
};