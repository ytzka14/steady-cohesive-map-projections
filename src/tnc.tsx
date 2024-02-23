// Implementation of the Trustworthiness & Continuity Metric

function geodesicDistance(xlat: number, xlong: number, ylat: number, ylong: number) {
	return Math.acos(Math.sin(xlat) * Math.sin(ylat) + Math.cos(xlat) * Math.cos(ylat) * Math.cos(Math.abs(xlong - ylong)));
}

function knn(data: number[][], k: number, isGeodesic: boolean = false) {
	const knnArr = [];
	for(let i = 0; i < data.length; i++) {
		let knn = []
		for(let j = 0; j < data.length; j++) {
			let dist = 0;
			if(!isGeodesic){
				for (let k = 0; k < data[0].length; k++) {
					dist += Math.pow((data[i][k] - data[j][k]), 2);
				}
				knn.push([Math.sqrt(dist), j]);
			} else {
				dist += geodesicDistance(data[i][0], data[i][1], data[j][0], data[j][1]);
				knn.push([dist, j]);
			}
		}
		knn.sort((a, b) => a[0] - b[0]);
		knn = knn.slice(1, k + 2).map(d => d[1]);
		knnArr.push(knn);
	}
	return knnArr;
}

export function tnc(raw: number[][], emb: number[][]) {
	const k = 10;

	const kSum = Array(k).fill(0).reduce((acc, _curr, i) => acc + i + 1, 0);

	const rawKnnArr = knn(raw, k, true);
	const embKnnArr = knn(emb, k);

	const trustArr = rawKnnArr.map((rawKnn, i) => {
		const embKnnSet = new Set(embKnnArr[i]);
		const trust = rawKnn.reduce((acc, curr, i) => {
			if (embKnnSet.has(curr)) return acc + (k - i);
			else return acc;
		}, 0) / kSum;
		return trust;
	});
	const contiArr = embKnnArr.map((embKnn, i) => {
		const rawKnnSet = new Set(rawKnnArr[i]);
		const conti = embKnn.reduce((acc, curr, i) => {
			if (rawKnnSet.has(curr)) return acc + (k - i);
			else return acc;
		}, 0) / kSum;
		return conti;
	});

	return {
		"trust": trustArr,
		"conti": contiArr
	}
}