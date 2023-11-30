
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () =>
{
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
};


let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () =>
{
    shoppingCart.classList.toggle('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
};

let loginForm = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick = () =>
{
    loginForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
};

let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () =>
{
    navbar.classList.toggle('active');
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    searchForm.classList.remove('active');
};

windows.onscroll = () =>
{
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
};


// let tl = gsap.timeline({default: {duration: 0.2}});
// tl 
//     .from(".header",{opacity:0, y:10})
//     .from(".home", {opacity:0, y:10})
//     .from('.features', {opacity:0, y:8})
//     .from(".products", {opacity:0, y:10})
//     .from(".categories", {opacity:0, y:10})
//     .from(".review", {opacity:0, y:10})
//     .from(".blogs", {opacity:0, y:10})

