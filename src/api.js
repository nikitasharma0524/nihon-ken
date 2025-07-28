export const fetchPrefectures = async () => {
  const response = await fetch("https://nihonken.onrender.com/api/prefectures");
  const data = await response.json();
  return data;
};
