const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiClientError<APIError> extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: APIError | null,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export function isApiClientError<APIError>(
  error: unknown,
): error is ApiClientError<APIError> {
  return error instanceof ApiClientError;
}

export class ApiClient {
  private headers: Record<string, string>;

  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl;
    this.headers = defaultHeaders;
  }

  private resolveUrl(endpoint: string): string {
    if (/^https?:\/\//i.test(endpoint)) {
      return endpoint;
    }

    const normalizedEndpoint = endpoint.replace(/^\/+/, "");

    if (!this.baseUrl) {
      return `/${normalizedEndpoint}`;
    }

    return `${this.baseUrl.replace(/\/+$/, "")}/${normalizedEndpoint}`;
  }

  private async request<BODY, APIError, RESPONSE>(
    endpoint: string,
    body?: BODY,
    method: HttpMethod = "GET",
    next?: NextFetchRequestConfig
  ): Promise<RESPONSE> {
    try {
      const response = await fetch(this.resolveUrl(endpoint), {
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined,
        next
      });

      if (!response.ok) {
        let errorBody: APIError | null = null;

        try {
          errorBody = (await response.json()) as APIError;
        } catch {
          errorBody = null;
        }

        throw new ApiClientError(
          `API request failed with status ${response.status}`,
          response.status,
          errorBody,
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error in API request to ${endpoint}:`, error.message);
      }

      throw error;
    }
  }

  public async get<RESPONSE, APIError = unknown>(
    endpoint: string,
    next?: NextFetchRequestConfig
  ): Promise<RESPONSE> {
    return this.request<undefined, APIError, RESPONSE>(
      endpoint,
      undefined,
      "GET",
      next
    );
  }

  public async post<BODY, RESPONSE, APIError = unknown>(
    endpoint: string,
    body: BODY,
  ): Promise<RESPONSE> {
    return this.request<BODY, APIError, RESPONSE>(endpoint, body, "POST");
  }

  public async put<BODY, RESPONSE, APIError = unknown>(
    endpoint: string,
    body: BODY,
  ): Promise<RESPONSE> {
    return this.request<BODY, APIError, RESPONSE>(endpoint, body, "PUT");
  }

  public async delete<RESPONSE, APIError = unknown>(
    endpoint: string,
  ): Promise<RESPONSE> {
    return this.request<undefined, APIError, RESPONSE>(
      endpoint,
      undefined,
      "DELETE",
    );
  }

  public async appendHeaders(AdditionalHeaders: Record<string, string>) {
    this.headers = { ...this.headers, ...AdditionalHeaders };
  }
}

export const apiClient = new ApiClient("");
