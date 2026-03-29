import { Route, Routes } from "react-router";
import { PageNotFound } from "../components/PageNotFound/PageNotFound";
import { CategoryPage } from "@/features/movie/ui/Category/CategoryPage";
import { SearchPage } from "@/features/movie/ui/Search/SearchPage";
import { FavoritesPage } from "@/features/movie/ui/Favorites/FavoritesPage";
import { PopularMovies } from "@/features/movie/ui/Main/PopularMovies/PopularMovies";
import { FilteredPages } from "@/features/movie/ui/Filtered/FilteredPages";
import { MainPage } from "@/features/movie/ui/Main/MainPage";
import { MoviePage } from "@/features/movie/ui/Movie/MoviePage";

export const Path = {
  Main: "/",
  Category: "/category",
  CategoryDetail: "/category/:categoryId",
  Popular: "/popular",
  Search: "/search",
  Favorites: "/favorites",
  Filtered: "/filtered",
  MovieDetail: "/movie/:id",
  NotFound: "*",
} as const;

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Category} element={<CategoryPage />} />
    <Route path={Path.CategoryDetail} element={<CategoryPage />} />
    <Route path={Path.Popular} element={<PopularMovies />} />
    <Route path={Path.Search} element={<SearchPage />} />
    <Route path={Path.Favorites} element={<FavoritesPage />} />
    <Route path={Path.Filtered} element={<FilteredPages />} />
    <Route path={Path.MovieDetail} element={<MoviePage />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
);