export default class MessageSender {
    constructor (element, onSend) {
        this.onSend = onSend;
        this.messageInput = element.querySelector('[data-role=message-input]');
        this.sendButton = element.querySelector('[data-role=message-send-btn]');

        this.sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            const message = this.messageInput.value.trim();

            if(message) {
                this.onSend(message);
            }
        });
    }

    clear() {
        this.messageInput.value = '';
    }
}