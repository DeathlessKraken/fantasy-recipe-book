document.getElementById('addIngredient').addEventListener("click", addIngredient())
document.getElementById('subtractIngredient').addEventListener("click", subtractIngredient())

const newIngredient = "<div class='ingredientContainer'><input type='text' name='recipeIngredient' placeholder='Ingredient' autocomplete='off'><input type='button' value='+' id='addIngredient'><input type='button' value='-' id='subtractIngredient'></div>"
const buttons = "<div id='ingredientButtons'><input type='button' value='+' id='addIngredient'><input type='button' value='-' id='subtractIngredient'></div>"
const ingredientList = document.getElementById("recipeIngredientsContainer")

function addIngredient() {
    /* Duplicate ingredient container and shift add/subtract button down */
    
    ingredientList.lastChild.lastChild.remove()
    ingredientList.innerHTML += newIngredient
    ingredientList.lastChild.innerHTML += buttons
}

function subtractIngredient() {
    /* Remove last ingredient container and shift add/subtract button up */
    if(ingredientList.lastChild === document.getElementById("firstIngredient")) { return }
    else {
        ingredientList.lastChild.remove()
        ingredientList.lastChild.innerHTML += buttons
    }
}