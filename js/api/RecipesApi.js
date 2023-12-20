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
            console.error('An error occurred while fetching recipes:', error);
            throw error;
        }
        
    }    
}

