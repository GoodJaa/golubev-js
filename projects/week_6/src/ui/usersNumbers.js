export default class UsersNumbers {
    constructor (element) {
        this.element = element;
    }

    set () {
        const users = document.querySelector('[data-role=users-list]');
        const usersCount = users.children.length;

        function setUsersNumbers(num) {
            if (num === 1) {
                return `${num} участник`;
            } else if (num > 1 && num < 5) {
                return `${num} участника`;
            } else {
                return `${num} участников`;
            }
        }

        this.element.textContent = setUsersNumbers(usersCount);
    }
}