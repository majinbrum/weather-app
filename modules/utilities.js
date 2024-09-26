export function querySel(selector) {
	return document.querySelector(selector);
}

export function createEl(el) {
	return document.createElement(el);
}

export function addClass(el, className) {
	return el.classList.add(className);
}

export function getTime(dt, timezone = 7200) {
	const date = new Date((dt + timezone) * 1000);
	return date;
}
