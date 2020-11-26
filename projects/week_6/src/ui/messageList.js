export default class MessageList {
    constructor (element) {
        this.element = element;
    }

    add (from, text) {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, 0);
        const minutes = String(date.getMinutes()).padStart(2, 0);
        const time = `${hours}:${minutes}`;
        const item = document.createElement('li');

        item.classList.add('message__item-container');
        item.dataset.user = `${from.nickname}`;
        item.innerHTML = `
        <div class="message__item">
            <div class="message__item-left user__photo-container user__photo-container--small" data-tole='user-photo' data-user=${from.nickname}>
            </div>
            <div class="message__item-right">
                <div class="message__item-text">${text}</div>
                <div class="message__item-time">${time}</div>
            </div>
        </div>
        `;

        this.element.append(item);
        this.element.scrollTop = this.element.scrollHeqight;
    }

    addSystemMessage(message) {
        const item = document.createElement('li');

        item.classList.add('message__item', 'message__item-system');
        item.textContent = message;

        this.element.append(item);
        this.element.scrollTop = this.element.scrollHeqight;
    }

    // messageFilter(from) {
        
    //     function observeMessages(messageList) {
    //         const observer = new MutationObserver((mutations) => {
    //             mutations.forEach((mutation) => {
    //                 if (mutation.type === 'childList') {
    //                     console.log(mutation.dataset.user);
    //                 }
    //             });
    //         });

    //         observer.observe(messageList, {childList: true, subtree:false});
    //     }

    //     observeMessages(this.element);

    //     function filter (mutation) {
    //         if ()
    //     }
}