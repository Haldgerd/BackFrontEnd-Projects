import express from "express";
import path from "path";


const PORT = 3000;
const app = express();


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
});


app.listen(PORT, () => console.log("LISTENING.."));