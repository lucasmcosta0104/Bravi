export interface ResponseModel<T> {
  success: boolean;
  data: T;
}

export interface ErrorResponseModel {
  success: boolean;
  errors: string[];
}

export type ResponseSucessModel = ResponseModel<string>;
export type ResponseTrhowErrorModel = ResponseModel<string>;
