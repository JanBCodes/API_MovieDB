const app = () => {

document.addEventListener('DOMContentLoaded', () => {
const main = () => {
    
/*
API-KEY
1b562e1d6f5dd3a38fcbe32f5c01f875


Latest Movie: 
https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US

Upcoming Movie:
https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1

Top Rated Movies
https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1

*/


    const apiEndPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`
    let endPointPage = 1;
    const movieMainDiv = document.querySelector("#movieMain")
    const navBarMenu = document.querySelector("#menu")
    let width = 500;
    let moviesArray=[]; //Using for Storing Selected Movie Object from API

//------------------------- API Call for Now Playing
    function nowPlaying ()
    {
        let endPoint=`${apiEndPoint}${endPointPage}` 

        navBarMenu.innerHTML=`
        <li id="menuItem1">Now Playing</li>
        <li id="menuItem2">Just Released</li>`

        fetch(endPoint) 

        .then(function(response){

            response.json() 

            .then(function(data){

            moviesArray.push(data)
            //console.log(moviesArray)
           
            let movieMainDynamic=
            `<div id="movieMainNowPlaying">
                <div id="previous"> Previous Page </div>
                <div id="next"> Next Page</div>`

            //movieDiv.forEach((i)=>{}) - can use Array ES6 feature
            for( i= 0; i < data.results.length ; i++)
            {
                movieMainDynamic+=`
                <div id="${i}" class="movieContainer">
                    <h2 id="h2"> ${data.results[i].title} </h2>
                    <h3 id="voteAvg"> Vote Average: ${data.results[i].vote_average} </h3>
                    <img src="https://image.tmdb.org/t/p/original/${data.results[i].poster_path}" width="${width}px"> 
                    <p> ${data.results[i].overview} </p>
                    <p> Release Date: ${data.results[i].release_date} </p>
                    <span id="${data.results[i].id}"> </span>
                </div>`
                
                movieMainDiv.innerHTML = movieMainDynamic
                
            }//end of FOR loop
            `</div>`//

            //------------Event Listeners on Now Playing Page
           
            const previousPage = document.querySelector("#previous");
            previousPage.addEventListener("click",()=>{
        
                if(endPointPage==0 || endPointPage==1)
                {
                    endPointPage=1;
                }
                else
                {
                    endPointPage--;
                }
                moviesArray=[];
                nowPlaying();
            });
        
            const nextPage = document.querySelector("#next");
            nextPage.addEventListener("click",()=>{
                
                if(endPointPage>=endPoint.length)
                {
                    endPointPage=endPoint.length-1;
                }
                else
                {
                    endPointPage++;
                }      
                moviesArray=[];
                console.log(`nextPage`)
                console.log(`${endPointPage}`)

                nowPlaying();
            
            })

            const movieMainNowPlaying = document.querySelector("#movieMainNowPlaying") // FIX
            movieMainNowPlaying.addEventListener("click",(event)=>{

                let elementClicked = event.target
                let elementParent = elementClicked.parentNode
        
                //console.log(moviesArray)
                console.log(elementParent.parentNode)
                //console.log(elementParent.children)
                
               // if(elementParent.tagName == "DIV") //  *FIX - more specific
              //  {
                   let movieDivSelectedID = elementParent.id;
                   let movieSelectedObject = moviesArray[0].results[movieDivSelectedID]
           
                   removeChild(movieMainNowPlaying)
                   movieTrailer(movieSelectedObject);


        
                //} // end of IF
             }); // end of Event Listener movieMainDIv 
           
            })

            .catch((err)=>{
                console.log(`Error :${err}`)

            })
        })
        .catch((err)=>{
            console.log(`Error :${err}`)

        })

    }; // end of nowPlaying ()
    nowPlaying();

// ---------------- MOVIE DETAILS * FIX

    const removeChild = (parentNode) => {

    while (parentNode.hasChildNodes()) 
    {  
        parentNode.removeChild(parentNode.firstChild);
    }
    }

    const movieTrailer = (movieSelectedObject) =>{

        console.log(movieSelectedObject)
        width = 800;
        //let selectedMovieTrailer=""

        navBarMenu.innerHTML=`
        <li id="menuItem1">Back</li>
        <li id="menuItem2"> Now Playing </li>`

        const movieTrailerEndPoint= `https://api.themoviedb.org/3/movie/${movieSelectedObject.id}/videos?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US `

        fetch(movieTrailerEndPoint) 

        .then(function(response){

            response.json() 

            .then(function(movieTrailer){

                let selectedMovieTrailer= movieTrailer.results[0].key

                movieMainDiv.innerHTML = `
                <div id="movieTrailerDiv">
                    <div id="movieTrailerVideo">
                        <iframe width="560" height="315" 
                            src="https://www.youtube.com/embed/${selectedMovieTrailer}" 
                            frameborder="0" allow="accelerometer; autoplay; 
                            encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                        <div id="movieTrailerInfo">
                            <h2 id="h2"> ${movieSelectedObject.title} </h2>
                            <h3 id="voteAvg"> Vote Average: ${movieSelectedObject.vote_average} </h3>
                            <p> ${movieSelectedObject.overview} </p>
                            <p> Release Date: <br> ${movieSelectedObject.release_date} </p>
                        </div>
                    </div>
                    <div id="movieTrailer">
                        <img src="https://image.tmdb.org/t/p/original/${movieSelectedObject.poster_path}" width="${width}px">         
                    </div>
                </div>`

            //------------Event Listeners on Movie Trailer Page
            const backtoPreviousPage =  document.querySelector("#menuItem1")
            backtoPreviousPage.addEventListener("click", ()=>{
    
                removeChild(movieTrailerDiv)
                nowPlaying()
            })

            const menuNowPlayingHomePage =  document.querySelector("#menuItem2")
            menuNowPlayingHomePage.addEventListener("click", ()=>{

                endPointPage=1;
                nowPlaying()
            })

            }) // end of then

            .catch((err)=>{
                console.log(`Error :${err}`)

            })

        .catch((err)=>{
            console.log(`Error :${err}`)
        })

        });
        
    }; //end of movieDetails ()


// ----------------
// -------------- 
        /*    const goToTopButton = document.querySelector("#goToTop");

            goToTopButton.addEventListener("click", ()=> {
                    -- FIX --
                h1 = document.querySelector("#headerDiv");

                h1.style.top = 0; // For Chrome, Firefox, IE and Opera
                    
            })
            */
        }; // end of main ()
        main()
    }); // end of DOM Content Loaded
  
}; // end of app()
app()

