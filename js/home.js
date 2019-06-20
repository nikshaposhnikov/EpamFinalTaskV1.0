"use strict";
let table = document.getElementById('content-table');
table.onclick = function (event) {
    if (event.target.className == 'content-table-cell-image') {
        window.location.replace("2_category-all.html");
    } else {
        window.location.replace("3_product-details.html");

    }
};
document.querySelector('.button-new-arrivals').onclick = function () {
    window.location.replace("2_category-all.html");
};

function validateEmail() {
    let reg = /\S+@{1}\S+\.\S+/;
    let address = document.querySelector(".formForEmail input").value;
    let text = document.querySelector('.formForEmail .form-validation-text');
    let form = document.querySelector(".formForEmail form");
    text.style.marginBottom='0';
    if (reg.test(address) == false) {
        text.style.color='red';
        text.innerText= "Please enter valid e-mail";
    }
    else {
        text.style.color='green';
        text.innerText= "We added you to our list";
        document.querySelector(".formForEmail input").value='';
    }
    form.insertBefore(text, form.firstChild);

}