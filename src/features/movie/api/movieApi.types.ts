import type { DiscoverMovieSortBy } from "@/common/enums";

export type FetchPopularArgs = {
  language?: string;
  page?: number;
  region?: string;
};

export type FetchSearchArgs = {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type Response = {
  dates?: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Dates = {
  maximum: string
  minimum: string
};
 
  export type fetchDiscoverArgs = {
// Certification filters
  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;
  certification_country?: string;

  // Boolean flags
  include_adult?: boolean;
  include_video?: boolean;

  // Pagination and language
  language?: string;
  page?: number;

  // Release date filters
  primary_release_year?: number;
  'primary_release_date.gte'?: string; // ISO 8601 date format
  'primary_release_date.lte'?: string; // ISO 8601 date format

  // Region and date filters
  region?: string;
  'release_date.gte'?: string; // ISO 8601 date format
  'release_date.lte'?: string; // ISO 8601 date format

  // Sorting
  sort_by?: DiscoverMovieSortBy;

  // Vote average filters
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;

  // Vote count filters
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;

  // Watch region and providers
  watch_region?: string;

  // Cast and crew filters
  with_cast?: string; // Comma or pipe separated IDs
  with_crew?: string; // Comma or pipe separated IDs
  with_people?: string; // Comma or pipe separated IDs

  // Company and genre filters
  with_companies?: string; // Comma or pipe separated IDs
  with_genres?: string; // Comma or pipe separated IDs
  without_companies?: string;
  without_genres?: string;

  // Keyword filters
  with_keywords?: string; // Comma or pipe separated IDs
  without_keywords?: string;

  // Country and language filters
  with_origin_country?: string;
  with_original_language?: string;

  // Release type filters
  with_release_type?: string; // Comma or pipe separated values from [1,2,3,4,5,6]

  // Runtime filters
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;

  // Watch providers and monetization
  with_watch_monetization_types?: string; // Comma or pipe separated: flatrate,free,ads,rent,buy
  with_watch_providers?: string; // Comma or pipe separated IDs
  without_watch_providers?: string;

  // Year filter
  year?: number;
 }

export type Genre = {
 id: number,
 name: string
}

export type ResponseGenres = {
 genres: Genre[]
}

export type MovieDetails = {
 adult: boolean;
 backdrop_path: string | null;
 genres: Genre[];
 id: number;
 overview: string;
 poster_path: string | null;
 release_date: string;
 runtime: number | null;
 title: string;
 vote_average: number;
}


type Cast =  {
  adult: boolean;
  gender: number; // 1 - Female, 2 - Male, 0 - Unknown
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

// Или, если это часть ответа API с пагинацией:
export type CastResponse = {
  id: number;
  cast: Cast[];
  crew: Cast[];
  // ... другие поля (crew, и т.д.)
}

