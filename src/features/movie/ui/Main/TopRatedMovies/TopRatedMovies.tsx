import { useFetchRatedApiQuery } from "@/features/movie/api/movieApi";
import { MoviesList } from "../MoviesList/MoviesList";


export const TopRatedMovies = () => {
    const { data } = useFetchRatedApiQuery({});

  return (
    <MoviesList title="Top Rated Movies" data={data}/>
   
  );
};
