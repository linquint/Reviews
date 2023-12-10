export interface SearchAPIResponse {
  totalResults: number;
  response: MovieProps[]|boolean;
	q?: string;
  page: number;
}

export interface MovieProps {
	title: string;
	releaseYear: string|number;
	imdbID: string;
	type: string;
	poster?: string;
}

export interface MovieCardProps extends MovieProps {
	id: number;
	awards?: string;
	summary_id?: number;
	ratingIMDB: number;
	ratingRT?: number;
	ratingMETA?: number;
	imdbVotes: number;
	runtime: number;
	plot: string;
	addedOn: string;
}

export interface IMovieMain {
  title: string;
  releaseYear: string;
  imdbID: string;
  type: string;
  poster: string;
}

export interface IMovieReduced extends IMovieMain {
  id: number;
  runtime: number;
  plot: string;
  awards: string;
  ratingIMDB: number;
  imdbVotes: number;
  addedOn: string | null;
  actors: string;
  directors: string;
  genres: string;
}

export interface IReview {
  id: number;
  imdbID: string;
	author: string;
	rating: number | null;
	helpfulness: number;
	upvotes: number;
	downvotes: number;
	title: string;
	content: string;
	spoilers: number;
	submittedOn: string;
}

export interface IMovieFull extends IMovieReduced {
  actors: string | null;
  directors: string | null;
  genres: string | null;
  reviews: IReview[];
  keywords: string[];
}

export interface RatingProps {
	name: string;
	rating?: number;
}

export interface ILandingPageRes {
  top: {
    word: string
    count: number;
  }[];
  random: {
    word: string;
    id: number;
  }[];
	movies: IMovieReduced[];
}

export interface IMovieSearchRes {
  query: string;
  page: number;
  count: number;
  search: IMovieMain[];
}

export interface IKeyword {
  id: number;
  word: string;
}

export interface IKeywordWithUsage {
  word: string;
  total: number;
}

export interface IUser {
  id: number;
  username: string;
}
