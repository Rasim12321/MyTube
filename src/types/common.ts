export interface IPaginatedResponse<T> {
  limit: number
  page: number
  totalNumber: number
  totalPage: number
  videos: T[]
}
