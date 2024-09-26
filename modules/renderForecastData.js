import { querySel, createEl, addClass, getTime } from "./utilities.js";
import { getMinMaxDayTemps } from "./getMinMaxDayTemps.js";
import { getAverageWeather } from "./getAverageWeather.js";
import { renderSingleForecastDay } from "./renderSingleForecastDay.js";

const dayForecastSection = querySel(".day-forecast-section");
let sortDaysArray = [];

export function renderForecastData(forecastWeatherData) {
	// console.log("all data, sunrise ecc", forecastWeatherData);
	const forecastWeatherDataList = forecastWeatherData.list;
	// console.log("data.list", forecastWeatherDataList);

	dayForecastSection.innerHTML = "";

	//** DAY FORECAST SECTION TITLE **//
	const sectionTitle = createEl("h2");
	sectionTitle.textContent = "Previsione dei prossimi 5 giorni";

	//** SORT DAYS FORECAST **//
	sortDaysArray = [Array(forecastWeatherDataList[0])];

	//** TIME/DATE **//
	sortDay(forecastWeatherDataList);
	sortDaysArray.shift();

	//** FORECAST UL **//
	const forecastUL = createEl("ul");
	addClass(forecastUL, "forecast-ul");

	//** APPEND **//
	dayForecastSection.append(sectionTitle, forecastUL);

	renderForecastDays(forecastUL, forecastWeatherData);

	//** DETAILS **//
	const childNodesArray = forecastUL.childNodes;
	// console.log(childNodesArray);

	childNodesArray.forEach((child) => {
		console.dir(child);
		const detailsBtn = child.childNodes[0].childNodes[4];
		const dayRangesTableContainer = findIndexOfTargetChild(childNodesArray, child);

		detailsBtn.addEventListener("click", function () {
			if (child.contains(dayRangesTableContainer)) {
				child.style.border = "none";
				detailsBtn.classList.remove("open");
				dayRangesTableContainer.remove();
			} else {
				child.style.border = "0.15rem solid var(--accent)";
				addClass(detailsBtn, "open");
				child.append(dayRangesTableContainer);
			}
		});
	});
}

function findIndexOfTargetChild(childNodesArray, child) {
	const indexOfChild = Array.prototype.indexOf.call(childNodesArray, child);
	// console.log(indexOfChild);
	// console.log(sortDaysArray);
	// console.log(child);

	const dayRangesTableContainer = renderSingleForecastDay(sortDaysArray[indexOfChild]);
	return dayRangesTableContainer;
}

function sortDay(forecastWeatherDataList) {
	forecastWeatherDataList.forEach((singleTimestampWeather) => {
		if (singleTimestampWeather === forecastWeatherDataList[0]) {
			return;
		}

		const singleDate = getTime(singleTimestampWeather.dt);
		const singleDay = singleDate.toLocaleDateString("it-IT", { timeZone: "UTC", day: "numeric" });
		const lastArrayObject = sortDaysArray[sortDaysArray.length - 1];

		const isSameDay = singleDay == getTime(lastArrayObject[0].dt).toLocaleDateString("it-IT", { timeZone: "UTC", day: "numeric" });

		if (isSameDay) {
			lastArrayObject.push(singleTimestampWeather);
		} else {
			sortDaysArray.push(Array(singleTimestampWeather));
		}
	});
}

function renderForecastDays(forecastUL, forecastWeatherData) {
	sortDaysArray.forEach((singleDayArray) => {
		// ! CONSOLE LOG
		// console.log(singleDayArray);

		//** FORECAST DAY UL **//
		const forecastDayUL = createEl("ul");
		addClass(forecastDayUL, "forecast-day-ul");

		//** FORECAST DAY GENERAL INFO UL **//
		const forecastDayInfoUL = createEl("ul");
		addClass(forecastDayInfoUL, "forecast-day-info-ul");

		//** DATE **//
		const singleDayDateEl = createEl("h4");
		addClass(singleDayDateEl, "day-date");

		const singleDayDate = getTime(singleDayArray[0].dt);
		const singleDayMonthday = singleDayDate.toLocaleDateString("it-IT", { timeZone: "UTC", day: "numeric", month: "short" });
		const singleDayWeekday = singleDayDate.toLocaleDateString("it-IT", { timeZone: "UTC", weekday: "short" });
		const singleDayDateAdjusted = `${singleDayWeekday}, ${singleDayMonthday}`;
		singleDayDateEl.textContent = singleDayDateAdjusted;

		//** MIN/MAX TEMP **//
		const minMaxDayTemps = getMinMaxDayTemps(singleDayArray);
		const minMaxDayTempsEl = createEl("li");
		addClass(minMaxDayTempsEl, "day-min-max-temps");
		minMaxDayTempsEl.textContent = `${minMaxDayTemps[0]} / ${minMaxDayTemps[1]}°C`;

		//** AVERAGE WEATHER**//
		const averageIconEl = createEl("img");
		addClass(averageIconEl, "day-average-icon");
		averageIconEl.width = "50";
		averageIconEl.height = "50";

		const averageWeather = getAverageWeather(singleDayArray);
		averageIconEl.src = averageWeather[0];

		const averageDescriptionEl = createEl("li");
		addClass(averageDescriptionEl, "day-average-description");
		averageDescriptionEl.textContent = averageWeather[1];

		//** DETAILS BUTTON **//
		const detailsBtn = createEl("button");
		addClass(detailsBtn, "details-btn");
		detailsBtn.textContent = "Dettagli";

		//** APPEND **//
		forecastDayInfoUL.append(singleDayDateEl, averageIconEl, minMaxDayTempsEl, averageDescriptionEl, detailsBtn);
		forecastDayUL.append(forecastDayInfoUL);

		//** APPEND **//
		forecastUL.append(forecastDayUL);
	});
}

export { sortDaysArray };
