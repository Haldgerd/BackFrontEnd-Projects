import express from "express";
// add "type": "module", in your npm init json file - usualy located in package.json file along with dependencies.

const PORT = 5001;

const app = express();

//use static files, css images etc.
app.use(express.static(`/home/laura/Javascript-projects/BackFrontEnd-Projects/FrontBackEnd-API-project/FRONTEND/assets/`));


// "/" stands for localhost:5001
app.get("/", (req, res) => {
  res.sendFile(`/home/laura/Javascript-projects/BackFrontEnd-Projects/FrontBackEnd-API-project/index.html`, (err) => {
    if (err) {
      console.log(err.name, err.message);
    }
  });
});


app.listen(PORT, () => console.log(`We're here at port ${PORT}.`));