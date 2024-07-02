export const Response200 = {
  code: 200,
  error: false,
  message: "Success"
}

export const Response400 = {
  code: 400,
  error: true,
  message: "Bad Request"
}

export const Response403 = {
  code: 403,
  error: true,
  message: "Access Denied"
}

export const Response404 = {
  code: 404,
  error: true,
  message: "Not Found"
}

export const Response500 = {
  code: 500,
  error: true,
  message: "Something went wrong"
}

export const ResponseConflict = {
  code: 400,
  error: true,
  message: "Already Exists"
}

export class HttpError {
  code: number
  message: string

  constructor(message: string, code: number) {
    this.code = code
    this.message = message
  }
}

export interface HttpErrorResponse {
  code: number
  message: string
  error: boolean
}