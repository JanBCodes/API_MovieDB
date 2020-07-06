const app = () => {

document.addEventListener('DOMContentLoaded', (event) => {
//console.log('DOM fully loaded and parsed');

const main = () => {
    
    const apiEndPoint=`https://api.themoviedb.org/3/movie/now_playing?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`
    let endPointPage=1;
    //let endPoint=`${apiEndPoint}${endPointPage}` 
    //const movieDiv = document.querySelectorAll(".movieContainer");
    const movieMainDiv = document.querySelector("#movieMain")
    let width = 500;

    let movieArray=[]
//--------------------------
//------------------------- API Call for Now Playing
    const api = () =>
    {
        // LATEST MOVIE
        //const apilatestMovie=`https://api.themoviedb.org/3/movie/latest?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US`
        
        // NOW PLAYING:
        //const apiEndPoint=`https://api.themoviedb.org/3/movie/now_playing?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=` + page

    // ----------------         
    // -------------- INITIAL LOAD : NOW PLAYING
            
        let endPoint=`${apiEndPoint}${endPointPage}` 

        fetch(endPoint) 

        .then(function(response){

            response.json() 

            .then(function(data){

            movieArray.push(data)
            //console.log(movieArray)
           
            let movieMainDynamic=`<div id="previous"> Previous Page </div>
            <div id="next">Next Page</div>`

            //movieDiv.forEach((i)=>{})
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
                    movieArray=[]
                    api()
                })
            
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
                    movieArray=[]
                    api()
                })
           
            })

            .catch((err)=>{
                console.log(`Error :${err}`)

            })
        })
        .catch((err)=>{
            console.log(`Error :${err}`)

        })

    }; // end of API ()
    api()

// ----------------
// ---------------- MOVIE DETAILS

    movieMainDiv.addEventListener("click",(event)=>{

        let elementClicked= event.target
        let elementParent = elementClicked.parentNode

        console.log(movieArray)
        console.log(elementParent)
        
        if(elementParent.tagName=="DIV")
        {
            //sessionStorage.setItem("movieSelectedObject", JSON.stringify(elementParent.children))

            /* --- remove section id=MovieMain
            while (movieMainDiv.hasChildNodes()) 
            {  
                movieMainDiv.removeChild(movieMainDiv.firstChild);
                movieDetails()
            }
            */
        }

        //sessionStorage.setItem()
     })

    const movieDetails = () =>{






        
    }; //end of moviewDetails ()

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

