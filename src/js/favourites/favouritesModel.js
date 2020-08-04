export default class Favourites {
    constructor() {
        this.favs = [];
        // работа с LS
        this.readStorage();
    }
    // Method for adding the id of the current element to the state array
    addFav(id) {
        this.favs.push(id);
        this.saveData();
    }
    // Method for removing from favorites
    removeFav(id) {
        const index = this.favs.indexOf(id);
        this.favs.splice(index, 1);
        this.saveData();
    }

    // Method for checking if an element is in an array with favorites
    isFav(id) {
        return this.favs.indexOf(id) !== -1 ? true : false;
    }
    // A method that involves either adding or removing
    toggleFav(id) {
        this.isFav(id) ? this.removeFav(id) : this.addFav(id);
    }

    // Method for working with LS
    saveData() {
        localStorage.setItem("favs", JSON.stringify(this.favs));
    }

    // Method to initialize LS on first boot
    readStorage() {
        const storage = JSON.parse(localStorage.getItem("favs"));
        if (storage) this.favs = storage;
    }
}
