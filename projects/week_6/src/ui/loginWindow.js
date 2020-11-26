export default class LoginWindow {
    constructor(element, loginSubmit) {
        this.element = element;
        this.loginSubmit = loginSubmit;

        const form = element.querySelector('#validate-form');
        const name = element.querySelector('[data-role=login-name-input]');
        const nickname = element.querySelector('[data-role=login-nickname-input]');
        const submitButton = element.querySelector('[data-role=login-submit]');

        const validateFields = function (form, validateArray) {
            validateArray.forEach((field) => {
                field.classList.remove('input-error');
                if (field.value.trim() === "") {
                    field.classList.add('input-error');
                }
            });

            const errorFields = form.querySelectorAll('.input-error');

            return errorFields.length === 0;
        };

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            const loginArr = [name, nickname];
            const isValid = validateFields(form, loginArr);
            let userLoginData;

            if (isValid) {
                userLoginData = {
                    name: name.value,
                    nickname: nickname.value,
                };
                this.loginSubmit(userLoginData);
            }
        });
    }

    show() {
        this.element.classList.remove('hidden');
    }

    hide() {
        this.element.classList.add('hidden');
    }
}