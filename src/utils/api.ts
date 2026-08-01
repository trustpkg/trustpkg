const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiClient {
  private headers: Record<string, string>;

  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl;
    this.headers = defaultHeaders;
  }

  private async request<BODY, APIError, RESPONSE>(
    endpoint: string,
    body?: BODY,
    method: HttpMethod = "GET",
  ): Promise<RESPONSE | APIError> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${response.status}: ${JSON.stringify({
            status: 400,
            message: "Bad Request",
          })}`,
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

  public async get<APIError, RESPONSE>(
    endpoint: string,
  ): Promise<RESPONSE | APIError> {
    return this.request<undefined, APIError, RESPONSE>(
      endpoint,
      undefined,
      "GET",
    );
  }

  public async post<BODY, APIError, RESPONSE>(
    endpoint: string,
    body: BODY,
  ): Promise<RESPONSE | APIError> {
    return this.request<BODY, APIError, RESPONSE>(endpoint, body, "POST");
  }

  public async put<BODY, APIError, RESPONSE>(
    endpoint: string,
    body: BODY,
  ): Promise<RESPONSE | APIError> {
    return this.request<BODY, APIError, RESPONSE>(endpoint, body, "PUT");
  }

  public async delete<APIError, RESPONSE>(
    endpoint: string,
  ): Promise<RESPONSE | APIError> {
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
