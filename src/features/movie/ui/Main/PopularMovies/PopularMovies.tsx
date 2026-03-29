import { useFetchPopularApiQuery } from "@/features/movie/api/movieApi";
import { MoviesList } from "../MoviesList/MoviesList"


export const PopularMovies = () => {
  const { data} = useFetchPopularApiQuery({});

  return (
      <MoviesList title="Popular Movies" data={data}/>
  )
}