window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
        if (window.scrollY > 450) {
        header.style.background = "black";
        } else {
        header.style.background = "transparent";
        }
});


const productos = [
    {
        nombre: "Pantalón Palazzo",
        precio: 12300,
        stock: true,
        image:"./assets/products/pantalon-palazzo.png",
    },

    {
        nombre: "Falda Pleated",
        precio: 8200,
        stock: true,
        image:"./assets/products/falda-pleated.png",
    },

    {
        nombre: "Top Blue",
        precio: 2000,
        stock: true,
        image:"./assets/products/top-blue.png",
    },

    {
        nombre: "Falda Denim",
        precio: 18200,
        stock: true,
        image:"./assets/products/falda-denim.png",
    },

    {
        nombre: "Leather Campera Negra",
        precio: 35000,
        stock: true,
        image:"./assets/products/leather campera.png",
    },
    
    {
        nombre: "Leather Campera Negra",
        precio: 35000,
        stock: true,
        image:"./assets/products/leather campera.png",
    },
]


const contenedorGeneradora = document.querySelector(".product-card")

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