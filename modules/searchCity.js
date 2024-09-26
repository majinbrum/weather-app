import { createEl, querySel } from "./utilities.js";
import { getWeather } from "../script.js";
import { comuniPA } from "../material/comuniPA.js";

const searchInputContainer = querySel(".search-input-container");
const searchInputEl = querySel(".search-city-input");
let filteredComuniPA = [];

export function filterComuniPA() {
	const searchInputValue = searchInputEl.value;
	// console.log(searchInputValue);

	filteredComuniPA = [];
	comuniPA.map((city) => {
		if (city.value.includes(searchInputValue)) {
			filteredComuniPA.push(city);
		}
	});

	const searchDropdownUL = querySel(".search-dropdown-menu");
	if (filteredComuniPA.length <= 10 && filteredComuniPA.length > 0) {
		if (searchDropdownUL) {
			searchDropdownUL.style.display = "flex";
			searchDropdownUL.innerHTML = "";
			renderDropdown(filteredComuniPA, searchDropdownUL);
		} else {
			const searchDropdownUL = createEl("ul");
			searchDropdownUL.className = "search-dropdown-menu";
			searchInputContainer.append(searchDropdownUL);

			renderDropdown(filteredComuniPA, searchDropdownUL);
		}
	}

	if (filteredComuniPA.length == 0) {
		if (searchDropdownUL) {
			searchDropdownUL.style.display = "none";
		}
	}
}

function renderDropdown(filteredComuniPA, searchDropdownUL) {
	// console.log(filteredComuniPA);
	filteredComuniPA.forEach((comune) => {
		const filteredComuneLI = createEl("li");
		const filteredComuneA = createEl("a");
		filteredComuneA.textContent = comune.name;
		filteredComuneA.id = comune.value;
		filteredComuneLI.append(filteredComuneA);
		searchDropdownUL.append(filteredComuneLI);
	});

	searchDropdownUL.addEventListener("click", function (e) {
		if (e.target.tagName === "A") {
			const selectedCity = e.target.id;
			searchCity(selectedCity);
		}
	});

	if (searchDropdownUL) {
		document.addEventListener("click", function (e) {
			if (!searchInputContainer.contains(e.target)) {
				searchDropdownUL.style.display = "none";
			}
		});
	}
}

export function searchCity(cityToSearch) {
	const searchDropdownEl = querySel(".search-dropdown-menu");
	if (searchDropdownEl) {
		searchDropdownEl.style.display = "none";
	}
	searchInputEl.value = "";
	getWeather(cityToSearch);
}
