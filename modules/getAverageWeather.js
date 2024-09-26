export function getAverageWeather(singleDayArray) {
	// console.log(singleDayArray);
	const singleDayIcons = [];

	singleDayArray.forEach((singleDayRange) => {
		//** AVERAGE DAY ICON **//
		const rangeIcon = singleDayRange.weather[0].icon;
		const rangeIconCode = Number(rangeIcon.substring(0, 2));
		singleDayIcons.push(rangeIconCode);
	});
	// console.log(singleDayIcons);

	const formatIcon = String(Math.max(...singleDayIcons)).padStart(2, "0");
	const averageIcon = `https://openweathermap.org/img/wn/${formatIcon}d@2x.png`;
	// console.log(averageIcon);

	//** AVERAGE DAY DESCRIPTION **//
	let averageDescription = "";

	for (let singleDayRange of singleDayArray) {
		const rangeWeatherIcon = singleDayRange.weather[0].icon;
		const rangeWeatherDescription = singleDayRange.weather[0].description;
		// console.log(rangeWeatherIcon, rangeWeatherDescription);
		if (rangeWeatherIcon.includes(formatIcon)) {
			// console.log(singleDayRange);
			// console.log(rangeWeatherIcon);
			averageDescription = rangeWeatherDescription;
			break;
		}
	}
	// console.log(averageDescription);

	const averageWeather = [averageIcon, averageDescription];
	return averageWeather;
}
