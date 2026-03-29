
import { baseApi } from '@/app/api/baseApi'
import type { CastResponse, fetchDiscoverArgs, FetchPopularArgs, FetchSearchArgs, MovieDetails, Response, ResponseGenres} from './movieApi.types'


export const movieApi = baseApi.injectEndpoints({

  endpoints: build => ({
    fetchMovieDetailsApi: build.query<MovieDetails, { id: string; language?: string }>({
      query: ({ id }) => ({
        url: `movie/${id}`,
      }),
      providesTags: ['Movie'],
    }),

    fetchPopularApi: build.query<Response, FetchPopularArgs>({
      query: (data) => ({
        url: 'movie/popular',
        params: data,
      }),
      providesTags: ['Movie'],
    }),
    fetchSearchApi: build.query<Response, FetchSearchArgs>({
      query: ({ query, language = 'en-US', page = 1, include_adult = false }) => ({
        url: 'search/movie',
        params: { query, language, page, include_adult },
      }),
      providesTags: ['Movie'],
    }),
    fetchRatedApi: build.query<Response, FetchPopularArgs>({
      query: (data) => ({
        url: 'movie/top_rated',
        params: data,
      }),
      providesTags: ['Movie'],
    }),
    fetchUpcomingApi: build.query<Response, FetchPopularArgs>({
      query: (data) => ({
        url: 'movie/upcoming',
        params: data,
      }),
      providesTags: ['Movie'],
    }),

    fetchPlayingApi: build.query<Response, FetchPopularArgs>({
      query: (data) => ({
        url: 'movie/now_playing',
        params: data,
      }),
      providesTags: ['Movie'],
    }),

    fetchDiscoverApi: build.query<Response, fetchDiscoverArgs>({
      query: (data) => ({
        url: 'discover/movie',
        params: data,
      }),
      providesTags: ['Movie'],
    }),

    fetchGenreApi: build.query<ResponseGenres, string>({
      query: () => ({
        url: 'genre/movie/list'
      }),
      providesTags: ['Movie'],
    }),

    fetchCreditsApi: build.query<CastResponse, { id: string; params: { language: string } }>({
      query: ({id, params }) => ({
        url: `movie/${id}/credits`,
        params: { ...params },
      }),
      providesTags: ['Movie'],
    }),

    fetchSimilarApi: build.query<Response, { id: string; params: { language: string; page: number } }>({
      query: ({id, params }) => ({
        url: `movie/${id}/similar`,
        params: { ...params },
      }),
      providesTags: ['Movie'],
    }),
  }),
})

export const {
  useFetchMovieDetailsApiQuery,
  useFetchPopularApiQuery,
  useFetchSearchApiQuery,
  useFetchRatedApiQuery,
  useFetchUpcomingApiQuery,
  useFetchPlayingApiQuery,
  useFetchDiscoverApiQuery,
  useFetchGenreApiQuery,
  useFetchCreditsApiQuery,
  useFetchSimilarApiQuery,
} = movieApi
