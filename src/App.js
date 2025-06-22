import "./App.css";
import React from "react";
import HomePage from "./HomePage";
import { fetchPrefectures } from "./api";
import { useState, useEffect } from "react";

function App() {
  const [prefectures, setPrefectures] = useState([]);

  useEffect(() => {
    fetchPrefectures()
      .then((res) => {
        console.log("Fetched data:", res); // ← You’ll probably see res.result
        setPrefectures(res.prefectures); // ✅ Use only the array part
      })
      .catch((err) => {
        console.error("Failed to fetch prefectures", err);
      });
  }, []);

  return (
    <div className="App">
      <HomePage prefectures={prefectures} />
    </div>
  );
}

export default App;
