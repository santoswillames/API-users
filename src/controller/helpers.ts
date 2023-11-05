import { HttpResponse } from "./protocols";

export const okRequest = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 200,
    body,
  };
};

export const createdRequest = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 201,
    body,
  };
};

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: "Somenting went wrong.",
  };
};
