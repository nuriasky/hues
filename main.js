const header = document.querySelector(".header");
const contenedorGeneradora = document.querySelector(".product-card")


const scrollHeader = () => {
    if (window.scrollY > 450) {
        header.style.background = "black";
        } else {
        header.style.background = "transparent";
        }
}


const init = () => {
    window.addEventListener("scroll", scrollHeader);
};

init();



//ESTO DEBERIA IR EN OTRO ARCHIVO, DEBES MOVERLO
const productos = [
    {
        id: 1,
        nombre: "Pantalón Palazzo",
        precio: 12300,
        category: "jeans",
        stock: true,
        image:"./assets/products/pantalon-palazzo.png",
    },

    {
        id: 2,
        nombre: "Falda Pleated",
        precio: 8200,
        category: "faldas",
        stock: true,
        image:"./assets/products/falda-pleated.png",
    },

    {
        id: 3,
        nombre: "Top Blue",
        precio: 2000,
        category: "camisas y tops",
        stock: true,
        image:"./assets/products/top-blue.png",
    },

    {
        id: 4,
        nombre: "Falda Denim",
        precio: 18200,
        category: "faldas",
        stock: true,
        image:"./assets/products/falda-denim.png",
    },

    {
        id: 5,
        nombre: "Leather Campera Negra",
        precio: 35000,
        category: "buzos y camperas",
        stock: true,
        image:"./assets/products/leather campera.png",
    },

    {
        id: 6,
        nombre: "Blazer Beige",
        precio: 17000,
        category: "buzos y camperas",
        stock: true,
        image:"./assets/products/blazer-beige.png",
    },
]




const createCardTemplate = (product) => {
    const {image, nombre, precio} = product;

    return `
        <div class="card">
            <img src="${image}">
            <h3 class="card-title">${nombre}</h3>
            <p>$${precio}</p>
            <button class="card-button">añadir al carrito</button>
        </div>
    `
};

const cardsTemplate = productos.map(createCardTemplate).join("");

contenedorGeneradora.innerHTML = cardsTemplate;