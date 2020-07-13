import SingleItem from "./singleItemModel.js";
import * as view from "./singleItemView.js";

export default async function (state) {
    // Создаем и записываем класс SingleItem в state приложения
    state.singleItem = new SingleItem(state.routeParams);
    await state.singleItem.getItem();
    // Рендерим разметку для отдельного обьекта
    view.render(state.singleItem.result);

    // *Прослушка событий

    // Открытие модального окна
    document.querySelector(".button-order").addEventListener("click", () => {
        // const currentObject = state.singleItem.result;
        view.showModal();
    });

    // Скрытие модального окна - клик по кнопке
    document.querySelector(".modal__close").addEventListener("click", () => {
        view.hideModal();
    });

    // Скрытие модального окна - клик оверлею
    document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
        if (e.target.closest(".modal")) {
            return null;
        } else {
            view.hideModal();
        }
    });

    // Отправка формы
    document.querySelector(".modal__form").addEventListener("submit", async function (e) {
        e.preventDefault();
        // Сбор данных из формы модального окна
        const formData = view.getInput();
        // Отправка данных на сервер
        await state.singleItem.submitForm(formData);

        const response = state.singleItem.response;
        // Переменная для статуса отправки формы
        let responseStatus;
        // Проверка на то какой ответ пришел из сервера, создана ли заявка или нет
        if (response.message === "Bid Created") {
            responseStatus = true;
            view.hideModal();
            view.clearInput();
            view.showWarning(response, responseStatus);

        } else if (response.message === "Bid Not Created") {
            responseStatus = false;
            view.showWarning(response, responseStatus);

        }
        // Отобрадение иконки статуса заявки
        view.showIcon(responseStatus);
    });

    // Клик по кнопке добавить в избранное
    document.querySelector('#addToFavouriteBtn').addEventListener('click', () => {
        // Добавляем id текущего обьекта в массив в state
        state.favourites.toggleFav(state.singleItem.id);
    })



}
