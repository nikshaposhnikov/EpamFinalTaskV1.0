"use strict";

var buttonOrder = document.querySelector('.main-order button');
buttonOrder.onclick = function () {
    window.location.replace("5_thank-you.html");
    localStorage.clear();
};
let table = document.querySelector('.table');
table.addEventListener('click', changeBasketQTY);
var existingClothes = JSON.parse(localStorage.getItem("allClothes"));
createBasket();
sum();

function changeBasketQTY(event) {
    if (event.target.className == 'table-QTY-button') {
        let sumQtySelector = document.querySelectorAll('.table-QTY input');
        let sumQTV = 0;
        for (let i = 0; i < sumQtySelector.length; i++) {
            sumQTV += Number(sumQtySelector[i].value);
        }
        document.querySelector('#header-right-side-name-basket').innerHTML = '';
        document.querySelector('#header-right-side-name-basket').appendChild(document.createTextNode('Basket' + '(' + sumQTV + ')'));
    }
    if (event.target.className == 'button-delete') {
        let resultDelete = JSON.parse(localStorage.getItem("allClothes"));
        let name = event.target.closest('.table-row').querySelector('h3').innerHTML;
        let size = event.target.closest('.table-row').querySelector('.table-size').innerHTML;
        for (let i = 0; i < resultDelete.length; i++) {
            if (resultDelete[i].name == name && resultDelete[i].size == size) {
                resultDelete.splice(i, 1);
            }
        }

        localStorage.clear();
        localStorage.setItem("allClothes", JSON.stringify(resultDelete));
        event.target.closest('.table-row').remove();
        sum();
        let sumQtySelector = document.querySelectorAll('.table-QTY input');
        let sumQTV = 0;
        for (let i = 0; i < sumQtySelector.length; i++) {
            sumQTV += Number(sumQtySelector[i].value);
        }
        document.querySelector('#header-right-side-name-basket').innerHTML = '';
        document.querySelector('#header-right-side-name-basket').appendChild(document.createTextNode('Basket' + '(' + sumQTV + ')'));
    }
}

function sum() {
    let subtotal = document.querySelector('.main-subtotal');
    let subtotalText = document.querySelector('.main-subtotal p');
    subtotal.innerHTML = '';
    subtotalText.innerHTML = '';
    let subtotalSum = document.createElement('p');
    subtotalSum.style.color = ' #f68236';
    let sum = 0;
    let prices = document.querySelectorAll('.table-price');
    let QTYS = document.querySelectorAll('.table-QTY input ');
    for (let i = 0; i < prices.length; i++) {
        let price = prices[i].innerHTML.slice(2);
        let size = QTYS[i].value;
        sum += Number(price) * Number(size);
    }
    sum = Math.round(sum * 100) / 100;
    subtotalText.appendChild(document.createTextNode('Subtotal: '));
    subtotalSum.appendChild(document.createTextNode(sum + '€'));
    subtotal.appendChild(subtotalText);
    subtotal.appendChild(subtotalSum);
}

function createBasket() {
    if (existingClothes != null) {
        var result = [];
        var counter = existingClothes.qty;
        nextInput:
            for (let i = 0; i < existingClothes.length; i++) {
                var name = existingClothes[i].name;
                var size = existingClothes[i].size;
                for (let j = 0; j < result.length; j++) {
                    if (result[j].name == name && result[j].size == size) {
                        continue nextInput;
                    }
                }
                result.push(existingClothes[i]);
            }
        for (let j = 0; j < result.length; j++) {
            if (result[j] == undefined) {
                let counter = 0;
            } else {
                counter = Number(result[j].qty) - 1;
            }
            for (let i = 0; i < existingClothes.length; i++) {
                if (result[j].name == existingClothes[i].name && result[j].size == existingClothes[i].size) {
                    counter += 1;
                }
                if (counter > 9)
                    counter = 9;
                result[j].qty = counter;
            }
        }

        localStorage.clear();
        localStorage.setItem("allClothes", JSON.stringify(result));
        for (let i = 0; i < result.length; i++) {
            var tableRow = document.createElement('div');
            let tableImage = document.createElement('div');
            let image = document.createElement('img');
            image.src = 'img/shoes1.jpg';
            image.alt = 'Shoes';
            let tableDescription = document.createElement('div');
            let tableName = document.createElement('div');
            let tableNameH3 = document.createElement('h3');
            let tableNameP = document.createElement('p');
            let tableColor = document.createElement('div');
            let tableSize = document.createElement('div');
            let tableRowPriceDelete = document.createElement('div');
            let tablePrice = document.createElement('div');
            let tableDelete = document.createElement('div');
            let table = document.querySelector('.table');
            let buttonDelete = document.createElement('button');
            let buttonUp = document.createElement('button');
            let buttonDown = document.createElement('button');
            let input = document.createElement('input');
            let tableQTYButtons = document.createElement('div');
            let tableQTY = document.createElement('div');
            tableRow.className = 'table-row';
            tableImage.className = 'table-image';
            tableDescription.className = 'table-row-description';
            tableName.className = 'table-name';
            tableColor.className = 'table-color';
            tableSize.className = 'table-size';
            tableRowPriceDelete.className = 'table-row-price-delete';
            tablePrice.className = 'table-price';
            tableDelete.className = 'table-delete';
            buttonDelete.className = 'button-delete';
            buttonDelete.innerText = 'x';
            tableQTYButtons.className = 'table-QTY-buttons';
            tableQTY.className = 'table-QTY';
            buttonUp.className = 'table-QTY-button';
            buttonDown.className = 'table-QTY-button';
            buttonUp.innerText = '▲';
            buttonDown.innerText = '▼';
            input.className = 'QTY';
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.readOnly = true;
            input.value = result[i].qty;
            let inputValueUp = input.value;
            buttonUp.onclick = function () {
                if (input.value < 9) {
                    inputValueUp = Number(inputValueUp) + 1;
                    input.value = inputValueUp;
                }
                result[i].qty=input.value;
                //localStorage.clear();
                //localStorage.setItem("allClothes", JSON.stringify(result));
                sum();
            };
            buttonDown.onclick = function () {
                if (input.value != 1) {
                    inputValueUp = Number(inputValueUp) - 1;
                    input.value = inputValueUp;
                }
                result[i].qty=input.value;
                //localStorage.clear();
                //localStorage.setItem("allClothes", JSON.stringify(result));
                sum();
            };

            tableNameH3.appendChild(document.createTextNode(result[i].name));
            tableNameP.appendChild(document.createTextNode('Ref.2514/302'));
            tableName.appendChild(tableNameH3);
            tableName.appendChild(tableNameP);
            tableImage.appendChild(image);
            tableDescription.appendChild(tableName);
            tableColor.appendChild(document.createTextNode(result[i].color));
            tableSize.appendChild(document.createTextNode(result[i].size));
            tablePrice.appendChild(document.createTextNode('€ ' + result[i].price));
            tableDelete.appendChild(buttonDelete);
            tableRowPriceDelete.appendChild(tablePrice);
            tableRowPriceDelete.appendChild(tableDelete);
            tableRow.appendChild(tableImage);
            tableQTYButtons.appendChild(buttonUp);
            tableQTYButtons.appendChild(buttonDown);
            tableQTY.appendChild(input);
            tableQTY.appendChild(tableQTYButtons);
            tableDescription.appendChild(tableColor);
            tableDescription.appendChild(tableSize);
            tableDescription.appendChild(tableQTY);
            tableRow.appendChild(tableDescription);
            tableRow.appendChild(tableRowPriceDelete);
            table.appendChild(tableRow);
        }

    }
}

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}