export type Paginated<D> = {
  data: D[];
  metadata: Metadata;
};

export type Metadata = {
  limit: number;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  nextPage?: number;
  previousPage?: number;
};
