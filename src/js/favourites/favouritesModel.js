export default class Favourites {
    constructor() {
        this.favs = [];
        // работа с LS
        this.readStorage();
    }
    // Метод для добавления id текущего элемента в массив state
    addFav(id) {
        this.favs.push(id);
        this.saveData();
    }
    // Метод для удаления из избранного
    removeFav(id) {
        const index = this.favs.indexOf(id);
        this.favs.splice(index, 1);
        this.saveData();
    }

    // Ф-я для проверки наличия элемента в массиве с избранным
    isFav(id) {
        return this.favs.indexOf(id) !== -1 ? true : false;
    }
    // Метод который включает либо добавление либо удаление
    toggleFav(id) {
        this.isFav(id) ? this.removeFav(id) : this.addFav(id);
    }

    // Метод для работы с LS
    saveData() {
        localStorage.setItem("favs", JSON.stringify(this.favs));
    }

    // Метод для инициализации LS при первой загрузке
    readStorage() {
        const storage = JSON.parse(localStorage.getItem("favs"));
        if (storage) this.favs = storage;
    }
}
