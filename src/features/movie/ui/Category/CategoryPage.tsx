import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MoviesList } from "../Main/MoviesList/MoviesList"
import s from "./CategoryPage.module.css"
import { useMovieCategories } from '@/common/hooks/useMovieCategories';
import { useFetchPopularApiQuery, useFetchRatedApiQuery, useFetchUpcomingApiQuery, useFetchPlayingApiQuery } from '@/features/movie/api/movieApi';

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>(categoryId || 'popular');
  const [page, setPage] = useState<number>(1);

  const { categories } = useMovieCategories();

  const { data: popularData, isLoading: popularLoading, isError: popularError } = useFetchPopularApiQuery(
    { page },
    { skip: activeCategory !== 'popular' },
  );
  const { data: ratedData, isLoading: ratedLoading, isError: ratedError } = useFetchRatedApiQuery(
    { page },
    { skip: activeCategory !== 'top_rated' },
  );
  const { data: upcomingData, isLoading: upcomingLoading, isError: upcomingError } = useFetchUpcomingApiQuery(
    { page },
    { skip: activeCategory !== 'upcoming' },
  );
  const { data: playingData, isLoading: playingLoading, isError: playingError } = useFetchPlayingApiQuery(
    { page },
    { skip: activeCategory !== 'now_playing' },
  );

  const currentCategory = categories.find(c => c.id === activeCategory);

  const activeData =
    activeCategory === 'popular' ? popularData :
    activeCategory === 'top_rated' ? ratedData :
    activeCategory === 'upcoming' ? upcomingData :
    playingData;

  const isLoading = popularLoading || ratedLoading || upcomingLoading || playingLoading;
  const isError = popularError || ratedError || upcomingError || playingError;
  const totalPages = activeData?.total_pages || 1;

  const handleCategoryChange = (newCategoryId: string) => {
    setActiveCategory(newCategoryId);
    setPage(1);
    navigate(`/category/${newCategoryId}`);
  };

  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

  if (!currentCategory) {
    return <div>Category not found</div>;
  }

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {categories.map((category) => (
          <li key={category.id} className={s.listItem}>
            <button
              className={`${s.button} ${activeCategory === category.id ? s.active : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.title}
            </button>
          </li>
        ))}
      </ul>

      <MoviesList
        title={currentCategory.title}
        data={activeData}
        viewMoreLink={undefined}
      />

      <div className={s.pagination}>
        <button type="button" className={s.pageBtn} onClick={handlePrev} disabled={page <= 1 || isLoading}>
          Prev
        </button>
        <span className={s.pageInfo}>
          Page {page} of {totalPages}
        </span>
        <button type="button" className={s.pageBtn} onClick={handleNext} disabled={page >= totalPages || isLoading}>
          Next
        </button>
      </div>

      {isLoading && <div className={s.message}>Loading...</div>}
      {isError && <div className={s.message}>Error loading movies.</div>}
    </div>
  );
};