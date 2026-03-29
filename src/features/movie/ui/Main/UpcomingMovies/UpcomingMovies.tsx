import { useFetchUpcomingApiQuery } from "@/features/movie/api/movieApi";
import { MoviesList } from "../MoviesList/MoviesList"



export const UpcomingMovies = () => {
   const { data } = useFetchUpcomingApiQuery ({});


  return (
     <MoviesList title="Upcoming Movies" data={data}/>
  )
}