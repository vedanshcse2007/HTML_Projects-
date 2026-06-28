const apiKey = "0943153e7c44cdbf29bb0f10b6b8124a";

const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");

const loading = document.getElementById("loading");

const error = document.getElementById("error");

async function getWeather(city){

loading.style.display="block";

weatherCard.style.display="none";

error.innerHTML="";

try{

const response = await fetch(

`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

);

if(!response.ok){

throw new Error("City Not Found");

}

const data = await response.json();

displayWeather(data);

}

catch(err){

error.innerHTML=err.message;

}

finally{

loading.style.display="none";

}

}

function displayWeather(data){

document.getElementById("cityName").innerHTML=

`${data.name}, ${data.sys.country}`;

document.getElementById("temperature").innerHTML=

`${data.main.temp} °C`;

document.getElementById("description").innerHTML=

data.weather[0].description;

document.getElementById("humidity").innerHTML=

`${data.main.humidity}%`;

document.getElementById("wind").innerHTML=

`${data.wind.speed} m/s`;

document.getElementById("pressure").innerHTML=

`${data.main.pressure} hPa`;

document.getElementById("feelsLike").innerHTML=

`${data.main.feels_like} °C`;

document.getElementById("visibility").innerHTML=

`${data.visibility/1000} km`;

document.getElementById("country").innerHTML=

data.sys.country;

document.getElementById("weatherIcon").src=

`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

const sunrise = new Date(data.sys.sunrise*1000);

const sunset = new Date(data.sys.sunset*1000);

document.getElementById("sunrise").innerHTML=

sunrise.toLocaleTimeString();

document.getElementById("sunset").innerHTML=

sunset.toLocaleTimeString();

document.getElementById("updated").innerHTML=

"Last Updated : " +

new Date(data.dt*1000).toLocaleString();

weatherCard.style.display="block";

}

searchBtn.addEventListener("click",()=>{

const city=cityInput.value.trim();

if(city===""){

error.innerHTML="Please Enter City Name";

return;

}

getWeather(city);

});

cityInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

searchBtn.click();

}

});

getWeather("Mumbai");