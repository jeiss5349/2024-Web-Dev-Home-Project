export const API_ROOT = 'https://two024-web-dev-home-project-backend.onrender.com/api/';

export default function HttpCall<T>(
  url: string,
  data: any = null,
  method?: string
): Promise<T> {
  const options: RequestInit = {
    method: method || (data ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };
  return fetch(API_ROOT + url, options).then((res) => res.json());
}
