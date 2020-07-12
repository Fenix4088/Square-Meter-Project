export default class Filter {
    constructor() {
        this.query = '';
    }
    // Метод который отправляет запрос на сервер и получат от него значения
    async getParams() {
        try {
            const queryString = "http://jsproject.webcademy.ru/itemsinfo";
            const response = await fetch(queryString);
            const data = await response.json();
            this.params = await data;
        } catch (err) {
            alert(err);
        }
    }

    async getResults() {
        try {
            const queryString = `http://jsproject.webcademy.ru/items${this.query}`;
            const response = await fetch(queryString);
            const data = await response.json();
            this.result = await data;
        } catch (err) {
            alert(err);
        }
    }
}
