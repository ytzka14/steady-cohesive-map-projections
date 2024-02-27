import { useState } from 'react';
import ProjectionView from "./ProjectionView";
import LegendView from "./LegendView";
import SelectList from './SelectList';

const MainPlot = (props: {raw: number[][], setData: (dataName: string) => void}) => {
	const [projection, setProjection] = useState("Mercator");
	const [dataName, setDataName] = useState("Lattices");

  return (
    <div className="mainPlot">
      <ProjectionView
        raw={props.raw}
				projection={projection}
      />
      <div className="subView">
        <LegendView />
				<SelectList
					data={["Sinusoidal", "Mercator", "Plate Carree"]}
					listText={"Select Projection"}
					onOptionClicked={(value: string) => setProjection(value)}
				/>
				<SelectList
					data={["Lattices", "AlaskaAirlines", "JetstarJapan", "HokkaidoAirports", "Subway"]}
					listText={"Select Data"}
					onOptionClicked={(value: string) => {
						setDataName(value);
						props.setData(value);
					}}
				/>
				<p>Current map: {dataName}, {projection} projection.</p>
      </div>
    </div>
  );
};

export default MainPlot;
