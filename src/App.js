import "./App.css";
import HomePage from "./HomePage";
import prefecturesData from "./data/prefectures.json";

function App() {
  // Use static data directly - no API calls needed!
  const prefectures = prefecturesData.prefectures;

  return (
    <div className="App">
      <HomePage prefectures={prefectures} />
    </div>
  );
}

export default App;
