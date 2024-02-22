import "./App.css";
import MainPlot from "./components/MainPlot";
import RawJson from "./data/subway.json";

function App() {	
  return (
    <div className="App">
      <MainPlot raw={RawJson} />
    </div>
  );
}

export default App;