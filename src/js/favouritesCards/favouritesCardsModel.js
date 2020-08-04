export default class FavouritesCards {
    constructor(favsList) {
        this.favsList = favsList;
    }

    // Method for creating query string for favorites
    async getFavs() {
        const ids = this.favsList.toString();
        if (ids !== '') {
            const queryString = `http://jsproject.webcademy.ru/items?ids=${ids}`;
            const result = await fetch(queryString);
            const data = await result.json();
            this.cards = data;
        }
    }
}
