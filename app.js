window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature-section");
    const temperatureSpan = document.querySelector(".temperature-section span");
    let displaydesc = document.querySelector(".displayif");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/04d05ae52e4750549a2dfaccce6ec6bf/${lat},${long}`;

            fetch(api).then(response =>{
                return response.json();
              }).then(data =>{
                  const {temperature,summary,icon} = data.currently;
                  //set DOM elements from the api
                  temperatureDegree.textContent = temperature;
                  temperatureDescription.textContent = summary;
                  locationTimezone.textContent = data.timezone;
                  displaydesc.textContent = "Thanks for using myWeatherApp! hope you like the weather today";
                  //formula for celcius
                   let celsius = (temperature -32) *(5/9);
                  setIcons(icon, document.querySelector(".icon"));
                  // change temp to celsius/farenheit
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent==="F"){
                          temperatureDegree.textContent = Math.floor(celsius);
                          temperatureSpan.textContent = "C";
                        }
                        else {
                          temperatureSpan.textContent = "F";
                          temperatureDegree.textContent = temperature;
                        }
                    });
              });
        },showError);
      }
      function showError(error) {
        switch(error.code){
            case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation API");
            displaydesc.textContent = "Please reload to ensure you allow the browser to access your location";
            break;
        case error.POSITION_UNAVAILABLE:
            alert("USer location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
      }
    function  setIcons(icon, iconID){
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g,"_").toUpperCase(); //looks for everyline and replaces it with underscore
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
});
