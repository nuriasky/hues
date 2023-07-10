const header = document.querySelector(".header");
const productsContainer = document.querySelector(".product-card");
const buttonLoad = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".cards-categories");
const categoriesList = document.querySelectorAll(".category");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart")
const menuBtn = document.querySelector(".burger-menu");
const navbarMenu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const cartProducts = document.querySelector(".cart-container");


let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify())
}


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
            data-img="${image}"
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

const renderFilteredPRoducts = () => {
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
        renderFilteredPRoducts()
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
    const {id, name, price, image, quantity} = productCart;
    return `
    <div class="cart-item">
        <img
            src=${image}
            alt=${name}/>
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
}

const renderCart = () => {
    if (!cart.length) {
        cartProducts.innerHTML = `<p class="empty-msg">Tu carrito de compras está vacío.</p>`;
        return;
    };
    cartProducts.innerHTML = cart.map(createProductCartTemplate).join("")
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
    document.addEventListener("DOMContentLoaded", renderCart)
};

init();