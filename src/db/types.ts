export interface Movie {
  createdAt: Date;
  title: string;
  overview: string;
  releaseData: Date;
  language: string;
}

export enum SortByFilter {
  CREATED_AT = "createdAt",
  RELEASE_DATE = "releaseDate",
  ID = "id",
}

export enum SortValueFilter {
  ASC = "asc",
  DESC = "desc",
}

export interface PaginationProps {
  perPage: number;
  lastMovieId?: string;
  sortBy: SortByFilter;
  sortValue: SortValueFilter;
  lastSortValue?: string;
}
