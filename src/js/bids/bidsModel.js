export default class Bids {
    constructor() {}

    // Метод для запроса заявок и созранения их в обьект данного компонента
    async getBids() {
        try {
            const queryString = `http://jsproject.webcademy.ru/bids`;
            const result = await fetch(queryString);
            const data = await result.json();
            this.bids = data;
        } catch (error) {
            alert("Error with geting bids");
            console.log(error);
        }
    }
}
