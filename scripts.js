// var sunrise = new Date(1694044936 * 1000); // multiply by 1000 to convert to milliseconds
// var sunriseString = sunrise.toISOString(); // format as ISO-8601 string
// console.log(sunriseString);


'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=delhi';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8431e7e251msh9f867222a8fb921p112197jsn0f3df50ad9f2',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

async function DateFormatFunction(e){
    var sunRise=new Date(e*1000)
    return sunRise.toLocaleString('en-IN', {timeStyle: 'short'}); // format as AM/PM
}

async function searchCity(e="bhubaneswar"){

    document.getElementById("spinner").style.display="flex"
    document.getElementById("cityName").innerHTML=`${e[0].toUpperCase()+e.slice(1)}`
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+e, options)
    .then(response => response.json())
    .then(async response => {

        console.log(response)

        document.getElementById("temp").innerHTML=
        response.temp+"°C"
        document.getElementById("feels-like").innerHTML=response.feels_like
        document.getElementById("max-temp").innerHTML=response.max_temp
        document.getElementById("min-temp").innerHTML=response.min_temp
        document.getElementById("humidity").innerHTML=response.humidity+"%"

        document.getElementById("sunrise").innerHTML=await DateFormatFunction(response.sunrise)
        document.getElementById("sunset").innerHTML=await DateFormatFunction(response.sunset)
        document.getElementById("wind-speed").innerHTML=response.wind_speed

        window.setTimeout(function() {
            document.getElementById("spinner").style.display="none"
          }, 1000);
    })
    .catch(err => console.error(err))
}

let submit=document.getElementById("submit-btn")
submit.addEventListener("click",(e)=>{
    e.preventDefault()
    let s= document.getElementById("search-bar")
    searchCity(s.value)
})

async function updatetable(){
    await updatetableMini("delhi")
    await updatetableMini("london")
    await updatetableMini("tokyo")
    await updatetableMini("san francisco")
    async function updatetableMini(e)
    {
        let response = await fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+e, options);
        // parse the response as json
        response = await response.json();
        // update the HTML elements
        console.log(response)
        document.getElementById(`${e[0]}-temp`).innerHTML=
        response.temp+"°C"
        document.getElementById(`${e[0]}-maxtemp`).innerHTML=response.max_temp
        document.getElementById(`${e[0]}-humidity`).innerHTML=response.humidity+"%"
    }

}
updatetable()

async function refreshbtn(){
    document.getElementById("spinner").style.display="flex"
    console.log("!")
    e=document.getElementById("cityName")
    // fetch the data
    searchCity(e.innerHTML)
    await updatetable()
    // wait for the specified time
    window.setTimeout(function() {
      document.getElementById("spinner").style.display="none"
    }, 1000);
}


    // cloud_pct
    
    // feels_like
    
    // humidity
    
    // max_temp
    
    // min_temp
    
    // sunrise
    
    // sunset
    
    // temp
    
    // wind_degrees
    
    // wind_speed