//! Полифил для использования обьекта URLSearchParams
import "url-search-params-polyfill";
import { filterData, saveValues } from "./filterModel.js";

// Элементы для работы
const elements = {
    filterSelect: document.getElementsByClassName("filter__dropdown"),
    filterRooms: document.getElementsByClassName("rooms__checkbox"),
    filterFields: document.getElementsByClassName("range__input"),
    filterSubmit: document.getElementsByClassName("filter__show"),
};

// Ф-я рендера фильтра
export function render(params) {
    // Создаем строку которая содержит разметку из option-ов с названиями комплексов
    let complexNames = "";
    params.complexNames.forEach((name) => {
        let str = `<option value="${name}" data-complex>ЖК ${name}</option>`;
        complexNames += str;
    });
    // Создаем строку которая содержит разметку из input-ов с кол-вом комнат
    let rooms = "";
    params.roomValues.forEach((value) => {
        rooms += `
        <input
        name="rooms"
        type="checkbox"
        id="rooms_${value}"
        class="rooms__checkbox"
        value="${value}"
        /><label for="rooms_${value}" class="rooms__btn">${value}</label>`;
    });

    const markup = `<form id="filter-form" method="GET" class="container p-0">
    <div class="heading-1">Выбор квартир:</div>
    <div class="filter">
        <div class="filter__col">
            <div class="filter__label">Выбор проекта:</div>
            <select name="complex" id="select" class="filter__dropdown">
                <option value="all" data-complex>Все проекты</option>
                ${complexNames}
            </select>
        </div>
        <div class="filter__col rooms">
            <div class="filter__label">Комнат:</div>
            <div class="rooms__wrapper">
                ${rooms}
            </div>
        </div>
        <div class="filter__col">
            <div class="filter__label">Площадь:</div>
            <div class="range__wrapper">
                <label class="range">
                    <div for="" class="range__label">от</div>
                    <input
                        name="sqmin"
                        min="0"
                        type="number"
                        class="range__input"
                        placeholder="${params.squareMin}"
                        value="${params.squareMin}"
                    />
                    <div class="range__value">м2</div>
                </label>
                <label class="range">
                    <div for="" class="range__label">до</div>
                    <input
                        name="sqmax"
                        min="0"
                        type="number"
                        class="range__input"
                        placeholder="${params.squareMax}"
                        value="${params.squareMax}"
                    />
                    <div class="range__value">м2</div>
                </label>
            </div>
        </div>
        <div class="filter__col">
            <div class="filter__label">Стоимость:</div>
            <div class="range__wrapper">
                <div class="range">
                    <label for="" class="range__label">от</label>
                    <input
                        type="number"
                        name="pricemin"
                        min="0"
                        class="range__input range__input--price"
                        placeholder="${params.priceMin}"
                        value="${params.priceMin}"
                    />
                    <div class="range__value">₽</div>
                </div>
                <div class="range">
                    <label for="" class="range__label">до</label>
                    <input
                        type="number"
                        name="pricemax"
                        min="0"
                        class="range__input range__input--price"
                        placeholder="${params.priceMax}"
                        value="${params.priceMax}"
                    />
                    <div class="range__value">₽</div>
                </div>
            </div>
        </div>
    </div>
    <div class="filter__buttons">
        <button class="filter__show">Показать объекты</button>
        <button type="reset" class="filter__reset">Сбросить фильтр</button>
    </div>
</form>
<!-- Sort by -->
<div class="view-options-wrapper">
<div class="container">
    <!-- view-options -->
    <div class="view-options">
        <div class="view-options__sort">
            <label
                for="sort-cards-by"
                class="view-options__label"
                >Сортировать</label
            >
            <select
                id="sort-cards-by"
                name="sortby"
                id=""
                class="view-options__select"
            >
                <option value="price_total-ASC">по цене ↑</option>
                <option value="price_total-DESC">по цене ↓</option>
                <option value="square-ASC">по площади ↑</option>
                <option value="square-DESC">по площади ↓</option>
            </select>
        </div>
        <div class="view-options__type">
            <!-- Cards -->
            <input
                type="radio"
                class="view-options__radio"
                name="displayType"
                id="displayCards"
                value="cards"
            />
            <label
                for="displayCards"
                class="view-options__type-item"
            >
                <i class="fas fa-th-large"></i>
            </label>
            <!-- List -->
            <input
                type="radio"
                class="view-options__radio"
                name="displayType"
                id="displayList"
                value="list"
            />
            <label
                for="displayList"
                class="view-options__type-item"
            >
                <i class="fas fa-bars"></i>
            </label>
        </div>
    </div>
    <!-- // view-options -->

    <!-- panel filte -->
    <div class="panels-filter" style="display: none;">
        <div
            class="panels-filter__element"
            style="width: 120px;"
        >
            <div class="panels-filter__name no-filter">
                Артикул
            </div>
        </div>
        <div
            class="panels-filter__element"
            style="width: 160px;"
        >
            <div class="panels-filter__name" data-filter="complex_name" data-status>ЖК</div>
        </div>
        <div
            class="panels-filter__element"
            style="width: 70px;"
        >
            <div class="panels-filter__name no-filter">
                Корпус
            </div>
        </div>
        <div
            class="panels-filter__element"
            style="width: 70px;"
        >
            <div class="panels-filter__name no-filter">
                Этаж
            </div>
        </div>
        <div
            class="panels-filter__element"
            style="width: 70px;"
        >
            <div class="panels-filter__name" data-filter="rooms" data-status>Комнат</div>
        </div>
        <div
            class="panels-filter__element"
            style="width: 80px;"
        >
            <div class="panels-filter__name" data-filter="square" data-status>Площадь</div>
        </div>
        <div
            class="panels-filter__element"
            style="width: 100px;"
        >
            <div class="panels-filter__name" data-filter="price_sq_m" data-status>м2</div>
        </div>
        <div
            class="panels-filter__element"
            style="width: 100px;"
        >
            <div class="panels-filter__name" data-filter="price_total" data-status>Стоимость</div>
        </div>

        <div
            class="panels-filter__element"
            style="width: 100px;"
        >
            <div class="panels-filter__name no-filter">
                Избранное
            </div>
        </div>
    </div>
<!-- //panel filte -->
</div>


</div>

`;
    document.querySelector("#app").insertAdjacentHTML("afterbegin", markup);
}

