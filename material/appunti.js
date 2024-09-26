//* PALERMO IDs:
//* questi due danno le stesse info, dovrebbe essere la città:
// "id": 2523920 // lon: 13.3598, lat: 38.1158
// "id": 6542127, // lon: 13.3614, lat: 38.1157
//* questo dovrebbe essere quello di tutta la provincia:
// https://openweathermap.org/city/2523918
// "id": 2523918 // lon: 13.5833, lat: 37.8167

// Built-in API request by city ID
// https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}

// Units of measurement
// https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric

// Multilingual support
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&lang={lang}

// Prima fetch che voglio ottenere:
// https://api.openweathermap.org/data/2.5/weather?id=${PALERMO_ID}&appid=${API_KEY}&units=metric&lang=${LANG_IT}

//**********DATA**********//
const dt = 1718643926;
const timezone = 7200; // Timezone offset in seconds

function getTime(dt, timezone) {
	const date = new Date(dt * 1000);
	const timezoneOffset = timezone * 1000;
	const adjustedDate = new Date(date + timezoneOffset);

	return adjustedDate.toLocaleDateString("it-IT", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

getTime(dt, timezone);
