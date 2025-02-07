export type PaginatedType<D> = {
  paginatedData: D[];
  metadata: MetadataType;
};

export type MetadataType = {
  limit: number;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  nextPage?: number;
  previousPage?: number;
};
