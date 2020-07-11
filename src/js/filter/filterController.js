import * as view from "./filterView.js";
import Filter from "./filterModel.js";

export default async function (state) {
    // Создаем обьект на основе класса Filter, если он еще не сущевствует
    if (!state.filter) state.filter = new Filter();
    // Получаем параметры с сервера
    await state.filter.getParams();
    // Отображаем форму фильтра при инициализации
    view.render(state.filter.params);

    // Делаем запрос на сервер
    await state.filter.getResults();
    // Обновляем текст на кнопке
    view.changeBtnText(state.filter.result.length);

    // Прослушка событий формы
    const form = document.querySelector("#filter-form");
    // Изменение формы
    form.addEventListener("change", async function (e) {
        e.preventDefault();
        // Записываем сформированную строку запроса в обьект state
        state.filter.query = view.getInput();
        // Запрос на сервер за результатом
        await state.filter.getResults();
        // Сохраняем полученные обьекты в общий state
        state.results = state.filter.result;
        // Обновляем текст на кнопке
        view.changeBtnText(state.filter.result.length);
    });

    // Сброс формы
    form.addEventListener("reset", async function () {
        state.filter.query = "";
        // Запрос на сервер за результатом
        await state.filter.getResults();
        // Обновляем текст на кнопке
        view.changeBtnText(state.filter.result.length);
    });

    // Submit формы
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        // при submit  создаем пользовательское событие
        state.emitter.emit("event:render-listing", {});
    });
}
