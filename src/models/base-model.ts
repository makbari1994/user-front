export interface BaseModel<T> {
  status: boolean;
  statusCode: number;
  result: T;
}
