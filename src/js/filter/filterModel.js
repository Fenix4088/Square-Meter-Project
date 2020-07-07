export default class Filter {
    constructor() {}
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
}
