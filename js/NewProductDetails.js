"use strict";
var button = document.getElementById('button-add');
var sizeValue='40';
highlight(document.querySelector('.main-info-size-numbers p:nth-child(3)'));
function Clothes(name, price, color, size) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.size = size;
    this.qty = 1;
}
button.onclick = function () {
    button.style.backgroundColor = 'green';
    button.innerHTML = '';
    button.appendChild(document.createTextNode('Product Added'));

    let existingClothes = JSON.parse(localStorage.getItem("allClothes"));
    if (existingClothes == null) existingClothes = [];
    existingClothes.push(new Clothes('New Shoes', 50.95, 'Black', sizeValue));
    localStorage.setItem("allClothes", JSON.stringify(existingClothes));
    let counter = 0;
    let arr = JSON.parse(localStorage.getItem('allClothes'));
    if (arr != null) {
        for (let i = 0; i < arr.length; i++)
            counter = Number(counter) + Number(arr[i].qty);
    }
    document.querySelector('.header-right-side-basket').innerHTML='';
    document.querySelector('.header-right-side-basket').appendChild
    (document.createTextNode('Basket(' + counter + ')'));
};
var size = document.getElementById('main-info-size-numbers');
var selectedSize;

size.onclick = function (event) {
    var target = event.target;
    while (target != this) {
        if (target.tagName == 'P') {
            highlight(target);
            sizeValue=target.innerHTML;
            return;
        }
        target = target.parentNode;
    }
};

function highlight(node) {
    if (selectedSize) {
        selectedSize.classList.remove('highlight');
    }
    selectedSize = node;
    selectedSize.classList.add('highlight');
}

var imagesSmall = document.getElementById('main-images-small');
imagesSmall.onclick = function (event) {
    let imageBig = document.querySelector('.main-images-big img');
    let deletedPhoto = document.querySelector('.main-images-big').removeChild(imageBig);
    document.querySelector('.main-images-big').appendChild(event.target);
    document.querySelector('.main-images-small').appendChild(deletedPhoto);
};
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}