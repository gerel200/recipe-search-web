import axios from 'axios';  
//tuhain joriig id gar n internetees tataj awchraad uzuulne


export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        const result = await axios('https://forkify-api.herokuapp.com/api/v2/recipes/'+this.id);

        this.publisher = result.data.data.recipe.publisher;
        this.ingredients = result.data.data.recipe.ingredients;
        this.source_url = result.data.data.recipe.source_url;
        this.image_url = result.data.data.recipe.image_url;
        this.cooking_time = result.data.data.recipe.cooking_time;
        this.servings = result.data.data.recipe.servings;
        this.title = result.data.data.recipe.title;
        }

        calcTime(){
            this.time = this.ingredients.length * 5;
        }

        calcHuniiToo(){
            this.huniiToo = 4;
        }
}
