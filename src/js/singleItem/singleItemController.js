import SingleItem from "./singleItemModel.js";
import * as view from "./singleItemView.js";

export default async function (state) {
    // Создаем и записываем класс SingleItem в state приложения
    state.singleItem = new SingleItem(state.routeParams);
    await state.singleItem.getItem();
    // Рендерим разметку для отдельного обьекта
    view.render(state.singleItem.result);
}
