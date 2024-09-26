import { querySel } from "./modules/utilities.js";
import { GET, GETforecast } from "./modules/GET.js";
import { renderHeaderData } from "./modules/renderMainData.js";
import { renderCurrentSectionData } from "./modules/renderCurrentSectionData.js";
import { renderForecastData } from "./modules/renderForecastData.js";
import { filterComuniPA, searchCity } from "./modules/searchCity.js";

export const getWeather = async (city) => {
	const cityWeatherData = await GET(city);
	const cityForecastData = await GETforecast(city);
	if (cityWeatherData) {
		renderHeaderData(cityWeatherData);
		renderCurrentSectionData(cityWeatherData, cityForecastData);
		renderForecastData(cityForecastData);
	}
};

getWeather();

const searchInputEl = querySel(".search-city-input");
searchInputEl.addEventListener("input", function () {
	filterComuniPA();
});

searchInputEl.addEventListener("keydown", function (e) {
	if (searchInputEl.value) {
		if (e.key === "Enter") {
			searchCity(searchInputEl.value);
		}
	}
});

const searchBtn = querySel(".search-city");
searchBtn.addEventListener("click", function () {
	const cityToSearch = handleInput(searchInputEl.value);
	searchCity(cityToSearch);
});

function handleInput(inputValue) {
	return inputValue.toLowerCase().replaceAll(" ", "%20");
}
