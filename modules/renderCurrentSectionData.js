import { getMinMaxDayTemps } from "./getMinMaxDayTemps.js";
import { getAverageWeather } from "./getAverageWeather.js";
import { renderSingleForecastDay } from "./renderSingleForecastDay.js";
import { querySel, createEl, addClass, getTime } from "./utilities.js";

const headerEl = querySel("header");

export function renderCurrentSectionData(currentWeatherData, cityForecastData) {
	// console.log(currentWeatherData);
	const currentSectionEl = createEl("section");
	addClass(currentSectionEl, "current-section");
	currentSectionEl.innerHTML = "";

	const sectionTitle = createEl("h2");
	sectionTitle.textContent = "Previsioni di oggi";

	//** CURRENT DAY FORECAST INFO **//
	const currentDayRanges = [cityForecastData.list[0]];

	const shiftedCityforecastData = cityForecastData.list.slice(1);
	shiftedCityforecastData.forEach((singleRange) => {
		const singleRangeDayFromData = getTime(singleRange.dt, currentWeatherData.timezone).toLocaleDateString("it-IT", { timeZone: "UTC", day: "2-digit" });
		const singleRangeDayFromArray = getTime(currentDayRanges[0].dt, currentWeatherData.timezone).toLocaleDateString("it-IT", { timeZone: "UTC", day: "2-digit" });
		// console.log("singleRangeDayFromData", singleRangeDayFromData);
		// console.log("singleRangeDayFromArray", singleRangeDayFromArray);
		if (singleRangeDayFromData === singleRangeDayFromArray) {
			currentDayRanges.push(singleRange);
		} else {
			return;
		}
	});
	// console.log(currentDayRanges);

	//** WEATHER DETAILS UL **//
	const weatherDetailsUL = createEl("ul");
	addClass(weatherDetailsUL, "weather-details-ul");

	//** AVERAGE WEATHER **/
	const averageWeather = getAverageWeather(currentDayRanges);
	const averageWeatherIcon = createEl("img");
	averageWeatherIcon.src = averageWeather[0];
	averageWeatherIcon.width = "50";
	averageWeatherIcon.height = "50";

	//** WEATHER AVERAGE UL **//
	const weatherAverageUL = createEl("ul");
	addClass(weatherAverageUL, "weather-average-ul");

	//** WEATHER AVERAGE DESCRIPTION **//
	const weatherAverageDescription = createEl("p");
	addClass(weatherAverageDescription, "weather-average-description");
	weatherAverageDescription.textContent = averageWeather[1][0].toUpperCase() + averageWeather[1].slice(1);

	//** MIN/MAX **//
	const minMaxDayTemps = getMinMaxDayTemps(currentDayRanges);
	const minMaxDayTempsDescription = createEl("p");
	minMaxDayTempsDescription.textContent = `La temperatura minima sarà ${minMaxDayTemps[0]}°C, la massima sarà ${minMaxDayTemps[1]}°C.`;

	//** SUNRISE/SUNSET **//
	const sunriseSunsetUL = createEl("ul");
	addClass(sunriseSunsetUL, "sunrise-sunset-ul");
	const sunriseIcon = createEl("img");
	sunriseIcon.src = "./img/sunrise.png";
	sunriseIcon.width = "50";
	sunriseIcon.height = "50";
	const sunriseTime = getTime(currentWeatherData.sys.sunrise, currentWeatherData.timezone);
	const sunriseTimeAdjusted = sunriseTime.toLocaleTimeString("it-IT", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });
	const sunriseEl = createEl("li");
	sunriseEl.append(sunriseIcon, sunriseTimeAdjusted);

	const sunsetIcon = createEl("img");
	sunsetIcon.src = "./img/sunset.png";
	sunsetIcon.width = "50";
	sunsetIcon.height = "50";
	const sunsetTime = getTime(currentWeatherData.sys.sunset, currentWeatherData.timezone);
	const sunsetTimeAdjusted = sunsetTime.toLocaleTimeString("it-IT", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });
	const sunsetEl = createEl("li");
	sunsetEl.append(sunsetIcon, sunsetTimeAdjusted);

	//** DAY RANGES **//
	const dayRangesTableContainer = renderSingleForecastDay(currentDayRanges);

	//** APPEND**//
	weatherAverageUL.append(weatherAverageDescription, minMaxDayTempsDescription);
	sunriseSunsetUL.append(sunriseEl, sunsetEl);

	weatherDetailsUL.append(averageWeatherIcon, weatherAverageUL, sunriseSunsetUL);
	currentSectionEl.append(sectionTitle, weatherDetailsUL, dayRangesTableContainer);
	headerEl.append(currentSectionEl);
}
