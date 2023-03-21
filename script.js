$(".dws-form").on("click", ".tab2", function() {
    $(".dws-form").find(".active1").removeClass('active1');
    $(this).addClass('active2');
    $(".tab-form1").removeClass('active');
    $(".tab-form2").addClass("active");
});

$(".dws-form").on("click", ".tab1", function() {
    $(".dws-form").find(".active2").removeClass('active2');
    $(this).addClass('active1');
    $(".tab-form2").removeClass('active');
    $(".tab-form1").addClass("active");
});

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');

if(popupLinks.length > 0) {
    for(let i = 0; i< popupLinks.length; i++) {
        const popLink = popupLinks[i];
        popLink.addEventListener("click", function(e) {
            const popupName = popLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();/*блокировка ссылки т.е. она не перезагружает страницу*/
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.popup-close');
if(popupCloseIcon.length > 0) {
    for(let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener("click", function(e) {
            el.closest('.popup').classList.remove('open');
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    const cartList = currentPopup.querySelector('.items');
    if(cartList)
        createCartList(cartList);
    currentPopup.classList.add('open');
    currentPopup.addEventListener("click", function(e) {
        if(!e.target.closest('.popup-container')) {
            e.target.closest('.popup').classList.remove('open');
            //popupClose(e.target.closest('.popup'));
            if(cartList){
                cartList.innerHTML = '';
            }
        }
    });
}


function createCartList(items) {
    let cost = 0;
    for(let i of cart.keys()) {
        const newItem = document.createElement('span');
        newItem.innerHTML = 
            `<button class="remove">
                <img src='remove.svg'>
            </button>
            <img src='${i.photoURL}' class='photo' height=48px>
            <span class='name'>${i.name}</span>
                :${cart.get(i)}*
            <span class='price'>${i.price}</span>`;
        items.append(newItem);
        const br = document.createElement('br');
        items.append(br);
        cost += cart.get(i) * parseInt(i.price);
    }
    const totalCost = document.createElement('span');
    totalCost.innerHTML = `Total cost: ${cost}$`;
    items.append(totalCost);
    $(".remove").on("click", function() {
        console.log(this.innerHTML);
        $(this).parent().hide();
        $(this).parent().find("br").hide();
        $(this).parent().parent().find("span:nth-last-child(1)").hide();
        $(this).parent().find("span").hide();
        let item = new Product();
        item.deleteItem(this.parentNode);
        cost = 0;
        /*if(cart.size == 0)
            cost = 0;*/
        for(let i of cart.keys()) {
            if(cart.get(i) == 0) {
                console.log(cost);
                cost -= i.cost;
                break;
            }
            cost += cart.get(i) * parseInt(i.price);
            console.log(parseInt(i.price));
            console.log(cost);
        }
        const totalCost = document.createElement('span');
        totalCost.innerHTML = `Total cost: ${cost}$`;
        items.append(totalCost);
    });
    // removeFromCartButton = currentPopup.getElementsByClassName('remove');
    // console.log(removeFromCartButton);
}

let addToCartButton = document.getElementsByClassName('add-to-cart');

class Product {
    name;
    price;
    photoURL;

    constructor(name, price, photoURL) {
        this.name = name;
        this.price = price;
        this.photoURL = photoURL;
    }

    addToCart(event) {
        console.log(event);
        let itemName = event.target.parentNode.querySelector('.name').textContent;
        let itemPtice = event.target.parentNode.querySelector('.price').textContent;
        let itemPhoto = event.target.parentNode.querySelector('img.photo').src;
        let item = new Product(itemName, itemPtice, itemPhoto);
        let value = 1;
        for(let i of cart.keys()) {
            if(i.name == item.name) {
                value = cart.get(i);
                value++;
                cart.delete(i)
                cart.set(item, value+1);
                break;
            }
        }
        cart.set(item, value);
    }
    deleteItem(event) {
        console.log(event);
        let itemName = event.querySelector('.name').textContent;
        let itemPtice = event.querySelector('.price').textContent;
        let itemPhoto = event.querySelector('.photo').src;
        let item = new Product(itemName, itemPtice, itemPhoto);
        for(let i of cart.keys()) {
            console.log(item.name);
            if(i.name == item.name) {
                cart.delete(i);
                console.log(cart);
                break;
            }
        }
    }
}

let cart = new Map();

for(let i of addToCartButton) {
    let item = new Product();
    i.addEventListener("click", item.addToCart);
}


let form = document.forms.productSpecs;
const addItem = document.querySelector('.add-item-button');
addItem.addEventListener("click", function(e){
    let itemSetName = form.elements.name.value;
    let itemSetPrice = form.elements.price.value+'$';
    let itemSetPhoto = form.elements.photo.value;
    let newItem = new Product(itemSetName, itemSetPrice, itemSetPhoto);
    const catalogue = document.querySelector('.catalogue');
    const item = document.createElement('div');
    item.innerHTML = ` 
    <img class = "photo" src="${newItem.photoURL}" alt="Product ${newItem.name}"  height="350">
    <span class="name">${newItem.name}</span>
    <span class="price">${newItem.price}</span>
    <button class="add-to-cart">Add to cart</button>`;
    catalogue.append(item);
    $('.catalogue').find('div').addClass("Product");
    console.log(addToCartButton);
    addToCartButton[addToCartButton.length-1].addEventListener('click', newItem.addToCart)
    document.querySelector('input').value= '';
})
/*https://assets.xboxservices.com/assets/0b/28/0b2854b9-a7e7-47dd-b4f8-a371567854b2.png?n=Xbox-Series-S_Buy-Box_0_01_829x799.png */

const buyButton = document.querySelector('.buy-button');
buyButton.addEventListener("click", function(e) {
    cart.clear();
    document.querySelector('.items').innerHTML = '';
    console.log(cart);
});

const addItemButton = document.querySelector('.add-item-button');
addItemButton.addEventListener("click", function(e) {
    const textFields = document.querySelectorAll('.input')
    textFields.forEach(it => it.value = '');
});

const cards = document.querySelectorAll('.card-item');

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('mousemove', startRotate);
    card.addEventListener('mouseout', stopRotate);
}

function startRotate(event) {
    const cardItem = this.querySelector('.photo');
    const halfHeight = cardItem.offsetHeight / 2;
    const halfWidth = cardItem.offsetWidth / 2;
    cardItem.style.transform = 'rotateX(' + -(event.offsetY - halfHeight) / 15 + 'deg) rotateY(' + (event.offsetX - halfWidth) / 15 + 'deg)';
}

function stopRotate(event) {
    const cardItem = this.querySelector('.photo');
    cardItem.style.transform = 'rotateX(0)';
}
