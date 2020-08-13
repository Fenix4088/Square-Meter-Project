// Func to display the item window
export function render(object, isFaved) {
    console.log("render -> isFaved", isFaved);
    const appContainer = document.querySelector("#app");

    const markup = `
        <div class="container p-0 pt-5">
        <div class="heading-1">
            ${object.title}, ${object.square} м2 for ${object.price_total} ₽
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
                        ${isFaved ? "Favorite" : "Add to favorites"}
                        </span>
                    </button>

                </div>

                <div class="object__desc-details">
                    <!-- params -->
                    <div class="params">
                        <div class="params__item">
                            <div class="params__definition">Building</div>
                            <div class="params__value">${object.building}</div>
                        </div>
                        <div class="params__item">
                            <div class="params__definition">Floor</div>
                            <div class="params__value">${object.floor}</div>
                        </div>
                        <div class="params__item">
                            <div class="params__definition">Apartment</div>
                            <div class="params__value">${object.flat_number}</div>
                        </div>
                        <div class="params__item">
                            <div class="params__definition">Rooms</div>
                            <div class="params__value">${object.rooms}</div>
                        </div>
                    </div>
                    <!-- // params -->
                </div>

                <div class="details">
                    <div class="details__row">
                        <div class="details__name">Price</div>
                        <div
                            class="details__value details__value--price"
                        >
                        ${object.price_total} ₽
                        </div>
                    </div>
                    <div class="details__row">
                        <div class="details__name">Price for м2</div>
                        <div class="details__value">${object.price_sq_m} ₽/м2</div>
                    </div>
                    <div class="details__row">
                        <div class="details__name">Space</div>
                        <div class="details__value">${object.square} м2</div>
                    </div>
                </div>

                <button class="button-order">Book now</button>
                <!-- <button class="button-preview">Записаться на просмотр</button> -->
            </div>
            <!-- // object__desc -->
        </div>
        <!-- // object -->
    </div>
    <div class="container p-0">
        <a href="index.html" class="back-to-results"
        >← Back to search results</a
        >
    </div>
    `;

    // The markup for the modal window
    const makrupModal = `
            <div class="modal-wrapper none">
            <div class="modal">
                <div class="modal__header">
                    <div class="modal__title">
                        Booking request
                    </div>
                    <div class="modal__details">
                    ${object.title}<span> apartament number ${object.flat_number}</span> Building number: ${object.building}
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
                                Name<span class="warning-name warning ml-10"></span>
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
                                Phone number<span class="warning-phone warning ml-10"></span>
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
                                >I agree to the processing of my personal
                                data. With Processing Policy
                                personal data is familiarized and
                                I agree.</label
                            >
                        </div>
                    </div>
                    <input
                        class="modal__submit"
                        type="submit"
                        value="Send request"
                    />
                </form>
                <button class="modal__close">
                    Close
                </button>
            </div>
        </div>
    `;

    // Success and failure icons
    const markupIcons = `
    <img class="accept-icon none" src="./img/icons/checkIcon.svg" alt="">
    <img class="denial-icon none" src="./img/icons/denialIcon.svg" alt="">
    `;

    appContainer.insertAdjacentHTML("beforeend", markup);
    appContainer.insertAdjacentHTML("beforeend", makrupModal);
    appContainer.insertAdjacentHTML("afterbegin", markupIcons);
}

// Func for displaying a modal window
export function showModal() {
    document.querySelector(".modal-wrapper").classList.remove("none");
}

// Hiding a modal window
export function hideModal() {
    document.querySelector(".modal-wrapper").classList.add("none");
}

// Func that collects data from the form of a modal window
export function getInput() {
    const formData = {};
    formData.name = document.querySelector("#form-name").value;
    formData.phone = document.querySelector("#form-phone").value;
    return formData;
}

// Func clearing the modal window form after submitting
export function clearInput() {
    document.querySelector("#form-name").value = "";
    document.querySelector("#form-phone").value = "";
}
// Func to display icons after submitting the form
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
// Func of displaying error messages on Input-s
export function showWarning(formData, responseStatus) {
    // Finding the div for the validation message
    const warningName = document.querySelector(".warning-name");
    const warningPhone = document.querySelector(".warning-phone");

    if (responseStatus) {
        warningName.innerText = "";
        warningPhone.innerText = "";
    } else {
        if (formData.name.trim() === "") {
            warningName.innerText = "The Name field is required!";
        } else {
            warningName.innerText = "";
        }

        if (formData.phone.trim() === "") {
            warningPhone.innerText = "The Phone number field is required!";
        } else {
            warningPhone.innerText = "";
        }
    }
}

// Func for interactive class change at the Favorites button
export function toggleFavouriteBtn(isFaved) {
    const btn = document.querySelector("#addToFavouriteBtn");
    if (isFaved) {
        btn.classList.add("button-favourite--active");
        btn.querySelector("span").textContent = "Favorite";
    } else {
        btn.classList.remove("button-favourite--active");
        btn.querySelector("span").textContent = "Add to favorites";
    }
}
