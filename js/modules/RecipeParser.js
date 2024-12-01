export class RecipeParser {
    constructor() {
        this.ingredientsKeywords = ['ingredients', 'υλικά', 'συστατικά', 'ΥΛΙΚΑ', 'ΣΥΣΤΑΤΙΚΑ'];
        this.instructionsKeywords = ['instructions', 'directions', 'οδηγίες', 'εκτέλεση', 'παρασκευή', 'ΟΔΗΓΙΕΣ', 'ΕΚΤΕΛΕΣΗ', 'ΠΑΡΑΣΚΕΥΗ'];
    }

    parse(text) {
        const lines = text.split('\n');
        let name = '';
        let ingredients = [];
        let instructions = [];
        let currentSection = '';

        for (let line of lines) {
            line = line.trim();
            if (line === '') continue;

            const lowerLine = line.toLowerCase();

            if (this.ingredientsKeywords.some(keyword => lowerLine.includes(keyword))) {
                currentSection = 'ingredients';
                continue;
            } else if (this.instructionsKeywords.some(keyword => lowerLine.includes(keyword))) {
                currentSection = 'instructions';
                continue;
            }

            if (!name) {
                name = line;
            } else if (currentSection === 'ingredients') {
                ingredients.push(this.parseIngredient(line));
            } else if (currentSection === 'instructions') {
                const cleanInstruction = line.replace(/^\d+[\.\)-]\s*/, '').trim();
                if (cleanInstruction) {
                    instructions.push(cleanInstruction);
                }
            }
        }

        const numberedInstructions = instructions
            .map((instruction, index) => `${index + 1}. ${instruction}`)
            .join('\n');

        return {
            name,
            ingredients,
            instructions: numberedInstructions
        };
    }

    parseIngredient(ingredient) {
        const greekMeasurements = ['γραμμάρια', 'κιλά', 'κουταλιές', 'κουταλιά', 'φλιτζάνια', 'φλιτζάνι', 'κούπες', 'κούπα', 'τεμάχια', 'τεμάχιο'];
        let cleanedIngredient = ingredient;
        
        greekMeasurements.forEach(measure => {
            cleanedIngredient = cleanedIngredient.replace(new RegExp(measure, 'gi'), '');
        });

        return cleanedIngredient.trim();
    }
} 