export default class UsersNumbers {
    constructor (element) {
        this.element = element;
    }

    set () {
        const users = document.querySelector('[data-role=users-list]');
        const usersCount = users.children.length;

        function setUsersNumbers(num) {
            if (num === 0) {
                return `${num + 1} участник`;
            } else if (num > 0 && num < 4) {
                return `${num + 1} участника`;
            } else {
                return `${num + 1} участников`;
            }
        }

        this.element.textContent = setUsersNumbers(usersCount);
    }
}