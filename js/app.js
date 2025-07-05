async function fetchData(area) {
	try {
		const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=89d2e5ee2c5547a4b78164811250507&q=${area}&days=3`);
		if (!response.ok) {
			throw new Error(`${response.status}`);
		}
		const data = await response.json();
		displayCurrent(data.location, data.current);
		displayNext(data.forecast.forecastday);
		return data;
	} catch (error) {
		console.log(error);
	}
}
function displayCurrent(location, current) {
	let currentWeather = `
	<div class="today forecast">
		<div class="forecast-header">
			<div class="day">${getDayName(location.localtime)}</div>
			<div class="date">${getMonthName(location.localtime)}</div>
		</div> 
		<div class="forecast-content">
			<div class="location">${location.name}</div>
			<div class="degree" style="margin-bottom: 50px;">
				<div class="num">${current.temp_c}<sup>o</sup>C</div>
				<div class="forecast-icon">
					<img src="${current.condition.icon}" alt="" width=90>
				</div>
				<div style="color: #009ad8;">${current.condition.text}</div>
			</div>
			<span><img src="images/icon-wind.png" alt="">${current.wind_mph}km/h</span>
		</div>
	</div>
	`;
	document.querySelector("#forecast").innerHTML = currentWeather;
}

function getDayName(date) {
	var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day_number = new Date(date).getDay();
	let day_name = weekday[day_number];
	return day_name;
}

function getMonthName(date) {
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let month_number = new Date(date).getMonth();
	let day_number = new Date(date).getDate();
	let month_name = month[month_number];
	return day_number + " " + month_name;
}

function displayNext(forecast) {
	var nextWeather = ``;
	for (let i = 1; i < forecast.length; i++) {

		nextWeather += `
		<div class="forecast">
			<div class="forecast-header">
				<div class="day">${getDayName(forecast[i].date)}</div>
			</div>
			<div class="forecast-content">
				<div class="forecast-icon">
					<img src="${forecast[i].day.condition.icon}" alt="" width=48>
				</div>
				<div class="degree">${forecast[i].day.maxtemp_c}<sup>o</sup>C</div>
				<small>${forecast[i].day.mintemp_c}<sup>o</sup></small>
			</div>
		</div>
		`;
	}

	document.querySelector("#forecast").innerHTML += nextWeather;

}

document.getElementById("search").addEventListener("keyup", e => {
	fetchData(e.target.value)
});

fetchData('egypt');