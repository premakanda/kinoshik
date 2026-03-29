import { SearchItem } from "./SearchItem/SearchItem"
import { MoviesList } from "./MoviesList/MoviesList"
import s from "./MainPages.module.css"
import { useMovieCategories } from "@/common/hooks/useMovieCategories";

import "react-loading-skeleton/dist/skeleton.css";

// const MovieItemSkeleton = () => (
//   <article className={s.card}>
//     <Skeleton width={220} height={330} />
//     <div className={s.cardContent}>
//       <Skeleton width={150} height={22} style={{ marginTop: 8 }} />
//       <Skeleton width={60} height={20} style={{ marginTop: 4 }} />
//     </div>
//   </article>
// );

export const MainPage = () => {
  const { categories, isLoading } = useMovieCategories();
  console.log("MAIN", { isLoading, categories });

  // if (isLoading) {
  //   return (
  //     <main className={s.main}>
  //       <SearchItem mode="home" />
  //       <div className={s.skeletonGrid}>
  //         {Array.from({ length: 6 }).map((_, index) => (
  //           <MovieItemSkeleton key={index} />
  //         ))}
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <>
      <SearchItem mode="home" />
      <div className={s.container}>
      {categories.map((category) => (
        <MoviesList 
          key={category.id}
          title={category.title} 
          data={category.data}
          viewMoreLink={category.path} // передаем ссылку для кнопки "View more"
          limit={5} // показываем только 5 фильмов на главной
          loading={isLoading} // передаем флаг загрузки для отображения скелетона
        />
      ))}
      </div>
    </>
  );
}