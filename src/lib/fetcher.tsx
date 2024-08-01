const BASE_URL = "https://owen-wilson-wow-api.onrender.com/wows";

export const fetcher = async (path: string) => {
  const res = await fetch(BASE_URL + path,
    {
      headers: {
        "accept": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
};
