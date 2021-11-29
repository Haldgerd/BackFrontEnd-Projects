//IMPORTS
import express from "express";
import path from "path";
//import fetch as it's not defined in node.js environment
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser";  // seems to be deprecated? LOOK for alternative solution.
//FOUND! https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json/47232318

import "dotenv/config.js"

//VARIABLES
const PORT = 3000;

const app = express();

const networkID = 213;

const API_key = process.env.API_key;

console.log(API_key);

const URL = "https://api.themoviedb.org/3/";

const APIQuery = `discover/tv?sort_by=vote_average.desc&vote_count.gte=50&with_networks=${networkID}&api_key=${API_key}`;



//without path __dirname will not be recongized. Still exploring why this is so. Either connected to node version? Or it produced an error due to smthng else => https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
// const __dirname = path.resolve();

// make static files avaliable. Static files are usualy stored in public dir.
//anwser: https://stackoverflow.com/questions/40728554/resource-blocked-due-to-mime-type-mismatch-x-content-type-options-nosniff
// answer with 10 upvotes did the trick.
// app.use(express.static(`${__dirname}/public/`));


//fixes problem with cors: Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:3000/. (Reason: CORS request did not succeed).
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5500",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
)


// respond with series data
app.get("/", (req, res) => {
  // sending files
  // res.sendFile(`${__dirname}/index.html`, (err) => {

  //   if (err) {
  //     console.log(`${err.name}: ${err.message}`);
  //     res.end(err.messgage);

  //   
  //}

  //resolving a promise, gathering json data from API
  
  getSeries(URL, APIQuery)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error.name, error.message);
    });

});


//https://dev.to/gbudjeakp/how-to-connect-your-client-side-to-your-server-side-using-node-and-express-2i71
//https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json/47232318
app.use(express.json()); //middle-wear to allow access to DOM elements
app.use(express.urlencoded({
    extended: true}));

//at search address console lof user form input. Gathering form data in backend.
app.post("/", (req, res) => {

  //we need to use .body to be able to parse through html
  const userQuery = req.body.query;
  
  const APISearchQuery = `search/tv?api_key=${API_key}&with_networks=${networkID}&query=${userQuery}`;

  console.log(userQuery);


  //works! displays data in json browser but on localhost:3000 ???
  getSeries(URL, APISearchQuery) 
    .then((data) => {
      res.redirect(JSON.parse(data));
     
    })
    .catch((error) => {
      console.log(error.name, error.message);
    });


});


// app.get("/search", (req, res) => {
//   res.json("Hello.")  //this works in browser

// });


app.listen(PORT, () => console.log("LISTENING.."));



//FUNCTIONS
  //fetching data and sending it.
const getSeries = async (url, query) => {
    
  const response = await fetch(`${url}${query}`);

  if (response.status !== 200) {
    console.log(response.status);
    throw new Error("Cannot fetch requested data!");
  } 

  const data = await response.json();

  const dataResults = await data.results;

  const finalData = getTitleRatingDescription(dataResults);

  return finalData; //returns a promise that needs to be resolved in .then handler.

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
