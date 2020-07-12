import SingleItem from "./singleItemModel.js";
import * as view from "./singleItemView.js";

export default async function (state) {
    // Создаем и записываем класс SingleItem в state приложения
    state.singleItem = new SingleItem(state.routeParams);
    await state.singleItem.getItem();
    // Рендерим разметку для отдельного обьекта
    view.render(state.singleItem.result);

    // Прослушка событий

    // Открытие модального окна
    document.querySelector(".button-order").addEventListener("click", () => {
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
    document.querySelector('.modal__form').addEventListener('submit', async function (e) {
        e.preventDefault();
        // Сбор данных из формы модального окна
        const formData = view.getInput();
        // Отправка данных на сервер
        await state.singleItem.submitForm(formData)
    })




}
