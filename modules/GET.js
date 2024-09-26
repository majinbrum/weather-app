import { API_KEY } from "../material/key.js";
import { handle404Error } from "./handle404Error.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const LANG_IT = "it";

export const GET = async (city = "palermo") => {
	try {
		const res = await fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric&lang=${LANG_IT}`);
		const data = await res.json();

		if (data.cod !== 200) {
			throw data;
		}

		return data;
	} catch (err) {
		// console.error(err);
		console.error("CODE OF ERROR ==>", err.cod);
		console.error("ERROR MESSAGE ==>", err.message);

		if (err.cod == 404) {
			handle404Error(city);
		}
	}
};

export const GETforecast = async (city = "palermo") => {
	const res = await fetch(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric&lang=${LANG_IT}`);
	const data = await res.json();
	return data;
};
