export default class UserData {
    constructor(element) {
        this.element = element;
    }

    set(userLoginData) {
        this.data = userLoginData;
        this.element.textContent = userLoginData.name;
        document.querySelector('[data-role=current-user]').dataset.user = userLoginData.name;
    }

    get() {
        const dataUser = this.data;
        return dataUser.name;
    }
}