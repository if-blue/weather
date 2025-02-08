const button = document.getElementById("button");

button.addEventListener("click", () => {
    const location = document.getElementById("location").value;
    const date1 = document.getElementById("date1").value;
    const date2 = document.getElementById("date2").value;

    getWeather(location, date1, date2);
});

async function getWeather(location, date1, date2) {
    const app_key = "C5BGAY8BVW2UVYMF5M9KJX73H";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=${app_key}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Error during requisition");
            return;
        }
        const result = await response.json();
        console.log(result);

        const weatherData = result.days;

        let weatherHTML = '';
        weatherData.forEach(day => {
            const weatherInfo = {
                datetime: day.datetime,
                description: day.description,
                tempmax: day.tempmax,
                tempmin: day.tempmin,
                feelslike: day.feelslike,
                cloudcover: day.cloudcover
            };


            weatherHTML += `
                <div class="weather-day">
                    <p><strong>Data:</strong> ${weatherInfo.datetime}</p>
                    <p><strong>Descrição:</strong> ${weatherInfo.description}</p>
                    <p><strong>Temp Máx:</strong> ${weatherInfo.tempmax}°F</p>
                    <p><strong>Temp Mín:</strong> ${weatherInfo.tempmin}°F</p>
                    <p><strong>Sensação Térmica:</strong> ${weatherInfo.feelslike}°F</p>
                    <p><strong>Cobertura de Nuvem:</strong> ${weatherInfo.cloudcover}%</p>
                </div>
            `;
        });


        const resultDiv = document.getElementById("weather-result");
        resultDiv.innerHTML = weatherHTML;
    } catch (error) {
        console.error("API response error");
    }
}
