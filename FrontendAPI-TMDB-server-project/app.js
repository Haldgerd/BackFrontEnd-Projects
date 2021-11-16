import express from "express";
import path from "path";

//import fetch as it's not defined in node.js environment
import fetch from "node-fetch";


//VARIABLES
const PORT = 3000;

const app = express();

const IMAGE = "https://image.tmdb.org/t/p/w500/";

const APIkey = "ad3ffbd0b196e926f7cccabfd2460f2a";

const networkID = "213";

const URL = "https://api.themoviedb.org/3/discover/tv?";

//without path __dirname will not be recongized. Still exploring why this is so. Either connected to node version? Or it produced an error due to smthng else => https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
const __dirname = path.resolve();



// make static files avaliable. Static files are usualy stored in public dir.
//anwser: https://stackoverflow.com/questions/40728554/resource-blocked-due-to-mime-type-mismatch-x-content-type-options-nosniff
// answer with 10 upvotes did the trick.
app.use(express.static(`${__dirname}/public/`));



// make a request to server, which will in turn respond
app.get("/", (req, res) => {

  res.sendFile(`${__dirname}/index.html`, (err) => {

    if (err) {
      console.log(`${err.name}: ${err.message}`);
      res.end(err.messgage);

    }

  });
  
  getSeries(URL)
    .then(() => console.log("All OK"))
    .catch((error) => console.log(error.message));

});

//at search
app.get("/search", (req, res) => {

  res.send("This is a search page.");

});


app.listen(PORT, () => console.log("LISTENING.."));


//FUNCTIONS
const getSeries = async (url) => {
  
  const results = await fetch(url + `sort_by=popularity.desc&network_id=${networkID}&api_key=${APIkey}`);

  const data = await results.json();

  const dataResults = await data.results;

  getTitleRatingDescription(dataResults);

}


const getTitleRatingDescription = (data) => {
  const series = [];
  
  data.map((serie) => {

    const title = serie.name;

    const rating = serie.vote_average;

    const description = serie.overview;

    series.push({
      title,
      rating,
      description
    });

  });

  console.log(series);

}
