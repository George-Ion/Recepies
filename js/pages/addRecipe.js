import { RecipeManager } from '../modules/RecipeManager.js';
import { IngredientManager } from '../modules/IngredientManager.js';
import { ModalManager } from '../modules/ModalManager.js';
import { RecipeParser } from '../modules/RecipeParser.js';

document.addEventListener('DOMContentLoaded', () => {
    const recipeManager = new RecipeManager();
    const ingredientManager = new IngredientManager();
    const modalManager = new ModalManager('pasteRecipeModal');
    const recipeParser = new RecipeParser();

    // Χειριστής κουμπιού Paste Recipe
    document.getElementById('pasteRecipeBtn').addEventListener('click', () => {
        modalManager.show();
    });

    // Χειριστής κουμπιού κλεισίματος Modal
    document.querySelector('.close').addEventListener('click', () => {
        modalManager.hide();
    });

    // Κλείσιμο modal όταν κάνεις κλικ έξω
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('pasteRecipeModal')) {
            modalManager.hide();
        }
    });

    // Προσθήκη χειριστή κουμπιού συστατικού
    document.getElementById('addIngredientBtn').addEventListener('click', () => {
        ingredientManager.addIngredient();
    });

    // Ανάλυση χειριστή κουμπιού συνταγής
    document.getElementById('parseRecipeBtn').addEventListener('click', () => {
        const pastedText = document.getElementById('pasteRecipe').value;
        const parsedRecipe = recipeParser.parse(pastedText);
        
        document.getElementById('name').value = parsedRecipe.name;
        document.getElementById('instructions').value = parsedRecipe.instructions;
        ingredientManager.setIngredients(parsedRecipe.ingredients);
        
        modalManager.hide();
    });

    // Χειριστής υποβολής φόρμας
    document.getElementById('recipeForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const recipe = {
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            ingredients: ingredientManager.getAllIngredients(),
            instructions: document.getElementById('instructions').value
        };

        if (recipe.ingredients.length === 0) {
            alert('Please add at least one ingredient');
            return;
        }

        recipeManager.addRecipe(recipe);
        window.location.href = 'recipes.html';
    });
}); 