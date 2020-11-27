import MainWindow from "./ui/mainWindow";
import LoginWindow from "./ui/loginWindow";
import Userdata from "./ui/userData";
import UserList from "./ui/userList";
import UsersNumbers from "./ui/usersNumbers";
import WSClient from "./wsClient";
import MessageList from "./ui/messageList";
import MessageSender from "./ui/messageSender";
import UploadPhoto from "./ui/uploadPhoto";
import PhotoBox from "./ui/photoBox";

export default class EnterChat {
    constructor() {
        this.wsClient = new WSClient(
            `ws://localhost:8282/enter-chat/ws`,
            this.onMessage.bind(this)
        );

        this.ui = {
            loginWindow: new LoginWindow(
                document.querySelector('#login'),
                this.loginSubmit.bind(this)
            ),
            mainWindow: new MainWindow(
                document.querySelector('#chat')
            ),
            userData: new Userdata(
                document.querySelector('[data-role=current-user-name]')
            ),
            usersNumbers: new UsersNumbers(
                document.querySelector('[data-role=users-numbers]')
            ),
            userList: new UserList(
                document.querySelector('[data-role=users-list]')
            ),
            messageList: new MessageList(
                document.querySelector('[data-role=message-list]')
            ),
            messageSender: new MessageSender(
                document.querySelector('[data-role=message-sender]'),
                this.onSend.bind(this)
            ),
            uploadPhoto: new UploadPhoto(
                document.querySelector('[data-role=user-photo]'),
                document.querySelector('[data-role=file-container'),
                this.onUpload.bind(this)
            )
        };

        this.ui.loginWindow.show();
    }

    onUpload(data) {
        this.ui.uploadPhoto.set(data);

        fetch('http://localhost:8282/enter-chat/upload-photo', {
            method: 'POST',
            body: JSON.stringify({
                name: this.ui.userData.get(),
                image: data,
            })
        });

    }

    onSend(message) {
        this.wsClient.sendTextMessage(message);
        this.ui.messageSender.clear();
    }

    async loginSubmit(userLoginData) {
        await this.wsClient.connect();
        this.wsClient.sendHello(userLoginData.name);
        this.ui.userData.set(userLoginData);
        this.ui.loginWindow.hide();
        this.ui.mainWindow.show();
        this.ui.usersNumbers.set();
        this.ui.uploadPhoto.set(`http://localhost:8282/enter-chat/photos/${userLoginData.name}.png?t=${Date.now()}`);
    }

    onMessage({ type, from, data }) {
        console.log(type, from, data);

        if (type === 'hello') {
            this.ui.userList.add(from);
            this.ui.messageList.addSystemMessage(`${from} вошел в чат`);
        } else if (type === 'user-list') {
            for (const item of data) {
                this.ui.userList.add(item);
            }
        } else if (type === 'bye-bye') {
            this.ui.userList.remove(from);
            this.ui.messageList.addSystemMessage(`${from} вышел и чата`);
        } else if (type === 'text-message') {
            this.ui.messageList.add(from, data.message);
        } else if (type === 'photo-changed') {
            const avatars = document.querySelectorAll(
                `[data-role=user-photo][data-user="${data.name}"]`
            );

            for (const avatar of avatars) {
                avatar.style.backgroundImage = `url(http://localhost:8282/enter-chat/photos/${data.name}.png?t=${Date.now()})`;
            }
        }

        if (type !== 'text-message') {
            this.ui.usersNumbers.set();
        }
    }
}