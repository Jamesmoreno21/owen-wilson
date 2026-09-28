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

export const fetchWithRetry = async (path: string, retries = 3): Promise<any> => {
  try {
    return await fetcher(path);
  } catch (e) {
    if (retries > 0) {
      return fetchWithRetry(path, retries);
    }
    throw e;
  }
};
