// hooks/useMovieCategories.ts

// hooks/useMovieCategories.ts
import { useMemo } from 'react';
import { 
useFetchPopularApiQuery,
  useFetchUpcomingApiQuery, 
  useFetchPlayingApiQuery, 
  useFetchRatedApiQuery
} from '@/features/movie/api/movieApi';




export const useMovieCategories = () => {
  const { data: popular, isLoading: popularLoading } = useFetchPopularApiQuery({});
  const { data: topRated, isLoading: topRatedLoading } = useFetchRatedApiQuery({});
  const { data: upcoming, isLoading: upcomingLoading } = useFetchUpcomingApiQuery({});
  const { data: nowPlaying, isLoading: nowPlayingLoading } = useFetchPlayingApiQuery({});

  const isLoading = popularLoading || topRatedLoading || upcomingLoading || nowPlayingLoading;

 const categories = useMemo(() => [
  { 
    id: 'popular', 
    title: 'Popular Movies', 
    data: popular,
    path: '/category/popular'
  },
  { 
    id: 'top_rated', 
    title: 'Top Rated Movies', 
    data: topRated,
    path: '/category/top-rated'
  },
  { 
    id: 'upcoming', 
    title: 'Upcoming Movies', 
    data: upcoming,
    path: '/category/upcoming'
  },
  { 
    id: 'now_playing', 
    title: 'Now Playing Movies', 
    data: nowPlaying,
    path: '/category/now-playing'
  },
], [popular, topRated, upcoming, nowPlaying]);

  return { categories, isLoading };
};