// Ф-я для отображения количества пказываемых обьектов на кнопке
export function changeBtnText(number) {
    let message;
    const btn = elements.filterSubmit[0];
    if (number > 0) {
        message = `Показать ${number} обьектов`;
        btn.disabled = false;
    } else {
        message = `Обьекты не найдены. Измените условие поиска`;
        btn.disabled = true;
    }
    btn.innerText = message;
}

// Ф-я которая получает данные из формы
export function getInput() {
    const searchParams = new URLSearchParams();
    // 1. Значение с select(название комплексов)

    if (elements.filterSelect[0].value !== "all") {
        searchParams.append(elements.filterSelect[0].name, elements.filterSelect[0].value);
        // Созранение значения в обьект фильтра filtrData
        filterData.complex = elements.filterSelect[0].value;
    }

    if (elements.filterSelect[0].value === "all") {
        filterData.complex = "all";
    }
    // 2. Параметры комнат - чекбоксы
    const roomsValues = [];
    Array.from(elements.filterRooms).forEach((checkbox) => {
        if (checkbox.value !== "" && checkbox.checked) {
            roomsValues.push(checkbox.value);
            // Созранение значения в обьект фильтра filtrData
            filterData.rooms = roomsValues;
        }
    });

    const roomsValuesString = roomsValues.join(",");

    if (roomsValuesString !== "") {
        searchParams.append("rooms", roomsValuesString);
    }

    // 3. Значения площадь и цена - input
    Array.from(elements.filterFields).forEach((input) => {
        if (input.value !== "") {
            searchParams.append(input.name, input.value);
            // Созранение значения в обьект фильтра filtrData
            filterData[input.name] = input.value;
        }
    });
    // Сохраняем обьект фильтра в LS
    localStorage.setItem("Filter Data", JSON.stringify(filterData));

    // Формируем строку запроса
    const queryString = searchParams.toString();
    // Если строка сформировалась то в ее начало добавляем '?'
    if (queryString) {
        return "?" + queryString;
    } else {
        return "";
    }
}

// Обновление input фильтра из LS
export function setInputs() {
    const savedFilterData = JSON.parse(localStorage.getItem("Filter Data"));
    if (savedFilterData !== null) {
        // Устанавливаем значение option в соответсвии с LS
        Array.from(elements.filterSelect[0].children).forEach((item) => {
            item.value === savedFilterData.complex ? (item.selected = true) : false;
        });

        // Комнаты
        Array.from(elements.filterRooms).forEach((room) => {
            savedFilterData.rooms.forEach((savedRoomNumber) => {
                savedRoomNumber === room.value ? (room.checked = true) : false;
            });
        });

        // Остальные поля фильтра
        Object.keys(savedFilterData).forEach((key) => {
            Array.from(elements.filterFields).forEach((input) => {
                // Сравниваем ключи созраненного обьекта с input.name и если они совпадают то input.value = значению из LS
                if (key === input.name) {
                    input.value = savedFilterData[key];
                }
            });
        });

        return true;
    } else {
        return false;
    }
}
