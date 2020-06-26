function init()
{
    const displayMenu =document.querySelector("span")
    displayMenu.addEventListener(`click`, ()=> {

        console.log(`Clicked`)
        

    })
}
init()


function api()
{

        const endPoint=`https://api.themoviedb.org/3/movie/550?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875`
        console.log(endPoint)

        //This code is used to get a response from the REST API.
        fetch(endPoint) //asynchronous 

        .then(function(response){

            response.json() // async operation 
            .then(function(data){

            /*const div = document.querySelector("#displayWeather");
            div.innerHTML=`The current temperature in ${dropDownList.value} is ${data.current.temperature}`;
            div.innerHTML+=`<br>The current weather description is ${data.current.weather_descriptions[0]} <br>`;
        
            //Dynamically created elements
            const weatherImg = document.createElement("img");
            weatherImg.setAttribute("src",data.current.weather_icons[0]);
            div.appendChild(weatherImg);// must append!
                */
            })
            .catch(function(err){
                console.log(`Error :${err}`)
            })
        })
        .catch(function(err){
            console.log(`Error :${err}`)
        })

}
api();
