import { useRef, useEffect } from "react";
import { tnc } from "../tnc";
import { colormap } from "../colormap";
import * as d3 from "d3";

const ProjectionView = (props: {raw: number[][], projection: string}) => {
  const svgRef = useRef(null);
  const size = 600;
  const margin = 15;

	let [lmax, lmin] = [-180, 180];
	for(const coord of props.raw) {
		if(coord[1] > lmax) lmax = coord[1];
		if(coord[1] < lmin) lmin = coord[1];
	}

  const getCoord = (datum: number[]) => {
		if(props.projection === "sinusoidal"){
			const x = (datum[1] - (lmax + lmin) / 2) * Math.cos(datum[0] * Math.PI / 180) * Math.PI / 180;
			const y = datum[0] * Math.PI / 180;
			return { x: x, y: y };
		} else{
			const x = datum[1] * Math.PI / 180;
			const y = Math.log(Math.tan(Math.PI / 4 + (datum[0] * Math.PI / 360)))
			return { x: x, y: y };
		}
  };

  const projectedData = props.raw.map((d) => getCoord(d));

	let [xmax, xmin, ymax, ymin] = [-180, 180, -90, 90];
	for(const coord of projectedData) {
		if(!coord) continue;
		if(coord.y > ymax) ymax = coord.y;
		if(coord.y < ymin) ymin = coord.y;
		if(coord.x > xmax) xmax = coord.x;
		if(coord.x < xmin) xmin = coord.x;
	}
	const xyratio = (xmax - xmin) / (ymax - ymin);

  const toPointString = (coords: d3.Delaunay.Polygon) => {
		if(!coords) return null;
    let ret = "";
    for (let i = 0; i < coords.length - 1; i++) {
      ret = ret + String(coords[i][0]) + "," + String(coords[i][1]) + " ";
    }
    ret =
      ret +
      String(coords[coords.length - 1][0]) +
      "," +
      String(coords[coords.length - 1][1]);
    return ret;
  };

	const defaultedExtent = (extent: [number, number] | [undefined, undefined]) => {
		if (!extent[0] || !extent[1]) {
			return [0, 0];
		} else return extent;
	}

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("height", size + 2 * margin)
      .attr("width", size * xyratio + 2 * margin);

    const xScale = d3
      .scaleLinear()
      .domain(defaultedExtent(d3.extent(projectedData, (d) => d.x)))
      .range([margin, margin + size * xyratio]);

    const yScale = d3
      .scaleLinear()
      .domain(defaultedExtent(d3.extent(projectedData, (d) => d.y)))
      .range([margin + size, margin]);

		const tncResult = tnc(
			props.raw,
			projectedData.map((d) => [xScale(d.x), yScale(d.y)])
		);
		const voronoi = d3.Delaunay.from(
			projectedData.map((d) => [xScale(d.x), yScale(d.y)])
		).voronoi([margin, margin, margin + size * xyratio, margin + size]);
		const tncData: {trust: number, conti: number, voronoi: d3.Delaunay.Polygon}[] = tncResult.trust.map((e, i) => {
			return {
				trust: e,
				conti: tncResult.conti[i],
				voronoi: voronoi.cellPolygon(i)
			}
		}); // [[trust, conti, voronoi], [trust, conti, voronoi], ...]

		svg
			.selectAll("polygon")
			.data(tncData)
			.enter()
			.append("polygon")
			.attr("points", (d) => toPointString(d.voronoi))
			.attr("fill", (d) => colormap(d.trust, d.conti))
			.attr("stroke", "none")
			.attr("class", (_d, i) => `voronoi-polygon vp${i}`);

    const points = svg.selectAll<SVGCircleElement, number[]>("circle").data(projectedData);

    points
      .enter()
      .append("circle")
      .merge(points)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 2)
      .attr("class", (_d, i) => `circle c${i}`);

    return () => {
      svg.selectAll("*").remove();
    };
  }, [projectedData, props, xyratio]);

  return (
    <div className="projectionView">
      <svg ref={svgRef} className="projectionSvg" />
    </div>
  );
};

export default ProjectionView;
