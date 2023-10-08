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

export interface MovieAPIResponse {
	actors: string[];
	added_on: string;
	awards: string | null;
	directors: string[];
	genres: string[];
	imdb_votes: number;
	keywords: string[];
	plot: string;
	poster: string;
	rating_imdb: number;
	rating_meta: number | null;
	rating_rt: number | null;
	release_year: number;
	reviews: Review[];
	runtime: number;
	summaries: Summary[];
	title: string;
	type: string;
}

export interface RatingProps {
	name: string;
	rating?: number;
}

export interface Review {
	author: string;
	content: string;
	downvotes: number;
	helpfulness: number;
	keywords: string[];
	rating: number;
	spoilers: number;
	submittedOn: string;
	title: string;
	upvotes: number;
}

export interface Summary {
	score: number;
	sentence: string;
}

export interface ILandingPageRes {
	keywords: {
		top: {
			word: string
			count: number;
		}[];
		random: {
			word: string;
			id: number;
		}[];
	};
	movies: MovieAPIResponse[];
}
