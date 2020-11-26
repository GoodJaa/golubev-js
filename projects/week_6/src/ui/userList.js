export default class UserList {
    constructor(element) {
        this.element = element;
        this.items = new Set();
    }

    buildDOM() {
        const fragment = document.createDocumentFragment();

        this.element.innerHTML = '';

        for (const name of this.items) {
            const li = document.createElement('li');
            li.classList.add('user');
            li.dataset.role = 'user';
            li.innerHTML = `
            <div class="user__photo-container" data-role="user-photo">
            </div>
            <div class="user__info">
                <div class="user__name" data-role="current-user-name">${name}</div>
                <div class="user__status">Пользователь</div>
            </div>
            `;

            fragment.append(li);
        }

        this.element.append(fragment);
    }

    add(userLoginData) {
        this.items.add(userLoginData.name);
        this.buildDOM();
    }

    remove(userLoginData) {
        this.items.delete(userLoginData.name);
        this.buildDOM();
    }

    get(userLoginData) {
        console.log(userLoginData.nickname);
        return userLoginData.nickname;
    }
}