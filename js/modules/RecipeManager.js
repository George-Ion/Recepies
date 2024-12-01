export class RecipeManager {
    constructor() {
        this.recipes = this.loadRecipes();
    }

    loadRecipes() {
        return JSON.parse(localStorage.getItem('recipes')) || [];
    }

    saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
    }

    addRecipe(recipe) {
        this.recipes.push(recipe);
        this.saveRecipes();
    }

    updateRecipe(index, recipe) {
        this.recipes[index] = recipe;
        this.saveRecipes();
    }

    deleteRecipe(index) {
        this.recipes.splice(index, 1);
        this.saveRecipes();
    }

    getAllRecipes() {
        return this.recipes;
    }

    getRecipeById(id) {
        return this.recipes[id] || null;
    }

    searchRecipes(searchTerm, filterType = 'all') {
        const term = searchTerm.toLowerCase();
        
        return this.recipes.filter(recipe => {
            if (filterType === 'name' || filterType === 'all') {
                if (recipe.name.toLowerCase().includes(term)) return true;
            }
            if (filterType === 'ingredients' || filterType === 'all') {
                if (recipe.ingredients.some(ingredient => 
                    ingredient.toLowerCase().includes(term))) return true;
            }
            if (filterType === 'category' || filterType === 'all') {
                if ((recipe.category || '').toLowerCase().includes(term)) return true;
            }
            return false;
        });
    }
} 