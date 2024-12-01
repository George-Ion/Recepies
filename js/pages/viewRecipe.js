import { RecipeManager } from '../modules/RecipeManager.js';

const urlParams = new URLSearchParams(window.location.search);
const recipeId = parseInt(urlParams.get('id'));
const recipeManager = new RecipeManager();
const recipe = recipeManager.getRecipeById(recipeId);

function displayRecipe() {
    if (!recipe) {
        document.getElementById('recipe-details').innerHTML = '<p>Recipe not found.</p>';
        return;
    }

    // Διαχωρίστε τις οδηγίες με νέα γραμμή και καθαρίστε τυχόν κενές γραμμές
    const instructionsList = recipe.instructions
        .split('\n')
        .filter(line => line.trim() !== '');
    
    const recipeHTML = `
        <h2 class="recipe-title">${recipe.name}</h2>
        <div class="recipe-content">
            <p><strong>Category:</strong> ${recipe.category || '-'}</p>
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3>Instructions:</h3>
            <ol class="instructions-list">
                ${instructionsList.map(instruction => `<li>${instruction.replace(/^\d+\.\s*/, '')}</li>`).join('')}
            </ol>
        </div>
        <div class="button-container">
            <a href="recipes.html" class="btn">Back to Recipes</a>
            <button id="edit-button" class="btn">Edit Recipe</button>
            <button id="delete-button" class="btn">Delete Recipe</button>
        </div>
    `;

    document.getElementById('recipe-details').innerHTML = recipeHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    displayRecipe();

    document.getElementById('edit-button')?.addEventListener('click', () => {
        window.location.href = `editRecipe.html?id=${recipeId}`;
    });

    document.getElementById('delete-button')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this recipe?')) {
            recipeManager.deleteRecipe(recipeId);
            window.location.href = 'recipes.html';
        }
    });
}); 