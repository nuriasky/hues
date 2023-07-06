const header = document.querySelector(".header");
const productsContainer = document.querySelector(".product-card");
const buttonLoad = document.querySelector(".btn-load");


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
        <div class="img-card">
            <img src=${image}>
        </div>
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
}


const showMoreCardsProducts = () => {
    appState.currentProductsIndex += 1;
    let {products, currentProductsIndex} = appState;
    renderCardsProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        buttonLoad.classList.add("hidden");
    }
}




const init = () => {
    window.addEventListener("scroll", scrollHeader);
    renderCardsProducts(appState.products[appState.currentProductsIndex]);
    buttonLoad.addEventListener("click", showMoreCardsProducts)
};

init();