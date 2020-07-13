export default class Favourites {
    constructor() {
        this.favs = [];
        // TODO: работа с LS
    }

    addFav(id) {
        this.favs.push(id);
    }
}
