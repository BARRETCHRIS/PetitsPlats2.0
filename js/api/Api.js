// export default 
class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url; 
        
    }

    async get() {
        try {
            const response = await fetch(this._url);
            const datas = await response.json();
            return datas; //Elle retourne les données JSON obtenues.
        } catch (error) {
            console.log('An error occurred:', error);
            throw error;
        }
    }
}

class RecipesApi extends Api {
    /**
     * 
     * @param {string} url 
     */

    constructor(url) {
        super(url); 
    }

    async getRecipes() { 
        try {
            const datas = await this.get();
            return datas.recipes || [];
        } catch (error) {
            console.error('An error occurred while fetching photographers:', error);
            throw error;
        }
    }    
}

class App {
    constructor() {
        this.RecipesApi = new RecipesApi('datas/recipes.json')
        
    }

    async main() {
        const recipes = await this.RecipesApi.getRecipes()
        console.log(recipes)   
    }
}

const app = new App()
app.main()

