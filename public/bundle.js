/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Application__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
    new __WEBPACK_IMPORTED_MODULE_0__Application__["a" /* default */]().run();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Modal__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__List__ = __webpack_require__(4);




class Application {

    constructor () {
        this.list = new __WEBPACK_IMPORTED_MODULE_2__List__["a" /* default */];
        this.form = new __WEBPACK_IMPORTED_MODULE_0__Form__["a" /* default */](this.list);
        this.modal = new __WEBPACK_IMPORTED_MODULE_1__Modal__["a" /* default */];
    }

    run () {
        this.list.render();
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Application;





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Form {
    constructor(list) {
        this.list = list;
        this.cardNumber = document.querySelectorAll('#card .number input');
        this.comment = document.querySelector('#card .comment textarea');
        this.button = document.querySelector('#card .submit');
        this.visaLogo = document.querySelector('#card .fa-cc-visa');
        this.masterCardLogo = document.querySelector('#card .fa-cc-mastercard');
        this.addEventListeners();

    }

    addEventListeners() {
        this.cardNumber.forEach((item) => {
            item.addEventListener('keyup', this.inputKeyUp.bind(this))
        });
        this.button.addEventListener('click', this.getDataForm.bind(this))
    }

    inputKeyUp(event) {
        let length = event.target.value.length;
        if (length === 4) {
            let index = Array.prototype.indexOf.call(this.cardNumber, event.target);
            let nextIndex = index + 1;
            let nextEl = this.cardNumber[nextIndex];
            if (nextEl) nextEl.focus();
        }
        this.validateCardNumber();
    }

    validateCardNumber() {
        let prefix = this.cardNumber[0].value[0];
        let validateText = document.querySelector('.validate-text');

        while (validateText.hasChildNodes()) {
            validateText.removeChild(validateText.firstChild);
        }

        switch (prefix) {
            case '5':
                this.masterCardLogo.hidden = false;
                this.visaLogo.hidden = true;
                this.button.disabled = false;
                break;
            case '4':
                this.visaLogo.hidden = false;
                this.masterCardLogo.hidden = true;
                this.button.disabled = false;
                break;
            case undefined:
                validateText.innerText += 'Enter the card number';
                this.visaLogo.hidden = true;
                this.masterCardLogo.hidden = true;
                this.button.disabled = true;
                break;
            default:
                validateText.innerText += 'Enter the card number Visa or MasterCard';
                this.visaLogo.hidden = true;
                this.masterCardLogo.hidden = true;
                this.button.disabled = true;
        }
    }

    getDataForm() {
        let inputsDataValue = Array.prototype.map.call(this.cardNumber, (item) => {
            return item.value;
        });
        let inputsData = inputsDataValue.join(" ");

        if (inputsData.length === 19) {
            let cardsData = localStorage.getItem('cards');
            let cards = !cardsData ? [] : JSON.parse(cardsData);
            cards.push({
                card: inputsData,
                comment: this.comment.value
            });
            cardsData = JSON.stringify(cards);
            localStorage.setItem('cards', cardsData);
            this.list.render();
        }
        let modal = document.querySelector('.modal-form');
        modal.classList.remove('visible');
        document.querySelector('.overlay').hidden = true;
        document.querySelector('#card').reset();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Form;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Modal {
    constructor() {
        let button = document.querySelector('#header a');
        button.addEventListener("click", this.openModal.bind(this));

        let overlay = document.querySelector('.overlay');
        overlay.addEventListener("click", this.closeModal.bind(this));
    }

    openModal() {
        let modal = document.querySelector('.modal-form');
        document.querySelector('.overlay').hidden = false;
        modal.classList.add('visible');
    }

     closeModal() {
        let modal = document.querySelector('.modal-form');
        modal.classList.remove('visible');
        document.querySelector('.overlay').hidden = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Modal;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class List {
    constructor() {
        this.cardList = document.querySelector('.card-list');
        this.cardDiv = document.querySelector('.cards .card');
    }

    render() {
        let localValueInput = localStorage.getItem('cards');
        let cards = JSON.parse(localValueInput);
        this.cardList.innerHTML = "";
        cards.forEach((item) => {
            let cloneCard = this.cardDiv.cloneNode(true);
            if (cloneCard) {
                let number = cloneCard.querySelector('.number span');
                number.innerHTML += item.card;
                let comment = cloneCard.querySelector('.comment span');
                comment.innerHTML += 'Comment: ' + item.comment;

                cloneCard.hidden = false;
                this.cardList.appendChild(cloneCard);
            }
            // console.log(item.card);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = List;



/***/ })
/******/ ]);