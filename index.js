import express from "express"
import bodyParser from "body-parser"

import recipeFile from "./public/recipes.json" assert {type:'json'}

import { dirname } from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index.ejs", {recipes: recipeFile})
})

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

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});