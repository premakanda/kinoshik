import { useFetchPlayingApiQuery } from "@/features/movie/api/movieApi"
import { MoviesList } from "../MoviesList/MoviesList"


export const PlayingMovies = () => {

  const {data} = useFetchPlayingApiQuery({})


  return (
      <MoviesList title="Now Playing Movies" data={data}/>
  )
}