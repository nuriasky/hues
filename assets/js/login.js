const loginForm = document.querySelector("#login-id");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const errorMessage = document.querySelector("#form-error");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToSessionStorage = (user) => {
    sessionStorage.setItem("activeUser", JSON.stringify(user))
}


const isEmpty = (input) => {
    return !(input.value.trim().length);
};

const showError = (message) => {
    errorMessage.textContent = message;
};

const isExistingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim());
};

const isMatchingPass = () => {
    const user = users.find((user) => user.email === inputEmail.value.trim());
    return user.password === inputPassword.value.trim();
};


const isValidAccount = () => {
    let valid = false;

    if(isEmpty(inputEmail)) {
        showError("Por favor, complete los campos");
        return;
    };

    if(isEmpty(inputPassword)) {
        showError("Por favor, complete los campos");
        return;
    };

    if(!isExistingEmail(inputEmail)) {
        showError("Los datos ingresados no son válidos");
        return;
    };

    if(!isMatchingPass()) {
        showError("La contraseña y el email no coinciden");
        return;
    };

    valid = true;
    errorMessage.textContent = "";
    return valid;
};



const login = (e) => {
    e.preventDefault();

    if(isValidAccount()) {
        const user = users.find((user) => user.email === inputEmail.value.trim());
        saveToSessionStorage(user);
        window.location.href = "../../index.html";
    };
};



const init = () => {
    loginForm.addEventListener("submit", login)
};
init();