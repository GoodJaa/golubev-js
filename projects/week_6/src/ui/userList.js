export default class UserList {
    constructor(element) {
        this.element = element;
        this.items = new Set();
    }

    buildDOM() {
        const fragment = document.createDocumentFragment();

        this.element.innerHTML = '';

        for (const name of this.items) {
            if (name !== document.querySelector('[data-role=current-user]').dataset.user) {
                const li = document.createElement('li');
            li.classList.add('user');
            li.dataset.role = 'user';
            li.innerHTML = `
            <div class="user__photo-container" 
            style="background-image: url(http://localhost:8282/mega-chat-3/photos/${name}.png?t=${Date.now()})"
            data-role="user-photo" data-user=${name}>
            </div>
            <div class="user__info">
                <div class="user__name" data-role="current-user-name">${name}</div>
                <div class="user__status">Пользователь</div>
            </div>
            `;
            fragment.append(li);
            }
        }

        this.element.append(fragment);
    }

    add(userLoginData) {
        // const loginObj = new Object({
        //     name: userLoginData.name,
        //     nickname: userLoginData.nickname
        // });
        this.items.add(userLoginData);
        this.buildDOM();
    }

    remove(userLoginData) {
        this.items.delete(userLoginData);
        this.buildDOM();
    }

    get(userLoginData) {
        return userLoginData;
    }
}