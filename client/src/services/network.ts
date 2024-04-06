export const DEFAULT_HEADERS = { "Content-Type": "application/json" };

export const SERVER_BASE_URL =
  (import.meta.env.VITE_SERVER_URL! as string) ?? "http://localhost:5000";

export class Network {
  constructor() {}

  public async get<T>(url: string, headers = DEFAULT_HEADERS): Promise<T> {
    const fullUrl = `${SERVER_BASE_URL}${url}`;
    const response = await fetch(fullUrl, { headers, credentials: "include" });
    return response.json();
  }

  public async post<T>(
    url: string,
    body: any,
    headers = DEFAULT_HEADERS
  ): Promise<T> {
    const fullUrl = `${SERVER_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    });
    return response.json();
  }

  public async put<T>(
    url: string,
    body: any,
    headers = DEFAULT_HEADERS
  ): Promise<T> {
    const fullUrl = `${SERVER_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    });
    return response.json();
  }

  public async delete<T>(url: string, headers = DEFAULT_HEADERS): Promise<T> {
    const fullUrl = `${SERVER_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers,
      credentials: "include",
    });
    return response.json();
  }
}

export const NetworkService = new Network();
