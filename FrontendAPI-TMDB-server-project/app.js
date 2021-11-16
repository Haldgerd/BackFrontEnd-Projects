//IMPORTS
import express from "express";
import path from "path";
//import fetch as it's not defined in node.js environment
import fetch from "node-fetch";
import { LOADIPHLPAPI } from "dns";


//VARIABLES
const PORT = 3000;
const app = express();
const IMAGE = "https://image.tmdb.org/t/p/w500/";
const APIkey = "ad3ffbd0b196e926f7cccabfd2460f2a";
const networkID = "213";
const URL = "https://api.themoviedb.org/3/discover/tv?";


//without path __dirname will not be recongized. Still exploring why this is so. Either connected to node version? Or it produced an error due to smthng else => https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
// const __dirname = path.resolve();

// make static files avaliable. Static files are usualy stored in public dir.
//anwser: https://stackoverflow.com/questions/40728554/resource-blocked-due-to-mime-type-mismatch-x-content-type-options-nosniff
// answer with 10 upvotes did the trick.
// app.use(express.static(`${__dirname}/public/`));



// respond with series data
app.get("/", (req, res) => {
  // sending files
  // res.sendFile(`${__dirname}/index.html`, (err) => {

  //   if (err) {
  //     console.log(`${err.name}: ${err.message}`);
  //     res.end(err.messgage);

  //   }
  //}
  const result = getSeries(URL);

});


//at search address
app.get("/search", (req, res) => {

  res.json("This is a search page.");

});


app.listen(PORT, () => console.log("LISTENING.."));



//FUNCTIONS
  //fetching data and sending it.
const getSeries = async (url) => {
    
  const results = await fetch(url + `sort_by=popularity.desc&network_id=${networkID}&api_key=${APIkey}`);

  const data = await results.json();

  const dataResults = await data.results;

  const keywords = "with_keywords";


  const finalData = getTitleRatingDescription(dataResults);

  return finalData;

}


// retrieve selected data from series objects.
const getTitleRatingDescription = (data) => {
  const series = [];
  
  data.map((serie) => {

    const title = serie.name;

    const rating = serie.vote_average;

    const description = serie.overview;

    const poster = serie.poster_path;

    series.push({
      title,
      rating,
      description,
      poster
    });

  });

  return series;

}


// const result = getSeries(URL);

// result.then(() => console.log(result)).catch((error) => console.log(error.name, error,message));

