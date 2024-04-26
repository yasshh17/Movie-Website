const searchInput = document.getElementById("movie-search");
const searchButton = document.getElementById("search-btn");
const movieDisplay = document.getElementById("movie-display");

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle,.search-container,#movie-display,body,footer"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

async function displayMovieDetails(data) {
  movieDisplay.innerHTML = '';
  var movieTitle;
  var posterPath;
  var movieOverview;
  if (data) {
    // console.log(data.titleResults.results.length);
    for (let i = 0; i < 10; i++) {
      if (data?.titleResults?.results?.[i]?.titleNameText ) {
        if (data.titleResults.results[i]?.titlePosterImageModel?.url){
          movieTitle = data.titleResults.results[i].titleNameText;
          posterPath = data.titleResults.results[i].titlePosterImageModel.url;
          
          movieDisplay.innerHTML +=`<h2>${movieTitle}</h2>  `;
          movieDisplay.innerHTML +=`<img class="movie-poster" src="${posterPath}" alt="${movieTitle} ">`;
        }else{
          continue;
        }
        
      } else {
        console.log('break at ',i);
        if(i==0){
          movieDisplay.innerHTML +=`<p> Movie not found </p>`;
        }
        break; 
      }
      // if (data.titleResults.results[i]?.titlePosterImageModel?.url){
      //   posterPath = data.titleResults.results[i].titlePosterImageModel.url;
      //   movieDisplay.innerHTML +=`<img class="movie-poster" src="${posterPath}" alt="${movieTitle} ">
      //   `;
      //   console.log(data.titleResults.results[i])
      // }else{
      //   console.log(data.titleResults.results[i])
      //   movieDisplay.innerHTML +=`<p> No picture found </p>`;
      // }
      if (data.titleResults.results[i]?.titlePosterImageModel?.caption){
        movieOverview = data.titleResults.results[i].titlePosterImageModel.caption;
        movieDisplay.innerHTML +=`<p>${movieOverview}</p> `;
      }else{
        movieDisplay.innerHTML +=`<p>No overview found</p> `;
      }
    }
    // console.log(data.titleResults.results[0]);
    // console.log(data.titleResults.results[1].titleNameText);
    // const movieTitle = data.titleResults.results[0].titleNameText;
    // console.log(data.titleResults.results[0].titleNameText);
    // const posterPath = data.titleResults.results[0].titlePosterImageModel.url;
    // const movieOverview = data.titleResults.results[0].titlePosterImageModel.caption;
    // // const id = data.titleResults.results[0].id;





    // movieDisplay.innerHTML = `
    //   <h2>${movieTitle}</h2>
    //   <img class="movie-poster" src="${posterPath}" alt="${movieTitle} ">
    //   <p>${movieOverview}</p>  
    // `;
  } else {
    movieDisplay.innerHTML +=`<p> Movie not found </p>`;
  }
}

searchInput.addEventListener("keydown", function(event) {

  if (event.keyCode === 13) {
    event.preventDefault(); 
    refresh();
  }
});

async function refresh(){
    const searchTerm = searchInput.value;
    console.log("searchTerm",searchTerm);
    console.log("search movie", searchTerm);
    const url = `https://imdb146.p.rapidapi.com/v1/find/?query="${searchTerm}"`;
  
  
  console.log(url);
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '6ba8499abbmsh7e0267a614754cbp11ba22jsnc900966289a1',
      'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
    }
  
  };

  if (searchTerm) {
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
        displayMovieDetails(result);
        // console.log(id);
      
    } catch (error) {
      console.log("error");
      console.error(error);
    }
};
}

async function searchMovie() {
  
  var currentUrl = window.location.search;
  console.log(currentUrl);
  var urlParams = new URLSearchParams(currentUrl);
  console.log(urlParams);
  var searchTerm = urlParams.get("searchTerm");
  console.log("searchTerm",searchTerm);
  console.log("search movie", searchTerm);
  const url = `https://imdb146.p.rapidapi.com/v1/find/?query="${searchTerm}"`;


console.log(url);
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6ba8499abbmsh7e0267a614754cbp11ba22jsnc900966289a1',
		'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
	}

};

if (searchTerm) {

  try {
    const response = await fetch(url, options);
    const result = await response.json();
      displayMovieDetails(result);
      console.log(id);
    
  } catch (error) {
    console.log("error");
    console.error(error);
  }
}

//   if (searchTerm) {
//     movieDisplay.innerHTML = "<p>Loading...</p>"; 

//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

//     fetch(url)
//       .then(response => response.json())
//       .then(data => displayMovieDetails(data))
//       .catch(error => displayError(error));
//   } else {
//     movieDisplay.innerHTML = "<p>Please enter a search term</p>";
//   }
}

// window.onload = function() {
//   console.log("1111111");
//   searchMovie();
// };

searchButton.addEventListener("click", refresh);


// function displayError(message) {
//   movieDisplay.innerHTML = `<p>Error: ${message}</p>`;
// }
