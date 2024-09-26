import { createEl, addClass, getTime } from "./utilities.js";
import { getWindLabel } from "./windRanges.js";

export function renderSingleForecastDay(singleDayArray) {
	// console.log(singleDayArray);

	//** SINGLE DAY ARRAY OF RANGES OBJECTS **//
	const rangesData = [
		{ name: "TEMPERATURA", values: [] },
		{ name: "PERCEPITA", values: [] },
		{ name: "VENTO", values: [] },
		{ name: "NUVOLE", values: [] },
		{ name: "UMIDITÀ", values: [] },
	];

	const rangesTimesOfDay = [];

	//** FORECAST DAY RANGES **//
	singleDayArray.forEach((singleRange) => {
		//** FORECAST DAY RANGE **//
		const timeOfDay = getTime(singleRange.dt).toLocaleTimeString("it-IT", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });
		rangesTimesOfDay.push(timeOfDay);
		const rangesTemperatures = rangesData[0].values;
		rangesTemperatures.push(`${Math.round(singleRange.main.temp)}°C`);
		const rangesFeelsLike = rangesData[1].values;
		rangesFeelsLike.push(`${Math.round(singleRange.main.feels_like)}°C`);
		const rangesWindSpeed = rangesData[2].values;
		const singleRangeWindLabel = getWindLabel(singleRange.wind.deg);
		rangesWindSpeed.push(`${singleRange.wind.speed}m/s ${singleRangeWindLabel}`);
		const rangesClouds = rangesData[3].values;
		rangesClouds.push(`${singleRange.clouds.all}%`);
		const rangesHumidity = rangesData[4].values;
		rangesHumidity.push(`${Math.round(singleRange.main.humidity)}%`);
		// console.log(singleRange);
	});

	const rangesTable = createDynamicTable(rangesData, rangesTimesOfDay);
	const dayRangesTableContainer = createEl("div");
	addClass(dayRangesTableContainer, "day-ranges-table-container");
	dayRangesTableContainer.append(rangesTable);
	return dayRangesTableContainer;
}

function createDynamicTable(rangesData, rangesTimesOfDay) {
	// console.log(rangesData);
	//** TABLE **//
	const rangesTable = createEl("table");

	const tHead = createEl("thead");
	const trHead = createEl("tr");

	//** TABLE FIRST COL**//
	const thHeadEmpty = createEl("th");
	thHeadEmpty.scope = "col";
	thHeadEmpty.textContent = "ORA DEL GIORNO";

	const tBody = createEl("tbody");

	//** TABLE ROWS TITLES **//
	rangesData.forEach((rangesInfo) => {
		const trBody = createEl("tr");
		const thBodyRow = createEl("th");
		addClass(thBodyRow, "th-body-row");
		thBodyRow.scope = "row";
		thBodyRow.textContent = rangesInfo.name;

		// console.log("rangesData", rangesData);
		// console.log("rangesInfo", rangesInfo);

		//** TABLE ROWS VALUES**//
		rangesInfo.values.forEach((rangesSingleInfo) => {
			const tdBody = createEl("td");
			tdBody.textContent = `${rangesSingleInfo}`;
			trBody.append(tdBody);
		});

		trBody.insertAdjacentElement("afterbegin", thBodyRow);
		tBody.append(trBody);
	});

	//** TABLE COLUMNS TITLES **//
	rangesTimesOfDay.forEach((singleRangeTime) => {
		const thHeadCol = createEl("th");
		thHeadCol.scope = "col";
		thHeadCol.textContent = `h${singleRangeTime}`;
		trHead.append(thHeadCol);
	});

	trHead.insertAdjacentElement("afterbegin", thHeadEmpty);
	tHead.append(trHead);
	rangesTable.append(tHead, tBody);
	return rangesTable;
}
