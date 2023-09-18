const fetchApi = async (path: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`);
};

export default fetchApi;
