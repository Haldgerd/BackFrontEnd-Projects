
//VARIABLES
const serverURL = "http://localhost:3000";


const IMAGE = "https://image.tmdb.org/t/p/w200";

const mainContainer = document.querySelector("main");

const search = document.querySelector("input[type=text]");



//on reload page clear the value set in input field.
search.value = "";

//FUNCTIONS
// display returned series data
const displaySeries = (data) => {

  data.forEach(element => {
    
    let container = document.createElement("div");

    container.className = "series__container";

    container.innerHTML = ` 
      <img src="${IMAGE}${element.poster}" alt="Series official poster" class="series__img" />
      <div class="series__information">
        <h3 class="series__title">${element.title}</h3>
        <span class="rating">${element.rating * 10}%</span>
      </div>
      <div class="series__overview">OVERVIEW:<br><br>${element.description}</div> `;

    mainContainer.appendChild(container);
    
  });
}


// async function to call backend data retrieval
const getData = async (url) => {

  const response = await fetch(url);

  const data = await response.json();

  return data;

}
//END OF FUNCTIONS


// listening for sumbit => asking for data from backend using search Value as query string.
window.addEventListener("submit", () => {
  
  getData(serverURL)
    .then((data) => {
      console.log(data);
    })
    .then(() => console.log("I'm still here"))
    .catch((error) => {
      console.log(`There was an error ${error.message}!`);
    });

});



// display fetched data in browser.
getData(serverURL)
  .then((data) => displaySeries(data))

  .catch((error) => console.log(error.name, error.message));



//a xmlhttp request example.
  // let request = new XMLHttpRequest();

  // request.open("GET", "https://jsonplaceholder.typicode.com/todos/");
  // request.send();
  // console.log(request);