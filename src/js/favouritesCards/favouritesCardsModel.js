export default class FavouritesCards {
    constructor(favsList) {
        this.favsList = favsList;
    }

    // Метод по созданию строки запроса для избранного
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
