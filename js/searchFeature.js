const search = ()=>{
   
    const allNowPlaying = []; 

     for(i=1; i<=6; i++)
     {
         let nowplayPage = `https://api.themoviedb.org/3/movie/upcoming?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=${i}`;

         fetch(nowplayPage)

        .then((response) => {

        response.json() 

            .then((data) => {


            allNowPlaying.push(data)

            console.log(allNowPlaying)


            })//end of 2nd then

            .catch((err)=>{
            console.log(`Error 1 :${err}`)

            });

        })

        .catch((err)=>{
        console.log(`Error 2 :${err}`)

        });


     } // end of FOR
//------------------------------------------------------------------------------------------------------------------------
//------------ Validating DATA against SEARCH.value
    // console.log(allNowPlaying)

     //let searchMovie = "The Outpost"

    let moviechecked = `${allNowPlaying[1].results[1].id      }`       //FIX

    console.log(moviechecked)


//------------------------------------------------------------------------------------------------------------------------
}; // end of search() 
search()

/*    let nowPlayingEP=`https://api.themoviedb.org/3/movie/upcoming?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=1`

    fetch(nowPlayingEP)

        .then((response) => {

            response.json() 

            .then((data) => {







            })//end of 2nd then

            .catch((err)=>{
                console.log(`Error 1 :${err}`)

            });

        })

        .catch((err)=>{
        console.log(`Error 2 :${err}`)

    }); */

/*         


const apiEndPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`; // 28pages
let endPointPage = 1;
let nowPlayingMoviesArray=[]; //

const apiEndPointPopular = `https://api.themoviedb.org/3/movie/popular?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`; // 500pages
let endPointPagePopular = 1; // 500pages
let popularMoviesArray=[];

const apiEndPointComingSoon = `https://api.themoviedb.org/3/movie/upcoming?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`;  //6pages
let endPointPageComing = 1;
let comingSoonMoviesArray=[];

const apiEndPointTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`; // 376pages
pges 376

fetch(popularEP)


*/ // ---------------------------------------------------------------------------------------------------------