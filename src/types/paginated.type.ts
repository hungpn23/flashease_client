export type PaginatedType<D> = {
  data: D[];
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
