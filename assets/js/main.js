const header = document.querySelector(".header");
const productsContainer = document.querySelector(".products-card");
const buttonLoad = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".cards-categories");
const categoriesList = document.querySelectorAll(".category");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart")
const menuBtn = document.querySelector(".burger-menu");
const navbarMenu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const cartProducts = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const successModal = document.querySelector(".add-modal");
const btnBuy = document.querySelector(".btn-buy")
const btnDelete = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};


const scrollHeader = () => {
    if (window.scrollY > 450) {
        header.style.background = "black";
        return;
    }; 
    header.style.background = "transparent";
};


//Products cards - CARDS SECTION
const createCardTemplate = (product) => {
    const {id, image, name, price} = product;

    return `
    <div class="card">
            <img src=${image}>
        <div class="info-card">
            <div class="title-card">
                <h3>${name}</h3>
            </div>
            <div class="price-card">
                <p>$${price}</p>
            </div>
        </div>

        <button
            class="btn-add"
            data-id="${id}"
            data-name="${name}"
            data-price="${price}"
            data-image="${image}"
            >
            añadir al carrito
        </button>
    </div>
    `
};

const renderCardsProducts = (productsList) => {
    productsContainer.innerHTML += productsList.map(createCardTemplate).join("");
}; 

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit -1;
};


const showMoreCardsProducts = () => {
    appState.currentProductsIndex += 1;
    let {products, currentProductsIndex} = appState;
    renderCardsProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        buttonLoad.classList.add("hidden");
    };
};


//Function filter - CARDS SECTION
const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") &&
        !element.classList.contains("active")
    );
};



const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        };
        categoryBtn.classList.add("active")
    });
};

const setShowMoreVisibility = () => {
    if(!appState.activeFilter) {
        buttonLoad.classList.remove("hidden");
        return;
    };
    buttonLoad.classList.add("hidden");
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisibility();
};

const renderFilteredProducts = () => {
    const filteredProducts = products.filter((product) => {
        return product.category === appState.activeFilter
    });
    renderCardsProducts(filteredProducts);
}

const applyFilter = ({target}) => {

    if(!isInactiveFilterBtn(target)) {
        return
    };

    changeFilterState(target);

    productsContainer.innerHTML = "";
    if (appState.activeFilter) {
        renderFilteredProducts()
        appState.currentProductsIndex = 0;
        return;
    };
    
    renderCardsProducts(appState.products[0]);
};




const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (navbarMenu.classList.contains("open-menu")) {
        navbarMenu.classList.remove("open-menu");
        return;
    };
    overlay.classList.toggle("show-overlay")
}

const toggleMenu = () => {
    navbarMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    };
    overlay.classList.toggle("show-overlay")
}

const closeOnScroll = () => {
    if (
        !navbarMenu.classList.contains("open-menu") && !cartMenu.classList.contains("open-cart")
    ) {
        return;
    }
    navbarMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
}

const closeOnClick = (e) => {
    if (!e.target.classList.contains("navbar-link")) {
        return;
    };
    navbarMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
	navbarMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};


        //CART LOGIC

const createProductCartTemplate = (productCart) => {
    const {id, image, name, price, quantity} = productCart;
    return `
    <div class="cart-item">
        <img src=${image} alt="">
        <div class="item-info">
            <h3 class="item-title">${name}</h3>
            <span class="item-price">$${price}</span>
        </div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div> 
    `
};

const renderCart = () => {
    if (!cart.length) {
        cartProducts.innerHTML = `<p class="empty-msg">Tu carrito de compras está vacío.</p>`;
        return;
    };
    cartProducts.innerHTML = cart.map(createProductCartTemplate).join("")
};

const getCartTotal = () => {
    return cart.reduce((acc , val) => {
        return acc + Number(val.price) * Number(val.quantity);
    }, 0);
};

const showCartTotal = () => {
    total.innerHTML = `$${getCartTotal().toFixed(1)}`;
};


const createProductData = (product) => {
    const {id, name, price, image} = product;
    return {id, name, price, image};
};

const isExistingProductCart = (product) => {
    return cart.find((item) => {
        return item.id === product.id;
    });
};

const addUnitToProduct = (product) => {
    cart.map((productCart) => {
        return productCart.id === product.id
        ? { ...productCart, quantity: productCart.quantity + 1 }
        : productCart
    });
};

const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;

    setTimeout(() => {
        successModal.classList.remove("active-modal");
    }, 1500);
};

const createProductCart = (product) => {
    cart = [
        ...cart,
        {
            ...product,
            quantity: 1,
        }
    ];
};

const disableBtn = (btn) => {
    if(!cart.length) {
        btn.classList.add("disabled");
        return;
    }
    btn.classList.remove("disabled")
};

const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, val) => {
        return acc + val.quantity
    }, 0);
};


const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
    disableBtn(btnBuy);
    disableBtn(btnDelete);
    renderCartBubble();
};


const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) {
        return;
    };
    const product = createProductData(e.target.dataset);

    //Si el producto ya existe...
    if(isExistingProductCart(product)) {
        //Agregamos unidad al producto
        addUnitToProduct(product);
        //Feedback
        showSuccessModal("Una unidad del producto ha sido agregado al carrito");
    } else { //Si el producto NO existe
        //Creamos el nuevo producto en el array
        createProductCart(product);
        //Feedback
        showSuccessModal("El producto ha sido agregado al carrito");
    };
    //Actualizar data del carrito
    updateCartState();

};


const init = () => {
    window.addEventListener("scroll", scrollHeader);
    renderCardsProducts(appState.products[appState.currentProductsIndex]);
    buttonLoad.addEventListener("click", showMoreCardsProducts);
    categoriesContainer.addEventListener("click", applyFilter);
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeOnScroll);
    navbarMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    productsContainer.addEventListener("click", addProduct)
    disableBtn(btnBuy);
    disableBtn(btnDelete);
    renderCartBubble();
};

init();