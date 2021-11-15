// NOTE TO SELF: Working with API's see if there's an option to search through database using API search query.
// In my option this solution is better in compare to one I implemented where I search only through aquired series, but not all series.


//variables
const form = document.querySelector(".search__form");

const main = document.querySelector("main");

const searchInput = document.querySelector(".search__input");

const logo = document.querySelector(".logo");

// netflix series by popularity
const APIurl = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&with_networks=213&api_key=${apiKey}`;

// https://api.themoviedb.org/3/network/213?api_key="" for netflix company information

//netflix series by popularity - not netflix but all series by popularity.
// https://api.themoviedb.org/3/discover/tv?sort_by=popularity&with_network=213&api_key=""


// call async function
getNetflixSeries(APIurl);


window.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent from submitting to page
    // console.log(e.currentTarget);

    // main.innerHTML = "";

    const searchValue = searchInput.value.toLowerCase();
    console.log(searchValue);

    if (searchValue) {

        // NOTE: could look by API search query, adding only input value as query value.
        // create search_API and then add query.
        const seriesNames = document.querySelectorAll(".movie__title");
    
        seriesNames.forEach(name => {
        
            const originalTitle = name.innerHTML.toLowerCase();

            //hide all series except those whose title inludes input string.
            name.parentElement.parentElement.style.display = "none";

            if (originalTitle.includes(searchValue)){
                console.log("i'm here.");
                name.parentElement.parentElement.style.display = "block";
            } // ERROR doubling of search items: FIXED.

        });

    } else {
        // reload page
        window.location.reload();
    }
    
});


//functions
/**
 * Returns a promise. Fetches data from selected URL address.
 *
 * @param {string} url URL address 
 */
async function getNetflixSeries(url) {
    // returns a promise!

    const response = await fetch(url);
    const data = await response.json();

    const series = data.results;

     // function that takes in data and displays it.
    displayFullData(series);
     
}



/**
 * Displays TV series cards with additional information.
 *
 * @param {Array} data Array of series.
 */
const displayFullData = (data, input) => {
    data.forEach(series => {

        const title = series.name;
        const overview = series.overview;
        const score = series.vote_average;
        

        const container = document.createElement("div");
        container.className = "movie__card";

        container.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${series.poster_path}" alt="image" srcset="" class="movie__image"/>
        <div class="movie__container">
            <h2 class="movie__title">${title}</h2>
            <span class="movie__score">${score}</span>
        </div>
        <div class="movie__info">${overview}</div>`
            
        main.append(container);
        
    });

    displayScoreColor();
}


// // check for score and change it's color depending on it.
// const displayScore = (score) => {
/**
 * Changes score color depending on score.
 
 */
const displayScoreColor = () => {

    const scores = document.querySelectorAll(".movie__score");

    scores.forEach(score => {
        const avgScore = score.innerHTML;
    
        if (avgScore >= 8) {
            score.style.color = "hsl(355, 90%, 61%)";
        } else if (avgScore >= 7) {
            score.style.color = "hsl(0, 0%, 85%);";
        } else {
            score.style.color = "hsl(22, 97%, 66%)";
        }      
    });
}