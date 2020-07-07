import * as view from "./filterView.js";
import Filter from "./filterModel.js";

export default async function () {
    // Создаем обьект на основе класса Filter, если он еще не сущевствует
    if(!state.filter) state.filter = new Filter();
    // Получаем параметры с сервера
    await state.filter.getParams();
    // Отображаем форму фильтра при инициализации
    view.render(state.filter.params);
}
