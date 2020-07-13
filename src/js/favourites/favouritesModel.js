export default class Favourites {
    constructor() {
        this.favs = [];
        // TODO: работа с LS
    }
    // Метод для добавления id текущего элемента в массив state
    addFav(id) {
        this.favs.push(id);
    }
    // Метод для удаления из избранного
    removeFav(id) {
        const index = this.favs.indexOf(id);
        this.favs.splice(index, 1);
    }

    // Ф-я для проверки наличия элемента в массиве с избранным
    isFav(id) {
        return this.favs.indexOf(id) !== -1 ? true : false;
    }
    // Метод который включает либо добавление либо удаление
    toggleFav(id) {
        this.isFav(id) ? this.removeFav(id) : this.addFav(id);
    }
}
