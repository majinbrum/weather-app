const windSpeedRanges = [
	{
		description: "calmo",
		min_speed: 0,
		max_speed: 0.2,
	},
	{
		description: "brezza leggera",
		min_speed: 0.3,
		max_speed: 3.3,
	},
	{
		description: "brezza moderata",
		min_speed: 3.4,
		max_speed: 5.5,
	},
	{
		description: "brezza tesa",
		min_speed: 5.6,
		max_speed: 7.9,
	},
	{
		description: "vento forte",
		min_speed: 8.0,
		max_speed: 10.7,
	},
	{
		description: "vento forte, burrasca",
		min_speed: 10.8,
		max_speed: 13.8,
	},
	{
		description: "burrasca",
		min_speed: 13.9,
		max_speed: 17.1,
	},
	{
		description: "burrasca forte",
		min_speed: 17.2,
		max_speed: 20.7,
	},
];

export function getWindDescription(windSpeed) {
	// console.log(windSpeed);
	let windDescription = "";

	windSpeedRanges.forEach((singleWindRange) => {
		if (windSpeed >= singleWindRange.min_speed && windSpeed <= singleWindRange.max_speed) {
			windDescription = singleWindRange.description[0].toUpperCase() + singleWindRange.description.slice(1);
			// console.log(singleWindRange);
			// console.log(windDescription);
		}
	});
	return windDescription;
}

const windDegRanges = [
	{
		label: "N",
		description: "Nord",
		min_degrees: 348.75,
		max_degrees: 11.25,
	},
	{
		label: "NNE",
		description: "Nord Nord Est",
		min_degrees: 11.25,
		max_degrees: 33.75,
	},
	{
		label: "NE",
		description: "Nord Est",
		min_degrees: 33.75,
		max_degrees: 56.25,
	},
	{
		label: "ENE",
		description: "Est Nord Est",
		min_degrees: 56.25,
		max_degrees: 78.75,
	},
	{
		label: "E",
		description: "Est",
		min_degrees: 78.75,
		max_degrees: 101.25,
	},
	{
		label: "ESE",
		description: "Est Sud Est",
		min_degrees: 101.25,
		max_degrees: 123.75,
	},
	{
		label: "SE",
		description: "Sud Est",
		min_degrees: 123.75,
		max_degrees: 146.25,
	},
	{
		label: "SSE",
		description: "Sud Sud Est",
		min_degrees: 146.25,
		max_degrees: 168.75,
	},
	{
		label: "S",
		description: "Sud",
		min_degrees: 168.75,
		max_degrees: 191.25,
	},
	{
		label: "SSW",
		description: "Sud Sud Ovest",
		min_degrees: 191.25,
		max_degrees: 213.75,
	},
	{
		label: "SW",
		description: "Sud Ovest",
		min_degrees: 213.75,
		max_degrees: 236.25,
	},
	{
		label: "WSW",
		description: "Ovest Sud Ovest",
		min_degrees: 236.25,
		max_degrees: 258.75,
	},
	{
		label: "W",
		description: "Ovest",
		min_degrees: 258.75,
		max_degrees: 281.25,
	},
	{
		label: "WNW",
		description: "Ovest Nord Ovest",
		min_degrees: 281.25,
		max_degrees: 303.75,
	},
	{
		label: "NW",
		description: "Nord Ovest",
		min_degrees: 303.75,
		max_degrees: 326.25,
	},
	{
		label: "NNW",
		description: "Nord Nord Ovest",
		min_degrees: 326.25,
		max_degrees: 348.75,
	},
];

export function getWindLabel(windDeg) {
	// console.log(windSpeed);
	let windLabel = "";

	windDegRanges.forEach((singleWindRange) => {
		if (windDeg >= singleWindRange.min_degrees && windDeg <= singleWindRange.max_degrees) {
			windLabel = singleWindRange.label;
			// console.log(singleWindRange);
			// console.log(windLabel);
		}
	});
	return windLabel;
}
