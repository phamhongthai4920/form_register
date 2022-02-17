let username = document.querySelector('#username');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let confirmPassword = document.querySelector('#confirm-password');
let form = document.querySelector('form');


function run() {
    validate();
}
run();


function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.add('error');
    small.innerText = message;
}

function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.remove('error');
    small.innerText = '';
}

function checkEmptyError(listInput) {
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim();
        if (!input.value) {
            isEmptyError = true;
            showError(input, 'Không được để trống');
        } else {
            showSuccess(input);
        }
    })
    return isEmptyError;
}

function checkEmailError(input) {
    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    input.value = input.value.trim();

    let isEmailError = !emailRegex.test(input.value);

    isEmailError ? showError(input, 'Sai định dạng Email') : showSuccess(input);

    return isEmailError;
}

function checkPasswordError(input) {
    var passwordRegex = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
    input.value = input.value.trim();
    let isPasswordError = !passwordRegex.test(input.value);
    isPasswordError ? showError(input, 'Mật khẩu phải đảm bảo: độ dài 6-16 ký tự, có ít nhất 1 chữ cái (a-z hoặc A-Z) và 1 chữ số')
        : showSuccess(input);
    return isPasswordError;

}
function checkLengthError(input, min, max) {
    input.value = input.value.trim();
    if (input.value.length < min) {
        showError(input, `Phải có ít nhất ${min} ký tự`)
        return true
    }

    if (input.value.length > max) {
        showError(input, `Không được vượt quá ${max} ký tự`)
        return true
    }

    return false;
}
function checkPasswordMatchError(password, confirmPassword) {
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Mật khẩu không trùng khớp')
        return true;
    }
    return false;
}

function validate() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isEmptyError = checkEmptyError([username, email, password, confirmPassword]);
        let isEmailError = checkEmailError(email);
        let isPasswordError = checkPasswordError(password);
        let isUsernameLengthError = checkLengthError(username, 3, 12);
        checkPasswordMatchError(password, confirmPassword);
    })
}