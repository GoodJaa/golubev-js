export default class UploadPhoto {
    constructor (avatar, photoBox, onUpload) {
        this.avatar = avatar;
        this.photoBox = photoBox;
        this.onUpload = onUpload;

        const loadPhotoModal = document.querySelector('[data-role=load-foto-modal]');
        const fileInput = this.photoBox.querySelector('.load-photo__fileinput');
        const saveBtn = document.querySelector('[data-role=load-photo-btn-save]');
        const cancelBtn = document.querySelector('[data-role=load-photo-btn-cancel]');

        const array = new Array(this.avatar, this.photoBox);
        const btnArray = new Array(saveBtn, cancelBtn);

        array.forEach((element) => {
            element.addEventListener('dragover', (e) => {
                if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file') {
                    e.preventDefault();
                }
            });

            element.addEventListener('drop', (e) => {
                const file = e.dataTransfer.items[0].getAsFile();
                const reader = new FileReader();

                reader.readAsDataURL(file);
                reader.addEventListener('load', () => {
                    if (element === this.avatar) {
                        this.onUpload(reader.result);
                    } else {
                        element.style.backgroundImage =`url(${reader.result})`;
                        fileInput.classList.add('hidden');
                        this.readerResult = reader.result;
                    }
                });
                e.preventDefault();
            });
        });

        btnArray.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                if (btn === saveBtn) {
                    if (this.readerResult) {
                        this.onUpload(this.readerResult);
                    }
                }

                loadPhotoModal.classList.add('hidden');
                fileInput.classList.remove('hidden');
                this.photoBox.style.backgroundImage = 'none';
            });
        });

        this.avatar.addEventListener('click', (e) => {
            loadPhotoModal.classList.remove('hidden');
        });
    }

    set(photo) {
        this.avatar.style.backgroundImage = `url(${photo})`;
    }
}