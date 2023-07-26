let userInput = $('#city');
let button = $('#search');

let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1676eb10cf8e7b54d30c52535ce74dbd'
let cityName = $('#city-name');

let divForCurrentW = $('.current-weather');
let currentTemp = $('#current-temp');
let currentWind = $('#current-wind');
let currentHumidity = $('#current-humidity');

let forecast;

let forecastDate = $('.date');
let forecastIcon = $('.icon');
let forecastTemp = $('.temp');
let forecastWind = $('.wind');
let forecastHumidity = $('.humidity');

let lastCity = localStorage.getItem('cityHistory')

let historyList = $('.history');

let icon = $('<img>').addClass('card-img').attr({
    'src': 'https://openweathermap.org/img/wn/01d.png',
    'height': '4px',
    'width': '10px'
});




button.on("click", function(event){
    let userCity = $('#city').val();
    localStorage.setItem('cityHistory', userCity);
   
    let buttonEl = $('<button>');
    buttonEl.text(userCity);
    historyList.append(buttonEl);

    buttonEl.on('click', function(event){
        let selectedCity = $(event.target).text();
        userCity = selectedCity;
        fetchWeatherData(userCity);
    });

    let currentDate = new Date();
    let formattedDate = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();


let weatherIconURL = 'https://openweathermap.org/img/wn/01d@2x.png';



    let geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userCity + '&limit=1&appid=1676eb10cf8e7b54d30c52535ce74dbd'

    function addForecast(forecast) {
        let grandparentdiv = $('#grandparentForForecast')
        grandparentdiv.empty();
        forecast.forEach(function(day, index) {
            let parentDiv = $('<div>').addClass('card');
            grandparentdiv.append(parentDiv);
        
            let childDiv = $('<div>').addClass('card-body');
            parentDiv.append(childDiv);
        
            let nextDate = new Date(currentDate);
            nextDate.setDate(nextDate.getDate() + index + 1);

            let formattedDate = (nextDate.getMonth() + 1) + '/' + nextDate.getDate() + '/' + nextDate.getFullYear();

            let title = $('<h5>').addClass('card-title date').text(formattedDate);
            childDiv.append(title);
        
            let icon = $('<p>').addClass('card-text icon').text(day.icon);
            childDiv.append(icon);
        
            let temp = $('<p>').addClass('card-text temp').text('Temp: ' + day.temp.day + '° F');
            childDiv.append(temp);
        
            let wind = $('<p>').addClass('card-text wind').text('Wind: ' + day.wind_speed + ' MPH');
            childDiv.append(wind);
        
            let humidity = $('<p>').addClass('card-text humidity').text('Humidity: ' + day.humidity + '%');
            childDiv.append(humidity);
        });
    }

    function fetchWeatherData(city) {
        let geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=1676eb10cf8e7b54d30c52535ce74dbd'

        fetch(geoUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            for (let i = 0; i < data.length; i++){
                // add weather icon using html img 
                cityName.text(data[i].name + ', ' + data[i].state + ' (' + formattedDate + ')').append(icon);
                let longitude = data[i].lon;
                let latitude = data[i].lat;
                let weatherURL = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + latitude + '&lon='+ longitude + '&units=imperial&appid=1676eb10cf8e7b54d30c52535ce74dbd'

                fetch(weatherURL)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    divForCurrentW.addClass('border border-primary');
                    currentTemp.text('Current temperature is: ' + data.current.temp + '° F');
                    currentWind.text('Wind: ' + data.current.wind_speed + ' MPH');
                    currentHumidity.text('Humidity: ' + data.current.humidity + '%')
                    
                    let forecast = data.daily.slice(0, 5);
                    addForecast(forecast);
                });
            }
        });
    }

    fetchWeatherData(userCity);
});

