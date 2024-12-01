import { RecipeManager } from '../modules/RecipeManager.js';

const recipeManager = new RecipeManager();
const recipes = recipeManager.getAllRecipes();
const recipeList = document.getElementById('recipe-list');
const searchInput = document.getElementById('searchInput');
const searchType = document.getElementById('searchType');

function displayRecipes(recipesToDisplay) {
    recipeList.innerHTML = '';
    recipesToDisplay.forEach((recipe, index) => {
        let listItem = document.createElement('li');
        listItem.classList.add('recipe-item');

        const firstThreeIngredients = recipe.ingredients.slice(0, 3);
        const ingredientsDisplay = firstThreeIngredients.join(', ');
        const moreIngredientsIndicator = recipe.ingredients.length > 3 ? '...' : '';

        listItem.innerHTML = `
            <div class="recipe-content">
                <h2>${recipe.name}</h2>
                <p><strong>Category:</strong> ${recipe.category || '-'}</p>
                <p><strong>Ingredients:</strong> ${ingredientsDisplay}${moreIngredientsIndicator}</p>
            </div>
            <div class="button-container">
                <a href="viewRecipe.html?id=${index}" class="btn">View Recipe</a>
            </div>
        `;

        recipeList.appendChild(listItem);
    });
}

function filterRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterType = searchType.value;
    const filteredRecipes = recipeManager.searchRecipes(searchTerm, filterType);
    displayRecipes(filteredRecipes);
}

searchInput.addEventListener('input', filterRecipes);
searchType.addEventListener('change', filterRecipes);

displayRecipes(recipes);