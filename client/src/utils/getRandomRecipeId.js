import data from "../data";

export default function getRandomRecipeId () {
    return Math.floor(Math.random() * data.length);
}