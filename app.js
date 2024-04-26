const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("movie-search");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle,footer"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

searchInput.addEventListener("keydown", function(event) {

  if (event.keyCode === 13 && searchInput.value) {
    event.preventDefault(); 
    searchMovie();
  }
});

async function searchMovie() {
  const searchTerm = searchInput.value;
  if (searchTerm) {
  searchUrl = "MF.html?searchTerm=" + encodeURIComponent(searchTerm);
  window.location.href = searchUrl;
}
}
searchButton.addEventListener("click", searchMovie);