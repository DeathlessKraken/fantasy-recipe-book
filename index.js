import express from "express"
import bodyParser from "body-parser"
import pg from "pg"

//id, type [breakfast, 2nd breakfast, lunch, dinner], name, description, instructions, ingredients

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: ""
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {recipes: recipes});
});

app.get("/recipe", (req, res) => {
    const recipeId = req.query.id;
    if(!recipeId) {
        res.render("browse.ejs")
    } 
    else {
        /* Render a webpage with a specific json recipe in detail */
        for(let recipe of recipeFile) {
            if(recipeId == recipe.id)
            {
                res.render("detailRecipe.ejs", { recipeData : recipe})
                break;
            }
        }       
    }

})

app.post("/search", (req, res) => {
    const input = req.body["siteSearch"]
    res.render("search.ejs", { searchTerm : input})
})

app.get("/create", (req, res) => {
    res.render("create.ejs")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});