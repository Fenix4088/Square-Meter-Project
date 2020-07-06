import * as view from "./filterView.js";
import Filter from "./filterModel.js";

export default function () {
    // Отображаем форму фильтра при инициализации
    view.render();
    // Создаем обьект на основе класса Filter
    const filter = new Filter();
    filter.getParams();
}
