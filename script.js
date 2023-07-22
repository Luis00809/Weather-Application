let userInput = $('#city');
let button = $('#search');

let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1676eb10cf8e7b54d30c52535ce74dbd'


fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data){
        for ( let i = 0; i < data.length; i++);
        console.log(data);
    })


    // need to take userinput and concatinate it into the url so that location in the url is equal to user input
    // once it location equal userinput then we parse the coordiantes (lan and long) into separate variables
    // now we use the weather api to call for the weather and then work from there


button.on("click", function(event){
    console.log('hello')
    let searchButton = event.target
    let div = $(button).parent();
    let input = div.find('input');
    let userCity = input.val();
    // figure out later about cities with a space inbetween since New York broke the url apart after the space

    let geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userCity + '&limit=1&appid=1676eb10cf8e7b54d30c52535ce74dbd'
    console.log(geoUrl);
})