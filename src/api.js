export const fetchPrefectures = async () => {
  const response = await fetch("http://localhost:5001/api/prefectures");
  const data = await response.json();
  return data;
};
