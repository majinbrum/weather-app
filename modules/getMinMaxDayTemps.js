export function getMinMaxDayTemps(singleDayArray) {
	// console.log(singleDayArray);

	const singleDayTempsMin = [];
	const singleDayTempsMax = [];

	singleDayArray.forEach((singleDayRange) => {
		// console.log("temp", Math.round(singleDayRange.main.temp));
		// console.log("temp min rounded", Math.round(singleDayRange.main.temp_min));
		singleDayTempsMin.push(Math.round(singleDayRange.main.temp_min));
		// console.log("temp max", Math.round(singleDayRange.main.temp_max));
		singleDayTempsMax.push(Math.round(singleDayRange.main.temp_max));
	});

	const minDayTemp = Math.min(...singleDayTempsMin);
	const maxDayTemp = Math.max(...singleDayTempsMax);

	const minMaxDayTemps = [minDayTemp, maxDayTemp];
	return minMaxDayTemps;
}
