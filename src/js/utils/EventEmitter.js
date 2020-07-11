export default class EventEmitter {
    constructor() {
        this.events = {};
    }

    // * Принимает название и данные
    emit(eventName, data) {
        const event = this.events[eventName];
        if (event) {
            event.forEach((fn) => {
                fn.call(null, data);
            });
        }
    }

    subscribe(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter((eventFn) => fn !== eventFn);
        };
    }
}

// let input = document.querySelector('input[type="text"]');
// let button = document.querySelector("button");
// let h1 = document.querySelector("h1");

// let emitter = new EventEmitter();

// emitter.subscribe("event:name-changed", (obj) => {
//     h1.innerHTML = `Your name is ${obj.name}`;
// });
// console.log("emitter", emitter);

// button.addEventListener("click", () => {
//     emitter.emit("event:name-changed", { name: input.value });
// });
