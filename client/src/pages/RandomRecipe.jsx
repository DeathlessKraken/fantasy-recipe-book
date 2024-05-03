import getRandomRecipeId from "../utils/getRandomRecipeId";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RandomRecipe () {
    const navigate = useNavigate();

    const recipeId = getRandomRecipeId();

    useEffect(() => {
        navigate(`/recipe/${recipeId}`);
    });
}