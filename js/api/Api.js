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
            return datas;
        } catch (error) {
            console.log('An error occurred:', error);
            throw error;
        }
    }
}



