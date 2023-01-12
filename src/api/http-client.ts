type RequestOptions = RequestInit & { json?: unknown; csrfToken?: string; prefixUrl?: string }

const get = <Return = void>(url: string, requestOptions?: RequestOptions): Promise<Return> =>
  requestAsync<Return>(url, { ...requestOptions, method: "get" })

const post = <Return = void>(url: string, requestOptions?: RequestOptions): Promise<Return> =>
  requestAsync<Return>(url, { ...requestOptions, method: "post" })

const put = <Return = void>(url: string, requestOptions?: RequestOptions): Promise<Return> =>
  requestAsync<Return>(url, { ...requestOptions, method: "put" })

const deleteReq = <Return = void>(url: string, requestOptions?: RequestOptions): Promise<Return> =>
  requestAsync<Return>(url, {
    ...requestOptions,
    method: "delete",
  })

const patch = <Return = void>(url: string, requestOptions?: RequestOptions): Promise<Return> =>
  requestAsync<Return>(url, {
    ...requestOptions,
    method: "patch",
  })

const requestAsync = async <Return = void>(
  url: string,
  requestOptions: RequestOptions
): Promise<Return> => {
  try {
    const response = await fetchAsync(url, requestOptions)

    if (!response.ok) {
      throw response
    }

    const parsedResponse = await tryParseResponseJsonAsync(response)

    return parsedResponse as Return
  } catch (error) {
    throw error
  }
}

export const fetchAsync = async (
  url: string,
  requestOptions: RequestOptions
): Promise<Response> => {
  // Add trailing slash
  const prefixUrl = requestOptions.prefixUrl ?? ""
  const requestUrl =
    url.endsWith("/") || requestOptions.method === "get" ? prefixUrl + url : prefixUrl + url + "/"
  let request = new Request(requestUrl, requestOptions)

  if (requestOptions.json) {
    requestOptions.body = JSON.stringify(requestOptions.json)
    request.headers.set("content-type", "application/json")
    request = new Request(request, requestOptions)
  }

  if (requestOptions.csrfToken) {
    request.headers.set("X-CSRFTOKEN", requestOptions.csrfToken)
  }

  return await window.fetch(request)
}

async function tryParseResponseJsonAsync(response: Response) {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

export const httpClient = {
  get,
  post,
  put,
  patch,
  delete: deleteReq,
  fetchAsync,
}
