export default class Bids {
    constructor() {}

    // Method for requesting applications and saving them into the object of this component
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
