export default class UserData {
    constructor(element) {
        this.element = element;
    }

    set(name) {
        this.name = name;
    }

    get() {
        const dataUser = this.name;
        return dataUser.nickname;
    }
}