import { Link } from "react-router";
import s from "./MovieItem.module.css";
import Skeleton from 'react-loading-skeleton';

type Props = {
    id: number;
    path: string;
    title: string;
    vote: number;
    img: null | string;
    isLiked?: boolean;
    onLikeClick?: (id: number) => void;
    loading?: boolean;
    size?: "md" | "sm";
};

const MovieItem = (props: Props) => {
    const { id, path, title, vote, img, isLiked, onLikeClick, loading, size = "md" } = props;
    const cardClass = `${s.card} ${size === "sm" ? s.cardSmall : ""}`;
    const linkClass = `${s.linkItem} ${size === "sm" ? s.linkItemSmall : ""}`;

    const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (onLikeClick) {
            onLikeClick(id);
        }
    };



    const voteValue = typeof vote === 'number' && !isNaN(vote) ? vote.toFixed(1) : "0.0";
    const hasPoster = Boolean(img);

    if (loading) {
  return (
    <article className={cardClass}>
      <Skeleton width={size === "sm" ? 180 : 220} height={size === "sm" ? 270 : 330} />
      <Skeleton width={size === "sm" ? 140 : 180} height={20} style={{ marginTop: 8 }} />
    </article>
  );
}

    return (
        <article className={cardClass}>
            <div className={linkClass}>
                <Link to={`/${path}`} className={s.linkMovie}>
                    {hasPoster ? (
                        <img
                            width={220}
                            height={330}
                            src={`https://image.tmdb.org/t/p/w1280${img}`}
                            alt={title}
                        />
                    ) : (
                        <span className={s.posterFallback}>No poster</span>
                    )}
                </Link>

                <button
                    className={`${s.likeButton} ${isLiked ? s.liked : ""}`}
                    onClick={handleLikeClick}
                    type="button"
                    aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                >
                    {isLiked ? "❤️" : "♡"}
                </button>

                <span className={s.star}>{voteValue}</span>
            </div>

            <h3 className={s.title}>{title}</h3>
        </article>
    );
};

export default MovieItem;