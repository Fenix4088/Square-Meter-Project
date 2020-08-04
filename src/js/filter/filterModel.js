export default class Filter {
    constructor() {
        this.query = "";
    }
    // A method that sends a request to the server and receives values ​​from it
    async getParams() {
        try {
            const queryString = "http://jsproject.webcademy.ru/itemsinfo";
            const response = await fetch(queryString);
            const data = await response.json();
            this.params = data;
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

export function saveValues(name, value) {
    name = value;
}

