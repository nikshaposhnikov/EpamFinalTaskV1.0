"use strict";
var main = document.getElementById('main');
main.onclick = function (event) {
    if (event.target.className == 'main-table-name' || event.target.className == 'main-table-price' || event.target.className == '') {
        window.location.replace("3_product-details.html");

    }
};
