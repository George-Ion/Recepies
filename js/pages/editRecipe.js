import { RecipeManager } from '../modules/RecipeManager.js';
import { IngredientManager } from '../modules/IngredientManager.js';

const urlParams = new URLSearchParams(window.location.search);
const recipeId = parseInt(urlParams.get('id'));
const recipeManager = new RecipeManager();
const ingredientManager = new IngredientManager();

const currentRecipe = recipeManager.getRecipeById(recipeId);
if (!currentRecipe) {
    window.location.href = 'recipes.html';
}

// Συμπλήρωση φόρμας
document.getElementById('name').value = currentRecipe.name;
document.getElementById('category').value = currentRecipe.category;
document.getElementById('instructions').value = currentRecipe.instructions;
ingredientManager.setIngredients(currentRecipe.ingredients);

// Υποβολή φόρμας
document.getElementById('recipeForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedRecipe = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        ingredients: ingredientManager.getAllIngredients(),
        instructions: document.getElementById('instructions').value
    };

    recipeManager.updateRecipe(recipeId, updatedRecipe);
    window.location.href = 'recipes.html';
}); 