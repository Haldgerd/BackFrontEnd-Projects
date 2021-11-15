import express from "express";
import path from "path";

const PORT = 3000;
const app = express();
const __dirname = path.resolve();


// make static files avaliable. Static files are usualy stored in public dir.
app.use()

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