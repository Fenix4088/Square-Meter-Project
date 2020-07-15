export default class SingleItem {
    constructor(id) {
        this.id = id;
    }

    async getItem() {
        try {
            const queryString = `http://jsproject.webcademy.ru/items/${this.id}`;
            const response = await fetch(queryString);
            const data = await response.json();
            this.result = data;
        } catch (error) {
            alert(error);
        }

    }

    async sendData(formData) {
        const queryString = `http://jsproject.webcademy.ru/bidnew`;
        // Запрос для отправки информации о заявки на сервер
        const response = await fetch(queryString, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        this.response = data;
        return data;
    }
}
