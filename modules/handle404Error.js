import { createEl, querySel } from "./utilities.js";
const mainEl = querySel("main");

export function handle404Error(city) {
	const cityNotFoundDiv = createEl("div");
	cityNotFoundDiv.className = "error-404-div";
	cityNotFoundDiv.style.display = "flex";
	cityNotFoundDiv.style.alignItems = "start";
	cityNotFoundDiv.style.justifyContent = "space-between";
	cityNotFoundDiv.style.backgroundColor = "rgba(120, 203, 191, 0.8)";
	cityNotFoundDiv.style.padding = "0.6rem 1rem";
	cityNotFoundDiv.style.borderRadius = "1rem";
	cityNotFoundDiv.style.marginBottom = "1rem";

	const cityNotFoundText = createEl("p");
	cityNotFoundText.style.color = "#fff";
	cityNotFoundText.textContent = `Nessun risultato per ${city}`;

	const cityNotFoundClose = createEl("button");
	cityNotFoundClose.textContent = "X";
	cityNotFoundClose.style.color = "#fff";
	cityNotFoundClose.style.backgroundColor = "transparent";
	cityNotFoundClose.style.border = "none";
	cityNotFoundClose.style.cursor = "pointer";

	cityNotFoundDiv.append(cityNotFoundText, cityNotFoundClose);
	mainEl.insertAdjacentElement("afterbegin", cityNotFoundDiv);

	cityNotFoundClose.addEventListener("click", function () {
		cityNotFoundDiv.remove();
	});
}
