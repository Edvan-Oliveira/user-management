export interface SearchResponse<T> {
  content: T[];
  page: PageInformation;
}

interface PageInformation {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}
