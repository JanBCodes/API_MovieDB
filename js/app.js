const api = () =>
{

    //const apilatestMovie=`https://api.themoviedb.org/3/movie/latest?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US`
    //const apilatestMovie=`https://api.themoviedb.org/3/movie/latest?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US`

    
    const apiEndPoint=`https://api.themoviedb.org/3/movie/now_playing?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`
    let endPointPage=1;
    const endPoint=`${apiEndPoint}${endPointPage}`

    fetch(endPoint) 

    .then(function(response){

        response.json() 
        .then(function(data){

        const movieDiv = document.querySelectorAll(".movieContainer");
        let width = 500;
        
       for( i= 0; i < data.results.length ; i++)
        {
            movieDiv[i].innerHTML=`<h2 id="h2"> ${data.results[i].title} <h2>`
            movieDiv[i].innerHTML+=`<h3 id="voteAvg"> Vote Average:${data.results[i].vote_average} <h3>`
            movieDiv[i].innerHTML+=`<img src="https://image.tmdb.org/t/p/original/${data.results[i].poster_path}" width="${width}px">`
            movieDiv[i].innerHTML+=`<p> ${data.results[i].overview} <p>`
            movieDiv[i].innerHTML+=`<p> Release Date: ${data.results[i].release_date} <p>`

        }

        })
        .catch(function(err){
            console.log(`Error :${err}`)
        })
    })
    .catch(function(err){
        console.log(`Error :${err}`)
    })

};
api()

const app = () => {

    window.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');
        

        const main = () => {

        
    
        }
        main()





    });

   
}
app()

