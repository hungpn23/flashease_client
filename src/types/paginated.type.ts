export type TPaginated<D> = {
  data: D[];
  metadata: TMetadata;
};

export type TMetadata = {
  limit: number;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  nextPage?: number;
  previousPage?: number;
};
