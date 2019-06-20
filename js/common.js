"use strict";
var lis = document.getElementsByTagName('li');
for (var i = 0; i < lis.length; i++) {
    lis[i].style.position = 'relative';
    var span = document.createElement('span');
    span.style.cssText = 'position:absolute;left:0;top:0';
    span.innerHTML = i + 1;
    lis[i].appendChild(span);
}

var width = 200;
var carousel = document.getElementById('carousel');
var gallery = document.getElementById('gallery');
var list = carousel.querySelector('ul');
var listElems = carousel.querySelectorAll('li');
var inputSearch = document.getElementById('input-search');
var iconSearch = document.getElementById('icon-search');
var position = 0;
changeBasket();

function changeBasket() {
    let counter = 0;
    let arr = JSON.parse(localStorage.getItem('allClothes'));
    if (arr != null) {
        for (let i = 0; i < arr.length; i++)
            counter = Number(counter) + Number(arr[i].qty);
    }
    document.querySelector('.header-right-side-basket').appendChild
    (document.createTextNode('(' + counter + ')'));
}

carousel.querySelector('.prev').onclick = function () {
    position = Math.min(position + width, 0);
    list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = function () {
    position = Math.max(position - width, -width * (listElems.length - 4.25));
    list.style.marginLeft = position + 'px';
};


gallery.onclick = function (event) {
    if (event.target.className == 'images-odd') {
        window.location.replace("2_category-all.html");
    }
    if (event.target.className == 'images-even') {
        window.location.replace("3_product-details.html");
    }
};


iconSearch.onclick = function (event) {
    if (inputSearch.style.visibility == 'visible') {
        if (inputSearch.value.replace(/\s/g, "") != "") {
            window.location.replace("2_category-all.html");
        }
        inputSearch.style.visibility = 'hidden';
        iconSearch.style.backgroundColor = 'white';


    } else {
        inputSearch.style.visibility = 'visible';
        inputSearch.focus();
        iconSearch.style.backgroundColor = '#a3a3a3';
    }
};

inputSearch.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        window.location.replace("2_category-all.html");
    }
    if (event.keyCode === 27) {
        inputSearch.style.visibility = 'hidden';
        iconSearch.style.backgroundColor = 'white';
    }
});

