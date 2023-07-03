const formRegister = document.querySelector("#register-id");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPass = document.querySelector("#password");
const inputPhone = document.querySelector("#phone");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(users));
}


const isEmpty = (input) => {
    return !(input.value.trim().length);
};

const isBetween = (input, min, max) => {
    return !(input.value.length >= min && input.value.length <= max);
};

const showError = (input,message) => {
    const formField = input.parentElement
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small");
    error.style.display = "block";
    error.textContent = message
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.style.display = "none";
    error.textContent = "";
};

const emailIsValid = (input) => { 
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(input.value.trim());
};

const isExistingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim());
};

const isPassSecure = (input) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(input.value.trim());
};

const isPhoneValid = (input) => {
    const re = /^[0-9]{10}$/;
    return re.test(input.value.trim());
};


const checkTextInput = (input) => {
    let valid = false;
    const minCharacters = 3;
    const maxCharacters = 16;

    //If the input is empty, the error will be shown
    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio");
        return;
    };

    //If the input doesn't have the quantity of the correct characters, the error will be shown
    if (isBetween(input,minCharacters,maxCharacters)) {
        showError(input, `Debe contener entre ${minCharacters} y ${maxCharacters} caracteres`);
        return;
    };

    //Remove error
    showSuccess(input);
    valid = true;
    return valid;
};


const checkEmail = (input) => {
    let valid = false;

    //If the input is empty, the error will be shown
    if (isEmpty(input)) {
        showError(input, "El email es obligatorio");
        return;
    };

    //If it's an email
    if (!emailIsValid(input)) {
        showError(input, "El email no es válido");
        return
    };

    //Check email doesn't exist
    if (isExistingEmail(input)) {
        showError (input, "El email ya se encuentra registrado");
        return;
    };

    showSuccess(input);
    valid = true;
    return valid;

};

const checkPassword = (input) => {
    let valid = false;
    
    if (isEmpty(input)) {
        showError(input, "La contraseña es obligatoria");
        return;
    };

    if(!isPassSecure(input)) {
        showError(input,"La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo");
        return;
    };

    showSuccess(input);
    valid = true;
    return valid;
};

const checkPhone = (input) => {
    let valid = false;

    if(isEmpty(input)) {
        showError(input, "El teléfono es obligatorio");
        return;
    };

    if (!isPhoneValid(input)) {
        showError(input, "El teléfono no es válido");
        return;
    };

    showSuccess(input);
    valid = true;
    return valid;
};


const submitHandler = (e) => {
    e.preventDefault();
    let isNameValid = checkTextInput(inputName);
    let emailIsValid = checkEmail(inputEmail);
    let isPasswordValid = checkPassword(inputPass);
    let isPhoneValid = checkPhone(inputPhone);

    let isValidForm =
    isNameValid &&
    emailIsValid &&
    isPasswordValid &&
    isPhoneValid;

    if (isValidForm) {
        users.push({
            name: inputName.value,
            email: inputEmail.value,
            password: inputPass.value,
            phone: inputPhone.value,
        });        
        saveToLocalStorage();
        alert("Has sido registrado exitosamente🎉")
        window.location.href = "../../index.html"
    };
};



const init = () => {
    formRegister.addEventListener("submit", submitHandler);
    inputName.addEventListener("input", () => checkTextInput(inputName));
    inputEmail.addEventListener("input", () => checkEmail(inputEmail));
    inputPass.addEventListener("input", () => checkPassword(inputPass));
    inputPhone.addEventListener("input", () => checkPhone(inputPhone));
};

init();