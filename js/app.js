function init()
{
    let click ="ON"
    const displayMenu =document.querySelector("#hamburgerMeanIcon")
    displayMenu.addEventListener(`click`, ()=> {

        if(click=="ON")
        {
            const menu=document.querySelector("#Menu")
            menu.style.display=`block`  
            
            click="OFF"
        }
        else
        {
            const menu=document.querySelector("#Menu")
            menu.style.display=`none`  
            
            click="ON"
        }



    })
}
init()


function api()
{

        const endPoint=`https://api.themoviedb.org/3/movie/now_playing?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=1`
        const latestMovie=`https://api.themoviedb.org/3/movie/latest?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US`
        
        console.log(latestMovie)

        //This code is used to get a response from the REST API.
        fetch(latestMovie) //asynchronous 

        .then(function(response){

            response.json() // async operation 
            .then(function(data){

            const movieDiv = document.querySelector(".movieContainer");
            //movieDiv.innerHTML="" THIS IS `${data.results[0].title}`"
            
            
            /*`The current temperature in ${dropDownList.value} is ${data.current.temperature}`;
            div.innerHTML+=`<br>The current weather description is ${data.current.weather_descriptions[0]} <br>`;
                /*
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
