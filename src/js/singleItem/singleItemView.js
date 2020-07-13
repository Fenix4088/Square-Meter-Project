// Ф-я для отображения окна элемента
export function render(object, isFaved) {
    console.log("render -> isFaved", isFaved);
    const appContainer = document.querySelector("#app");

    const markup = `
        <div class="container p-0 pt-5">
        <div class="heading-1">
            ${object.title}, ${object.square} м2 за ${object.price_total} ₽
        </div>

        <!-- object -->
        <div class="object">
            <!-- object__photo -->
            <div class="object__photo">
                <div class="object__photo-wrapper">
                    <img src=${object.image} alt="" />
                </div>
            </div>
            <!-- // object__photo -->

            <!-- object__desc -->
            <div class="object__desc">
                <div class="object__desc-sector">
                    ЖК ${object.complex_name}
                </div>

                <div class="object__desc-name">
                    <div class="object__desc-title">
                    ${object.title}, ${object.square} м2
                    </div>
                    <div class="object__desc-art">${object.scu}</div>

                    <!-- Добавить в избранное -->
                    <button id="addToFavouriteBtn" 
                    class="
                    button-favourite
                    ${isFaved ? "button-favourite--active" : ""}
                    ">
                        <i class="fas fa-heart"></i> 
                        <span>
                        ${isFaved ? "В избранном" : "В избранное"}
                        </span>
                    </button>

                </div>

                <div class="object__desc-details">
                    <!-- params -->
                    <div class="params">
                        <div class="params__item">
                            <div class="params__definition">Корпус</div>
                            <div class="params__value">${object.building}</div>
                        </div>
                        <div class="params__item">
                            <div class="params__definition">Этаж</div>
                            <div class="params__value">${object.floor}</div>
                        </div>
                        <div class="params__item">
                            <div class="params__definition">Номер</div>
                            <div class="params__value">${object.flat_number}</div>
                        </div>
                        <div class="params__item">
                            <div class="params__definition">Комнат</div>
                            <div class="params__value">${object.rooms}</div>
                        </div>
                    </div>
                    <!-- // params -->
                </div>

                <div class="details">
                    <div class="details__row">
                        <div class="details__name">Стоимость</div>
                        <div
                            class="details__value details__value--price"
                        >
                        ${object.price_total} ₽
                        </div>
                    </div>
                    <div class="details__row">
                        <div class="details__name">Цена за м2</div>
                        <div class="details__value">${object.price_sq_m} ₽/м2</div>
                    </div>
                    <div class="details__row">
                        <div class="details__name">Площадь</div>
                        <div class="details__value">${object.square} м2</div>
                    </div>
                </div>

                <button class="button-order">Забронировать</button>
                <!-- <button class="button-preview">Записаться на просмотр</button> -->
            </div>
            <!-- // object__desc -->
        </div>
        <!-- // object -->
    </div>
    <div class="container p-0">
        <a href="index.html" class="back-to-results"
        >← Вернуться к результатам поиска</a
        >
    </div>
    `;

    // Разметка для модального окна
    const makrupModal = `
            <div class="modal-wrapper none">
            <div class="modal">
                <div class="modal__header">
                    <div class="modal__title">
                        Заявка на бронирование
                    </div>
                    <div class="modal__details">
                    ${object.title}<span> номер ${object.flat_number}</span> Номер дома: ${object.building}
                        <div class="modal__details-art">${object.scu}</div>
                    </div>
                </div>

                <form class="modal__form">
                    <div class="modal__form-content">
                        <!-- formgroup -->
                        <div class="formgroup">
                            <label
                                class="modal__form-input-label"
                                for="form-phone"
                            >
                                Имя<span class="warning-name warning ml-10"></span>
                            </label>
                            <input
                                type="text"
                                id="form-name"
                                class="modal__form-input"
                                placeholder="Введите имя"
                            />
                        </div>
                        <!-- // formgroup -->
                        <!-- formgroup -->
                        <div class="formgroup">
                            <label
                                class="modal__form-input-label"
                                for="form-phone"
                            >
                                Телефон<span class="warning-phone warning ml-10"></span>
                            </label>
                            <input
                                type="text"
                                id="form-phone"
                                class="modal__form-input"
                                placeholder="+7 (XXX) XXX-XX-XX"
                            />
                        </div>
                        <!-- // formgroup -->

                        <div class="formgroup formgroup--checkbox">
                            <input type="checkbox" id="policy" checked />
                            <label class="policy-text" for="policy"
                                >Я согласен на обработку моих персональных
                                данных. С Политикой в отношении обработки
                                персональных данных ознакомлен и
                                согласен.</label
                            >
                        </div>
                    </div>
                    <input
                        class="modal__submit"
                        type="submit"
                        value="Отправить заявку"
                    />
                </form>
                <button class="modal__close">
                    Закрыть
                </button>
            </div>
        </div>
    `;

    // Иконки успех и отказ
    const markupIcons = `
    <img class="accept-icon none" src="./img/icons/checkIcon.svg" alt="">
    <img class="denial-icon none" src="./img/icons/denialIcon.svg" alt="">
    `;

    appContainer.insertAdjacentHTML("beforeend", markup);
    appContainer.insertAdjacentHTML("beforeend", makrupModal);
    appContainer.insertAdjacentHTML("afterbegin", markupIcons);
}

// Ф-я для отображения модального окна
export function showModal() {
    document.querySelector(".modal-wrapper").classList.remove("none");
}

// Скрытие модального окна
export function hideModal() {
    document.querySelector(".modal-wrapper").classList.add("none");
}

// Ф-я которая собирает данные из формы модального окна
export function getInput() {
    const formData = {};
    formData.name = document.querySelector("#form-name").value;
    formData.phone = document.querySelector("#form-phone").value;
    return formData;
}

// Ф-я очистки формы модального окна после отправки
export function clearInput() {
    document.querySelector("#form-name").value = "";
    document.querySelector("#form-phone").value = "";
}
// Ф-я для отображения иконок после отправки формы
export function showIcon(status) {
    if (status) {
        document.querySelector(".accept-icon").classList.remove("none");
        setTimeout(() => {
            document.querySelector(".accept-icon").classList.add("none");
        }, 1000);
    } else {
        document.querySelector(".denial-icon").classList.remove("none");
        setTimeout(() => {
            document.querySelector(".denial-icon").classList.add("none");
        }, 1000);
    }
}
// Ф-я отображения сообщений об ошибке на Input-ах
export function showWarning(response, responseStatus) {
    if (responseStatus) {
        document.querySelector(".warning-name").innerText = "";
        document.querySelector(".warning-phone").innerText = "";
    } else {
        document.querySelector(".warning-name").innerText = response.errors[0];
        document.querySelector(".warning-phone").innerText = response.errors[1];
    }
}

// Ф-я для интерактивной смены класса у кнопки Избранное
export function toggleFavouriteBtn(isFaved) {
    const btn = document.querySelector("#addToFavouriteBtn");
    if (isFaved) {
        btn.classList.add("button-favourite--active");
        btn.querySelector('span').textContent = 'В избранном'
    } else {
        btn.classList.remove("button-favourite--active");
        btn.querySelector('span').textContent = 'В избранное'
    }
}
