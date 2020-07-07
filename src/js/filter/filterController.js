import * as view from "./filterView.js";
import Filter from "./filterModel.js";

export default function () {
    // Отображаем форму фильтра при инициализации
    // view.render();
    // Создаем обьект на основе класса Filter, если он еще не сущевствует
    if(!state.filter) state.filter = new Filter();
    // Получаем параметры с сервера
    state.filter.getParams();
}
