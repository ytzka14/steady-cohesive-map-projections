// implementation of the CheckViz Colormap

import * as d3 from 'd3';

export function colormap(trust: number, conti: number) {
	const cScale = 1.3;

	trust = 1 - trust;
	conti = 1 - conti;
	
	const powScale = d3.scalePow().exponent(1.5145);
	const aScale = d3.scaleLinear().domain([1, -1]).range([30 * cScale, -30 * cScale]);  //30
	const bScale = d3.scaleLinear().domain([1, -1]).range([20 * cScale, -20 * cScale]);  // 20   

	return d3.color(d3.lab(powScale(1 - (trust + conti) / 2) * 100, aScale(trust - conti), bScale(conti - trust))).formatRgb();
}