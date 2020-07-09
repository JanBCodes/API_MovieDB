const app = () => {

    document.addEventListener('DOMContentLoaded', () => {
    const main = () => {
    
        //----------------------------- 
        const apiEndPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`;
        let endPointPage = 1;
        let nowPlayingMoviesArray=[];
    
        const apiEndPointPopular = `https://api.themoviedb.org/3/movie/popular?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`;
        let endPointPagePopular = 1;
        let popularMoviesArray=[];
    
        const apiEndPointComingSoon = `https://api.themoviedb.org/3/movie/upcoming?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`;
        let endPointPageComing = 1;
        let comingSoonMoviesArray=[];
    
        const apiEndPointTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US&page=`;
        let endPointPageTopRated = 1;
        let topRatedMoviesArray=[];
        
        const navBarMenu = document.querySelector("#menu");
        const movieMainDiv = document.querySelector("#movieMain");

        const scrollToTop = document.querySelector("#backToTop");
        scrollToTop.addEventListener("click", ()=>{

            backToTop=document.getElementById("#logo") // FIX
            backToTop.focus({preventScroll:false})

        })
    
        let width = 400;
    
    //------------------------- Welcome Page 
        const welcome = () =>
        {
            navBarMenu.innerHTML=`
            <li id="welcome">Welcome </li>
            <li id="menuItem1">Now Playing</li>
            <li id="menuItem2">Popular</li>
            <li id="menuItem3">Coming Soon</li>
            <li id="menuItem4">Top Rated</li>`
    
            //------------------------- Welcome Page Content
    
            movieMainDiv.innerHTML=
            `<div id="welcomeContent">
            Welcome to The Weekend Hack Movie Entertainment! 
            <br> To Navigate Our Wesbite: Just Click on Any of the Movies Lists. 
            <br>Don't forget to check out our Sponsored Section as well!
            <br> Click on "Welcome" to bring you back to this page! 
            </div>`
    
            //------------------------------Event Listeners on Welcome Page
    
            //----------------------------- Menu Event Listener
    
            const menuWelcomeHomePage =  document.querySelector("#welcome")
            menuWelcomeHomePage.addEventListener("click", ()=>{
            
                welcome()
            }); 
     
            const menuNowPlayingHomePage =  document.querySelector("#menuItem1")
            menuNowPlayingHomePage.addEventListener("click", ()=>{
    
                removeChild(welcomeContent)
                endPointPage=1;
                nowPlaying()
            });
    
            const menuPopularMovies =  document.querySelector("#menuItem2")
            menuPopularMovies.addEventListener("click", ()=>{
    
                endPointPage=1;
                popularMovies();
            });
    
            const menuComingSoonMovies =  document.querySelector("#menuItem3")
            menuComingSoonMovies.addEventListener("click", ()=>{
    
                endPointPage=1;
                comingSoon();
            });  
    
            const menuTopRatedMovies =  document.querySelector("#menuItem4")
            menuTopRatedMovies.addEventListener("click", ()=>{
    
                endPointPage=1;
                topRated();
            });
    
        }
        welcome();
    
    //------------------------- API Call for Now Playing
        const nowPlaying = () =>
        {
            let endPoint=`${apiEndPoint}${endPointPage}` 
    
            navBarMenu.innerHTML=`
            <li id="welcome">Welcome </li>
            <li id="menuItem1">Now Playing</li>
            <li id="menuItem2">Popular</li>
            <li id="menuItem3">Coming Soon</li>
            <li id="menuItem4">Top Rated</li>`
    
            fetch(endPoint) 
    
            .then((response) => {
    
                response.json() 
    
                .then((data) => {
    
                nowPlayingMoviesArray.push(data)
                //console.log(nowPlayingMoviesArray)
               
                let movieMainDynamic=
                `<div id="movieMainNowPlaying">
                    <div id="movieContainerNav" >
                        <div id="previous"> Previous Page </div>
                        <div id="displayCurrentMenuSel"> Welcome</div>
                        <div id="next"> Next Page</div>
                    </div>`
    
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
                    nowPlayingMoviesArray=[];
                    nowPlaying();
                });
                
                const displayCurrentMenuSel =  document.querySelector("#displayCurrentMenuSel")
                displayCurrentMenuSel.innerHTML = 'Now Playing';
    
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
                    nowPlayingMoviesArray=[];
                    nowPlaying();
                
                });
    
                const movieMainNowPlaying = document.querySelector("#movieMainNowPlaying") // FIX
                movieMainNowPlaying.addEventListener("click",(event)=>{
    
                    let elementClicked = event.target 
                    let elementParent = elementClicked.parentNode
           
                   if(elementParent.tagName == "DIV" && elementParent.classList == "movieContainer")
                    {
                        let movieDivSelectedID = elementParent.id;
                        let movieSelectedObject = nowPlayingMoviesArray[0].results[movieDivSelectedID]
    
                        removeChild(movieMainNowPlaying)
                        movieTrailer(movieSelectedObject, `nowPlayingPage`); 
                        nowPlayingMoviesArray=[];
                                
                    }; // end of IF
    
                }); // end of Event Listener movieMainDIv 
                           
                //----------------------------- Menu Event Listener
    
                const menuWelcomeHomePage =  document.querySelector("#welcome")
                menuWelcomeHomePage.addEventListener("click", ()=>{
                
                    welcome()
                }); 
    
                const menuNowPlayingHomePage =  document.querySelector("#menuItem1")
                menuNowPlayingHomePage.addEventListener("click", ()=>{
    
                    endPointPage=1;
                    nowPlaying()
                });
    
                const menuPopularMovies =  document.querySelector("#menuItem2")
                menuPopularMovies.addEventListener("click", ()=>{
    
                    endPointPage=1;
                    popularMovies();
                });
    
                const menuComingSoonMovies =  document.querySelector("#menuItem3")
                menuComingSoonMovies.addEventListener("click", ()=>{
    
                    endPointPage=1;
                    comingSoon();
                });  
    
                const menuTopRatedMovies =  document.querySelector("#menuItem4")
                menuTopRatedMovies.addEventListener("click", ()=>{
    
                    endPointPage=1;
                    topRated();
                });
    
                })//end of then (active)
    
                .catch((err)=>{
                    console.log(`Error :${err}`)
    
                });
            })
            .catch((err)=>{
                console.log(`Error :${err}`)
    
            })
    
        }; // end of nowPlaying ()
         //nowPlaying()//fix when add welcome page()
    
    //------------------------- API Call for Popular Movies
        const popularMovies = () =>
        {
    
            let endPoint=`${apiEndPointPopular}${endPointPagePopular}` ;
    
            navBarMenu.innerHTML=`
            <li id="welcome">Welcome </li>
            <li id="menuItem1">Now Playing</li>
            <li id="menuItem2">Popular</li>
            <li id="menuItem3">Coming Soon</li>
            <li id="menuItem4">Top Rated</li>`
    
            fetch(endPoint) 
    
            .then((response) => {
    
                response.json() 
    
                .then((data) => {
    
                    popularMoviesArray.push(data)
                    //console.log(moviesArray)
                
                    let movieMainDynamic=
                    `<div id="movieMainNowPlaying">
                        <div id="movieContainerNav" >
                            <div id="previous"> Previous Page </div>
                            <div id="displayCurrentMenuSel"> Welcome</div>
                            <div id="next"> Next Page</div>
                        </div>`
    
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
                        </div>`
                        
                        movieMainDiv.innerHTML = movieMainDynamic
                        
                    }//end of FOR loop
                    `</div>`//
    
                    //------------Event Listeners on Popular Movies Page
                
                    const previousPage = document.querySelector("#previous");
                    previousPage.addEventListener("click",()=>{
                
                        if(endPointPagePopular==0 || endPointPagePopular==1)
                        {
                            endPointPagePopular=1;
                        }
                        else
                        {
                            endPointPagePopular--;
                        }
    
                        popularMoviesArray=[];
                        popularMovies();
                    });
    
                    const displayCurrentMenuSel =  document.querySelector("#displayCurrentMenuSel")
                    displayCurrentMenuSel.innerHTML = 'Popular Movies';
                                
                    const nextPage = document.querySelector("#next");
                    nextPage.addEventListener("click",()=>{
                        
                        if(endPointPagePopular>=endPoint.length)
                        {
                            endPointPagePopular=endPoint.length-1;
                        }
                        else
                        {
                            endPointPagePopular++;
                        }      
    
                        popularMoviesArray=[];
                        popularMovies();
                    
                    });
    
                    const movieMainNowPlaying = document.querySelector("#movieMainNowPlaying") // FIX
                    movieMainNowPlaying.addEventListener("click",(event)=>{
    
                        let elementClicked = event.target   //returns an object
                        let elementParent = elementClicked.parentNode
                
                       
                        if(elementParent.tagName == "DIV" && elementParent.classList == "movieContainer") //  *FIX - more specific
                        {
                            let movieDivSelectedID = elementParent.id;
                            let movieSelectedObject = popularMoviesArray[0].results[movieDivSelectedID]
    
                            removeChild(movieMainNowPlaying)
                            movieTrailer(movieSelectedObject, 'popularMoviePage');  
                            popularMoviesArray=[]   
                                    
                        }; // end of IF
    
                    }); // end of Event Listener movieMainNowPlaying 
    
                    //----------------------------- Menu Event Listener
    
                    const menuWelcomeHomePage =  document.querySelector("#welcome")
                    menuWelcomeHomePage.addEventListener("click", ()=>{
                    
                        welcome()
                    }); 
    
                    const menuNowPlayingHomePage =  document.querySelector("#menuItem1")
                    menuNowPlayingHomePage.addEventListener("click", ()=>{
    
                        endPointPagePopular=1;
                        nowPlaying()
                    });
    
                    const menuPopularMovies =  document.querySelector("#menuItem2")
                    menuPopularMovies.addEventListener("click", ()=>{
    
                        endPointPagePopular=1;
                        popularMovies();
                    });
    
                    const menuComingSoonMovies =  document.querySelector("#menuItem3")
                    menuComingSoonMovies.addEventListener("click", ()=>{
    
                        endPointPagePopular=1;
                        comingSoon();
                    });  
    
                    const menuTopRatedMovies =  document.querySelector("#menuItem4")
                    menuTopRatedMovies.addEventListener("click", ()=>{
    
                        endPointPagePopular=1;
                        topRated();
                    });
    
                    })
    
                .catch((err)=>{
                    console.log(`Error :${err}`)
    
                })
            
            })//
    
            .catch((err)=>{
                console.log(`Error :${err}`)
    
            })
    
        }; // end of popularMovies ()
    
    //------------------------- API Call for Coming Soon
        const comingSoon = () =>
        {
    
            let endPoint=`${apiEndPointComingSoon}${endPointPageComing}` ;
    
            navBarMenu.innerHTML=`
            <li id="welcome">Welcome </li>
            <li id="menuItem1">Now Playing</li>
            <li id="menuItem2">Popular</li>
            <li id="menuItem3">Coming Soon</li>
            <li id="menuItem4">Top Rated</li>`
    
            fetch(endPoint) 
    
            .then((response) => {
    
                response.json() 
    
                .then((data) => {
    
                    comingSoonMoviesArray.push(data)
                    //console.log(moviesArray)
                
                    let movieMainDynamic=
                    `<div id="movieMainNowPlaying">
                        <div id="movieContainerNav" >
                            <div id="previous"> Previous Page </div>
                            <div id="displayCurrentMenuSel"> Welcome</div>
                            <div id="next"> Next Page</div>
                        </div>`
    
                    //movieDiv.forEach((i)=>{}) - can use Array ES6 feature
                    for(i= 0; i < data.results.length ; i++)
                    {
                        movieMainDynamic+=`
                        <div id="${i}" class="movieContainer">
                            <h2 id="h2"> ${data.results[i].title} </h2>
                            <h3 id="voteAvg"> Vote Average: ${data.results[i].vote_average} </h3>
                            <img src="https://image.tmdb.org/t/p/original/${data.results[i].poster_path}" width="${width}px"> 
                            <p> ${data.results[i].overview} </p>
                            <p> Release Date: ${data.results[i].release_date} </p>
                        </div>`
                        
                        movieMainDiv.innerHTML = movieMainDynamic
                        
                    }//end of FOR loop
                    `</div>`//
    
                    //------------Event Listeners on Popular Movies Page
                
                    const previousPage = document.querySelector("#previous");
                    previousPage.addEventListener("click",()=>{
                
                        if(endPointPageComing==0 || endPointPageComing==1)
                        {
                            endPointPageComing=1;
                        }
                        else
                        {
                            endPointPageComing--;
                        }
    
                        comingSoonMoviesArray=[];
                        comingSoon();
                    });
    
                    const displayCurrentMenuSel =  document.querySelector("#displayCurrentMenuSel")
                    displayCurrentMenuSel.innerHTML = 'Coming Soon';
                                
                    const nextPage = document.querySelector("#next");
                    nextPage.addEventListener("click",()=>{
                        
                        if(endPointPageComing>=endPoint.length)
                        {
                            endPointPageComing=endPoint.length-1;
                        }
                        else
                        {
                            endPointPageComing++;
                        }      
    
                        comingSoonMoviesArray=[];
                        comingSoon();
                    
                    });
    
                    const movieMainNowPlaying = document.querySelector("#movieMainNowPlaying") // FIX
                    movieMainNowPlaying.addEventListener("click",(event)=>{
    
                        let elementClicked = event.target   //returns an object
                        let elementParent = elementClicked.parentNode
                
                       
                        if(elementParent.tagName == "DIV" && elementParent.classList == "movieContainer") //  *FIX - more specific
                        {
                            let movieDivSelectedID = elementParent.id;
                            let movieSelectedObject = comingSoonMoviesArray[0].results[movieDivSelectedID]
    
                            removeChild(movieMainNowPlaying)
                            movieTrailer(movieSelectedObject, 'comingSoonrMoviePage');    
                            comingSoonMoviesArray=[] 
                                    
                        } // end of IF
    
                    }); // end of Event Listener movieMainNowPlaying 
    
                    //----------------------------- Menu Event Listener
    
                    const menuWelcomeHomePage =  document.querySelector("#welcome")
                    menuWelcomeHomePage.addEventListener("click", ()=>{
                    
                        welcome()
                    }); 
    
                    const menuNowPlayingHomePage =  document.querySelector("#menuItem1")
                    menuNowPlayingHomePage.addEventListener("click", ()=>{
    
                        endPointPageComing=1;
                        nowPlaying()
                    });
    
                    const menuPopularMovies =  document.querySelector("#menuItem2")
                    menuPopularMovies.addEventListener("click", ()=>{
    
                        endPointPageComing=1;
                        popularMovies();
                    });
    
                    const menuComingSoonMovies =  document.querySelector("#menuItem3")
                    menuComingSoonMovies.addEventListener("click", ()=>{
    
                        endPointPageComing=1;
                        comingSoon();
                    });  
    
                    const menuTopRatedMovies =  document.querySelector("#menuItem4")
                    menuTopRatedMovies.addEventListener("click", ()=>{
    
                        endPointPageComing=1;
                        topRated();
                    });
    
                })
    
                .catch((err)=>{
                    console.log(`Error :${err}`)
    
                });
            
            })//
    
            .catch((err)=>{
                console.log(`Error :${err}`)
    
            });
    
        }; // end of comingSoon ()
    
    //------------------------- API Call for Coming Soon
        const topRated = () =>
        {
    
            let endPoint=`${apiEndPointTopRated}${endPointPageTopRated}` ;
    
            navBarMenu.innerHTML=`
            <li id="welcome">Welcome </li>
            <li id="menuItem1">Now Playing</li>
            <li id="menuItem2">Popular</li>
            <li id="menuItem3">Coming Soon</li>
            <li id="menuItem4">Top Rated</li>`
    
            fetch(endPoint) 
    
            .then((response) => {
    
                response.json() 
    
                .then((data) => {
    
                    topRatedMoviesArray.push(data)
                    //console.log(moviesArray)
                
                    let movieMainDynamic=
                    `<div id="movieMainNowPlaying">
                        <div id="movieContainerNav" >
                            <div id="previous"> Previous Page </div>
                            <div id="displayCurrentMenuSel"> Welcome</div>
                            <div id="next"> Next Page</div>
                        </div>`
    
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
                        </div>`
                        
                        movieMainDiv.innerHTML = movieMainDynamic
                        
                    }//end of FOR loop
                    `</div>`//
    
                    //------------Event Listeners on Popular Movies Page
                
                    const previousPage = document.querySelector("#previous");
                    previousPage.addEventListener("click",()=>{
                
                        if(endPointPageTopRated==0 || endPointPageTopRated==1)
                        {
                            endPointPageTopRated=1;
                        }
                        else
                        {
                            endPointPageTopRated--;
                        }
    
                        topRatedMoviesArray=[];
                        comingSoon();
                    });
    
                    const displayCurrentMenuSel =  document.querySelector("#displayCurrentMenuSel")
                    displayCurrentMenuSel.innerHTML = 'Top Rated ';
                                
                    const nextPage = document.querySelector("#next");
                    nextPage.addEventListener("click",()=>{
                        
                        if(endPointPageTopRated>=endPoint.length)
                        {
                            endPointPageTopRated=endPoint.length-1;
                        }
                        else
                        {
                            endPointPageTopRated++;
                        }      
    
                        topRatedMoviesArray=[];
                        comingSoon();
                    
                    });
    
                    const movieMainNowPlaying = document.querySelector("#movieMainNowPlaying") // FIX
                    movieMainNowPlaying.addEventListener("click",(event)=>{
    
                        let elementClicked = event.target   //returns an object
                        let elementParent = elementClicked.parentNode
                
                    
                        if(elementParent.tagName == "DIV" && elementParent.classList == "movieContainer") //  *FIX - more specific
                        {
                            let movieDivSelectedID = elementParent.id;
                            let movieSelectedObject = topRatedMoviesArray[0].results[movieDivSelectedID]
    
                            removeChild(movieMainNowPlaying)
                            movieTrailer(movieSelectedObject, 'topRatedMoviePlayingPage');    
                            topRatedMoviesArray=[] 
                                    
                        } // end of IF
    
                    }); // end of Event Listener movieMainNowPlaying 
    
                    //----------------------------- Menu Event Listener
    
                    const menuWelcomeHomePage =  document.querySelector("#welcome")
                    menuWelcomeHomePage.addEventListener("click", ()=>{
                    
                        welcome()
                    }); 
    
                    const menuNowPlayingHomePage =  document.querySelector("#menuItem1")
                    menuNowPlayingHomePage.addEventListener("click", ()=>{
    
                        endPointPageTopRated=1;
                        nowPlaying()
                    });
    
                    const menuPopularMovies =  document.querySelector("#menuItem2")
                    menuPopularMovies.addEventListener("click", ()=>{
    
                        endPointPageTopRated=1;
                        popularMovies();
                    });
    
                    const menuComingSoonMovies =  document.querySelector("#menuItem3")
                    menuComingSoonMovies.addEventListener("click", ()=>{
    
                        endPointPageTopRated=1;
                        comingSoon();
                    });  
    
                    const menuTopRatedMovies =  document.querySelector("#menuItem4")
                    menuTopRatedMovies.addEventListener("click", ()=>{
    
                        endPointPageTopRated=1;
                        topRated();
                    });
    
    
                    })
    
                .catch((err)=>{
                    console.log(`Error :${err}`)
    
                });
            
            })//
    
            .catch((err)=>{
                console.log(`Error :${err}`)
    
            })
    
        }; // end of topRated ()
    
    // ---------------- MOVIE DETAILS
    
        const movieTrailer = (movieSelectedObject, pageON) =>{
    
            console.log(movieSelectedObject)
            width = 550;
            //let selectedMovieTrailer=""
    
            navBarMenu.innerHTML=`
            <li id="menuItem1">Back</li>
            <li id="welcome">Welcome </li>
            <li id="menuItem2">Now Playing </li>
            <li id="menuItem3">Popular</li>
            <li id="menuItem4">Coming Soon</li>
            <li id="menuItem5">Top Rated</li>`
    
            const movieTrailerEndPoint= `https://api.themoviedb.org/3/movie/${movieSelectedObject.id}/videos?api_key=1b562e1d6f5dd3a38fcbe32f5c01f875&language=en-US `
    
            fetch(movieTrailerEndPoint) 
    
            .then((response) => {
    
                response.json() 
    
                .then((movieTrailer)=>{
    
                    let selectedMovieTrailer= movieTrailer.results[0].key
    
                    movieMainDiv.innerHTML =`
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
    
                    if(pageON == 'nowPlayingPage')
                    {
                        nowPlaying();
                    }
                    else if(pageON == 'popularMoviePage')
                    {
                        popularMovies();
                    }
                    else if(pageON == 'comingSoonrMoviePage')
                    {
                        comingSoon();
                    }
                    else if(pageON == 'topRatedMoviePlayingPage')
                    {
                        topRated();
                    }
                    else if(pageON == 'welcomePage')
                    {
                        welcome();
                    };
    
                });
    
                const menuWelcomeHomePage =  document.querySelector("#welcome")
                menuWelcomeHomePage.addEventListener("click", ()=>{
                    welcome()
                });
    
                const menuNowPlayingHomePage =  document.querySelector("#menuItem2")
                menuNowPlayingHomePage.addEventListener("click", ()=>{
    
                    endPointPage=1;
                    nowPlaying()
                });
    
                const popularMoviesClicked = document.querySelector("#menuItem3");
                popularMoviesClicked.addEventListener("click",()=>{
            
                    endPointPage=1;
                    popularMovies();
                });
    
                const comingSoonClicked = document.querySelector("#menuItem4");
                comingSoonClicked.addEventListener("click",()=>{
    
                    endPointPage=1;
                    comingSoon();
                });
    
                const topRatedClicked = document.querySelector("#menuItem5");
                topRatedClicked.addEventListener("click",()=>{
            
                    endPointPage=1;
                    topRated();
                });
    
                }) // end of then
    
                .catch((err)=>{
                    console.log(`Error :${err}`)
                })
    
            .catch((err)=>{
                console.log(`Error :${err}`)
            })
    
            });
            
        }; //end of movieDetails()
    
        const removeChild = (parentNode) => {
    
            while (parentNode.hasChildNodes()) 
            {  
                parentNode.removeChild(parentNode.firstChild);
    
                //break if parentNode.hasChildNodes== false
            }
        };//end of Remove Child()
    
    // ----------------
    // -------------- 
    
            }; // end of main ()
            main()
        }); // end of DOM Content Loaded
      
    }; // end of app()
    app();
    
    