export class IngredientManager {
    constructor() {
        this.ingredientsList = document.getElementById('ingredientsList');
        this.amountInput = document.getElementById('ingredientAmount');
        this.unitInput = document.getElementById('ingredientUnit');
        this.ingredientInput = document.getElementById('ingredientInput');
    }

    addIngredient() {
        const amount = this.amountInput.value.trim();
        const unit = this.unitInput.value.trim();
        const ingredient = this.ingredientInput.value.trim();

        if (ingredient === '') return;

        const fullIngredient = `${amount}${unit ? ' ' + unit : ''} ${ingredient}`.trim();
        
        const listItem = document.createElement('li');
        listItem.className = 'ingredient-item';
        listItem.innerHTML = `
            <span>${fullIngredient}</span>
            <button type="button" class="remove-ingredient-btn">-</button>
        `;

        listItem.querySelector('.remove-ingredient-btn').addEventListener('click', 
            () => listItem.remove()
        );

        this.ingredientsList.appendChild(listItem);
        this.clearInputs();
    }

    clearInputs() {
        this.amountInput.value = '';
        this.unitInput.value = '';
        this.ingredientInput.value = '';
        this.amountInput.focus();
    }

    getAllIngredients() {
        return Array.from(this.ingredientsList.getElementsByTagName('li'))
            .map(li => li.getElementsByTagName('span')[0].textContent);
    }

    setIngredients(ingredients) {
        this.ingredientsList.innerHTML = '';
        ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.className = 'ingredient-item';
            listItem.innerHTML = `
                <span>${ingredient}</span>
                <button type="button" class="remove-ingredient-btn">-</button>
            `;
            
            listItem.querySelector('.remove-ingredient-btn').addEventListener('click', 
                () => listItem.remove()
            );
            
            this.ingredientsList.appendChild(listItem);
        });
    }
} 