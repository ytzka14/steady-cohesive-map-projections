import { useState } from 'react';
import ProjectionView from "./ProjectionView";
import LegendView from "./LegendView";
import SelectList from './SelectList';

const MainPlot = (props: {raw: number[][]}) => {
	const [projection, setProjection] = useState("mercator");

  return (
    <div className="mainPlot">
      <ProjectionView
        raw={props.raw}
				projection={projection}
      />
      <div className="subView">
        <LegendView />
				<SelectList
					setProjection={setProjection}
				/>
      </div>
    </div>
  );
};

export default MainPlot;
