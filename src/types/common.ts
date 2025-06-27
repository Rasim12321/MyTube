export interface IPaginatedResponse<T> {
  limit: number
  page: number
  totalNumber: number
  totalPages: number
  videos: T[]
}

export interface IPaginationParams {
  searchTerm?: string
  page?: number
  limit?: number
}
