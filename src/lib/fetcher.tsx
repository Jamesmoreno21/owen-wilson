const BASE_URL = "https://owen-wilson-wow-api.onrender.com/wows";

export class FetchError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const fetcher = async (path: string) => {
  const res = await fetch(BASE_URL + path,
    {
      headers: {
        "accept": "application/json",
      },
    }
  );
  if (res.status > 400) {
    throw new FetchError(res.status, "Request failed: " + path);
  }
  const data = await res.json();
  return data;
};
