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






