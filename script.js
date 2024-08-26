// Declear the variable for Cart icon and Close Icon
const btnCart = document.querySelector('.fa-cart-shopping');
const cart = document.querySelector('.carts');
const btnClose = document.getElementById('close');


/* Cart button activate */
btnCart.addEventListener('click', () => {
    cart.classList.add('carts-active');
});

/* Cart close button */
btnClose.addEventListener('click', () => {
    cart.classList.remove('carts-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
    loadContent();
}

// Main function
function loadContent() {
    let btnRemove = document.querySelectorAll('#cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    /* Cart quantity */
    let qtyElements = document.querySelectorAll('.cart-qulty');
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    /* Add to cart */
    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });

    // Update total
    updateTotal();
}

/* Cart items remove */
function removeItem() {
    if (confirm('ARE YOU SURE TO REMOVE')) {
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList = itemList.filter(el => el.title != title);
        this.parentElement.remove();
        loadContent();
    }
}

/* Cart quantity */
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent();
}

let itemList = [];

/* Add to cart */
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;

    let newProduct = { title, price, imgSrc };

    // Check if the product is already in the cart
    if (itemList.find(el => el.title == newProduct.title)) {
        alert("Product already added to cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = createCartProducts(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}

//Creating cart //
function createCartProducts(title, price, imgSrc) {

    return `
        <div class="cart-box">
            <img src="${imgSrc}" class="cart-img">
            <div class="detail-box">
                <div class="cart-food-title"><b>${title}</b></div> 
                <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amt">${price}</div>
                </div>
                <input type="number" value="1" class="cart-qulty">   
            </div>   
                <i class="fa-solid fa-trash" id="cart-remove"></i>
        </div>`;
}

function updateTotal() {
    const cartItems = document.querySelectorAll(".cart-box");
    const totalValue = document.querySelector(".total-price");

    let total = 0;
    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector('.cart-qulty').value;
        total += (price * qty);
        product.querySelector(".cart-amt").innerText = "Rs." + price * qty;
    });
    totalValue.innerHTML = "Rs." + total;


    // Add product count
    const cartCount = document.querySelector(".cart-count");
    let count = itemList.length;
    cartCount.innerHTML = count;

    if (count == 0) {
        cartCount.style.display = "none"
    }
    else {
        cartCount.style.display = "block"
    }
}
function showalert() {
    alert("THANK YOU FOR PLACING ORDER YOUR FOOD REACH SOON...")
}


