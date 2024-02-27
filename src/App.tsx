import "./App.css";
import MainPlot from "./components/MainPlot";
import AlaskaAirlines from "./data/alaskaairlines.json";
import HokkaidoAirports from "./data/hokkaidoairports.json";
import JetstarJapan from "./data/jetstarjapan.json";
import Lattices from "./data/lattices.json";
import Subway from "./data/subway.json";
import { useState } from 'react';

function App() {

	const [ data, setData ] = useState(Lattices);

	const setDataJson = (dataName: string) => {
		if(dataName === "AlaskaAirlines") setData(AlaskaAirlines);
		else if(dataName === "HokkaidoAirports") setData(HokkaidoAirports);
		else if(dataName === "JetstarJapan") setData(JetstarJapan);
		else if(dataName === "Subway") setData(Subway);
		else setData(Lattices);
	}

  return (
    <div className="App">
      <MainPlot raw={data} setData={setDataJson} />
    </div>
  );
}

export default App;
