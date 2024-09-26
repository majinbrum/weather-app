import { querySel, createEl, addClass, getTime } from "./utilities.js";
import { getWindDescription, getWindLabel } from "./windRanges.js";

const headerEl = querySel("header");

export function renderHeaderData(currentWeatherData) {
	// console.log(currentWeatherData);
	headerEl.innerHTML = "";
	const mainInfoEl = createEl("section");
	addClass(mainInfoEl, "main-info-section");

	//** DATE AND TIME**//
	const dateCurrentEl = createEl("h4");
	const dateCurrent = getTime(currentWeatherData.dt, currentWeatherData.timezone);
	// console.log(dateCurrent);
	const dateCurrentAdjusted = dateCurrent.toLocaleDateString("it-IT", { timeZone: "UTC", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
	dateCurrentEl.textContent = dateCurrentAdjusted;

	//** CITY NAME **//
	const cityName = createEl("h1");
	cityName.textContent = `${currentWeatherData.name}, ${currentWeatherData.sys.country}`;

	//** TEMP DIV **//
	const tempDiv = createEl("div");
	addClass(tempDiv, "temp-div");

	const tempIcon = createEl("img");
	tempIcon.alt = "Temperature icon";
	tempIcon.width = "50";
	tempIcon.height = "50";
	tempIcon.src = `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`;

	const tempCurrent = createEl("h3");
	tempCurrent.textContent = `${Math.round(currentWeatherData.main.temp)}°C`;

	tempDiv.append(tempIcon, tempCurrent);

	//** WIND**//
	const windDescription = getWindDescription(currentWeatherData.wind.speed);
	const windLabel = getWindLabel(currentWeatherData.wind.deg);
	// console.log(windDescription);

	//** WEATHER DESCRIPTION **//
	const weatherDescription = createEl("p");
	addClass(weatherDescription, "weather-description");
	const weatherDescriptionToString = currentWeatherData.weather[0].description[0].toUpperCase() + currentWeatherData.weather[0].description.slice(1);
	weatherDescription.textContent = `Temperatura percepita ${Math.round(currentWeatherData.main.feels_like)}°C. ${weatherDescriptionToString}. ${windDescription}.`;

	//** WEATHER INFO UL **//
	const windIcon = `
    <svg viewBox='0 0 1000 1000' enable-background='new 0 0 1000 1000' xml:space='preserve' style='transform: rotate(200deg)'><g fill='#48484a'><path d='M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z'></path><path d='M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z'></path></g></svg>
		`;
	const pressureIcon = `
<svg viewBox="0 0 96 96"><g transform="translate(0,96) scale(0.100000,-0.100000)" fill="#48484a" stroke="none"><path d="M351 854 c-98 -35 -179 -108 -227 -202 -27 -53 -29 -65 -29 -172 0 -107 2 -119 29 -172 38 -75 104 -141 180 -181 58 -31 66 -32 176 -32 110 0 118 1 175 32 77 40 138 101 178 178 31 57 32 65 32 175 0 110 -1 118 -32 176 -40 76 -106 142 -181 179 -49 25 -71 29 -157 32 -73 2 -112 -1 -144 -13z m259 -80 c73 -34 126 -86 161 -159 24 -50 29 -73 29 -135 0 -62 -5 -85 -29 -135 -57 -119 -161 -185 -291 -185 -130 0 -234 66 -291 185 -24 50 -29 73 -29 135 0 130 66 234 185 291 82 40 184 41 265 3z"></path><path d="M545 600 c-35 -35 -68 -60 -80 -60 -27 0 -45 -18 -45 -45 0 -33 -50 -75 -89 -75 -18 0 -41 -5 -53 -11 -20 -11 -20 -11 3 -35 12 -13 33 -24 46 -24 17 0 23 -6 23 -23 0 -13 10 -33 23 -45 30 -28 47 -13 47 43 0 32 6 47 28 68 15 15 37 27 48 27 26 0 44 18 44 44 0 12 26 47 60 81 l60 61 -28 27 -28 27 -59 -60z"></path></g></svg>
`;
	const cloudsIcon = `
	<svg viewBox="0 0 512 512"><path data-v-dccd94fc="" d="M142.5 25.1C85.3 33.9 36.6 72.5 15.1 126c-8.6 21.4-11.5 39.2-10.9 65.4.4 15 1 20.1 3.2 30 4.8 20.9 12 37.5 24 55.6 9.1 13.7 29.2 34 42.6 42.9 23 15.4 49.3 25 75.3 27.6l6.7.7v73l3.4 3.4c3 3 4 3.4 8.6 3.4s5.6-.4 8.6-3.4l3.4-3.4V348h176v73.2l3.4 3.4c3 3 4 3.4 8.6 3.4s5.6-.4 8.6-3.4l3.4-3.4V348h19.3c14.8 0 21.3-.5 28.2-1.9 39.4-8.1 70.5-39.4 78.7-79.1 2.9-13.9 2.1-36.8-1.7-49.5-10.9-36.7-40.5-64.1-77.4-71.7-7.9-1.6-12.2-1.9-24.6-1.5-18.4.6-26.6 2.5-42 10.1-23.4 11.6-41.7 31.4-50.1 54.2-3.2 8.9-2.8 13.3 1.8 17.6 2.5 2.4 3.9 2.8 8.4 2.8 6.9 0 10-2.8 13.9-12.3 17-41.5 65.6-59.8 106-39.8 38 18.9 53.5 65.3 34.6 103.6-9.9 20-27.8 34.4-50.6 40.8l-8 2.2h-131c-146.5 0-140 .3-162.5-7.2-34.3-11.4-64.4-37.6-80.1-69.8-9.8-20.2-13.9-38-13.9-60.5 0-37.4 13.5-70 40.1-96.7 26.3-26.4 59.6-40.3 96.6-40.4 37 0 71 13.9 96.8 39.6 11 11.1 18.6 21.6 26.3 36.5 4.6 9 6.5 11.7 9.3 13.2 7.6 4.2 16.6-.6 17.6-9.4.4-3.8-.1-5.9-3.4-12.9-17.8-37.9-51.1-68.2-90.9-82.8-4.4-1.6-13.4-4.2-20-5.7-10.6-2.4-14.2-2.8-32.4-3-11.3-.1-23.2.2-26.5.7z"></path><path d="M259.4 387.4l-3.4 3.4v90.4l3.4 3.4c3 3 4 3.4 8.6 3.4s5.6-.4 8.6-3.4l3.4-3.4v-90.4l-3.4-3.4c-3-3-4-3.4-8.6-3.4s-5.6.4-8.6 3.4z"></path></svg>
	`;

	const weatherInfoArray = [
		`${windIcon}Vento: ${currentWeatherData.wind.speed}m/s ${windLabel}`,
		`${pressureIcon}Pressione: ${currentWeatherData.main.pressure}hPa`,
		`${cloudsIcon}Nuvole: ${currentWeatherData.clouds.all}%`,
		`Visibilità: ${currentWeatherData.visibility / 1000}km`,
		`Umidità: ${currentWeatherData.main.humidity}%`,
	];

	const weatherInfoUL = createEl("ul");
	addClass(weatherInfoUL, "weather-info-ul");
	weatherInfoArray.forEach((info) => {
		const infoLI = createEl("li");
		infoLI.innerHTML = info;
		weatherInfoUL.append(infoLI);
	});

	//** APPEND **//
	mainInfoEl.append(dateCurrentEl, cityName, tempDiv, weatherDescription, weatherInfoUL);
	headerEl.append(mainInfoEl);
}
