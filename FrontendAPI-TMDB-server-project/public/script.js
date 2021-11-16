
//VARIABLES
const serverURL = "http://localhost:3000/";
const searchData = "";
const IMAGE = "https://image.tmdb.org/t/p/w500";
const mainContainer = document.querySelector("main");
const search = document.querySelector("input[type=text]");


//on reload page clear the value set in input field.
search.value = "";


// listening for sumbit => asking for data from backend using search Value as query string.
window.addEventListener("submit", (e) => {
  
  e.preventDefault();

  const searchValue = search.value; 

  console.log(searchValue);
  
  // setTimeout(() => {
  //   search.value = "";
  // }, 2000)

  //get data from other side. :) backend I mean.

});


// async function to call backend data retrieval
const getData = async (url) => {

  const response = await fetch(url);

  const data = await response.json();

  console.log(data);

}


getData(serverURL)

  .then(() => console.log("Hello"))

  .catch((error) => console.log(error.name, error.message));

console.log("I'm really here!");



//FUNCTIONS
// display returned series data
const displaySeries = (data) => {

  data.forEach(element => {
    
    let container = document.createElement("div");

    container.className = "series__container";

    container.innerHTML = ` 
      <img src="${IMAGE} + ${element.poster} alt="Series official poster" class="series__img" />
      <div class="series__information">
        <h3 class="series__title">${element.title}</h3>
        <span class="rating">${element.rating}</span>
      </div>
      <div class="series__overview">${element.description}</div> `;

    mainContainer.appendChild(container);
    
  });
}
