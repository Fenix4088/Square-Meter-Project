import SingleItem from "./singleItemModel.js";
import * as view from "./singleItemView.js";

export default async function (state) {
    // Создаем и записываем класс SingleItem в state приложения
    state.singleItem = new SingleItem(state.routeParams);
    await state.singleItem.getItem();
    // Рендерим разметку для отдельного обьекта
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    // *Прослушка событий
    const orderBtn = document.querySelector(".button-order");
    const modalCloseBtn = document.querySelector(".modal__close");
    const modalWrapper = document.querySelector(".modal__form");
    const favouriteBtn = document.querySelector("#addToFavouriteBtn");

    // Открытие модального окна
    orderBtn.addEventListener("click", () => {
        view.showModal();
    });

    // Скрытие модального окна - клик по кнопке
    modalCloseBtn.addEventListener("click", () => {
        view.hideModal();
    });

    // Скрытие модального окна - клик оверлею
    modalWrapper.addEventListener("click", (e) => {
        if (e.target.closest(".modal")) {
            return null;
        } else {
            view.hideModal();
        }
    });

    // Отправка формы
    modalWrapper.addEventListener("submit", async function (e) {
        e.preventDefault();
        // Сбор данных из формы модального окна
        const formData = view.getInput();
        // Отправка данных на сервер
        /*
        await state.singleItem.sendData(formData);
        const response = state.singleItem.response;
        */
        const response = await state.singleItem.sendData(formData);
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
            view.showWarning(formData, responseStatus);
        }
        // Отобрадение иконки статуса заявки
        view.showIcon(responseStatus);
    });

    // Клик по кнопке добавить в избранное
    favouriteBtn.addEventListener("click", () => {
        // Добавляем id текущего обьекта в массив в state
        state.favourites.toggleFav(state.singleItem.id);
        // Добавоение активного класса для кнопки
        view.toggleFavouriteBtn(state.favourites.isFav(state.singleItem.id))
    });
}
