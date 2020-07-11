import SingleItem from "./singleItemModel.js";

export default function (state) {
    console.log("Single Item Controller Started!!!!!");

    // Создаем и записываем класс SingleItem в state приложения
    state.singleItem = new SingleItem(state.routeParams);
    state.singleItem.getItem();
}
