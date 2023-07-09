const products = [
    {
        id: 1,
        name: "Pantalón Palazzo",
        price: 12300,
        category: "jeans",
        image:"./assets/products/pantalon-palazzo.png",
    },

    {
        id: 2,
        name: "Falda Pleated",
        price: 8200,
        category: "faldas",
        image:"./assets/products/falda-pleated.png",
    },

    {
        id: 3,
        name: "Top Blue",
        price: 2000,
        category: "camisas y tops",
        image:"./assets/products/top-blue.png",
    },

    {
        id: 4,
        name: "Falda Denim",
        price: 18200,
        category: "faldas",
        image:"./assets/products/falda-denim.png",
    },

    {
        id: 5,
        name: "Leather Campera Negra",
        price: 35000,
        category: "abrigos y camperas",
        image:"./assets/products/leather-campera.png",
    },

    {
        id: 6,
        name: "Blazer Beige",
        price: 17000,
        category: "abrigos y camperas",
        image:"./assets/products/blazer-beige.png",
    },

    {
        id: 7,
        name: "Chaleco Suit Black",
        price: 8300,
        category: "camisas y tops",
        image:"./assets/products/chaleco-blazer.png",
    },

    {
        id: 8,
        name: "Wide leg Jean Orange",
        price: 19700,
        category: "jeans",
        image:"./assets/products/pantalon-orange.png",
    },

    {
        id: 9,
        name: "Draped Body Black",
        price: 12400,
        category: "camisas y tops",
        image:"./assets/products/body-black.png",
    },

    {
        id: 10,
        name: "V-Neck Blouse",
        price: 11300,
        category: "camisas y tops",
        image:"./assets/products/camisa-neck.png",
    },

    {
        id: 11,
        name: "Camisa Pink Girl",
        price: 7200,
        category: "camisas y tops",
        image:"./assets/products/pink-shirt.png",
    },

    {
        id: 12,
        name: "Beaded Sweater",
        price: 23300,
        category: "abrigos y camperas",
        image:"./assets/products/beaded-sweater.png",
    },

    {
        id: 13,
        name: "Shacket Black",
        price: 11800,
        category: "abrigos y camperas",
        image:"./assets/products/shacket-black.png",
    },

    {
        id: 14,
        name: "Twill Jacket",
        price: 18600,
        category: "abrigos y camperas",
        image:"./assets/products/twill-jacket.png",
    },

    {
        id: 15,
        name: "RACE Jacket",
        price: 22400,
        category: "abrigos y camperas",
        image:"./assets/products/race-jacket.png",
    },

    {
        id: 16,
        name: "Falda Pearl",
        price: 7800,
        category: "faldas",
        image:"./assets/products/pearl-skirt.png",
    },

    {
        id: 17,
        name: " Falda Long Pleated",
        price: 10300,
        category: "faldas",
        image:"./assets/products/pleated-skirt.png",
    },

    {
        id: 18,
        name: "T-shirt Oversized",
        price: 7800,
        category: "camisas y tops",
        image:"./assets/products/oversized-tshirt.png",
    },
];


const showProductsInParts = (size) => {
    let productsList = [];
    for (let i = 0; i < products.length; i+= size) {
        productsList.push(products.slice(i, i + size));
    };
    return productsList;
};

const appState = {
    products: showProductsInParts(6),
    currentProductsIndex: 0,
    productsLimit: showProductsInParts(6).length,
    activeFilter: null,
};