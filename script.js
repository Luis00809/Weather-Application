let userInput = $('#city');
let button = $('#search');

let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1676eb10cf8e7b54d30c52535ce74dbd'
let cityName = $('#city-name');

let currentTemp = $('#current-temp');
let currentWind = $('#current-wind');
let currentHumidity = $('#current-humidity');

let forecast;

let forecastDate = $('.date');
let forecastIcon = $('.icon');
let forecastTemp = $('.temp');
let forecastWind = $('.wind');
let forecastHumidity = $('.humidity');


    // need to take userinput and concatinate it into the url so that location in the url is equal to user input
    // once it location equal userinput then we parse the coordiantes (lan and long) into separate variables
    // now we use the weather api to call for the weather and then work from there


button.on("click", function(event){
    console.log('hello')
    let searchButton = event.target
    let div = $(button).parent();
    let input = div.find('input');
    let userCity = input.val();
    
    let geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userCity + '&limit=1&appid=1676eb10cf8e7b54d30c52535ce74dbd'
    console.log(geoUrl);



    function addForecast(forecast) {
        // create from top to bottom and then append from top to bottom
        // 1st div appends to div class = card-group
        // then next div appends to div with card
        // rest of element append to above div in that order
        let grandparentdiv = $('#grandparentForForecast')
        forecast.forEach(function(day) {
            let parentDiv = $('<div>').addClass('card bg-primary');
            grandparentdiv.append(parentDiv);
        
            let childDiv = $('<div>').addClass('card-body');
            parentDiv.append(childDiv);
        
            // how to get the date?
            let title = $('<h5>').addClass('card-title date').text(day.dt);
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


    fetch(geoUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data){
        for (let i = 0; i < data.length; i++){
        console.log(data[i].name);
        console.log(data[i].lat);
        console.log(data[i].lon);
        console.log(data[i].state);
        
        cityName.text(data[i].name + ', ' + data[i].state)
        console.log(data)
        
        let longitude = data[i].lon;
        let latitude = data[i].lat;
        let weatherURL = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + latitude + '&lon='+ longitude + '&units=imperial&appid=1676eb10cf8e7b54d30c52535ce74dbd'
        console.log(weatherURL)

    fetch(weatherURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            currentTemp.text('Current temperature is: ' + data.current.temp + '° F');
            currentWind.text('Wind: ' + data.current.wind_speed + ' MPH');
            currentHumidity.text('Humidity: ' + data.current.humidity + '%')

            let forecast = data.daily.slice(0, 5);
           
            addForecast(forecast);

            
    
        })

    };

    })
})