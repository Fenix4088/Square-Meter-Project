export default function () {
    document.querySelector("#app").innerHTML = "";
    const markup = `<div class="container d-flex justify-content-center align-items-center">
        <img src="./img/icons/404.png" alt="404">
    </div>`;
    document.querySelector("#app").innerHTML = markup;
}
