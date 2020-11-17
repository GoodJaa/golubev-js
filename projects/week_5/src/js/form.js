const api = require('./api');

async function getForm() {
    const comments = document.querySelector('[data-role=review-comment]');
    const name = document.querySelector('[data-role=review-name]');
    const place = document.querySelector('[data-role=review-place]');
    const text = document.querySelector('[data-role=review-text]');
    const button = document.querySelector('[data-role=review-add]');
    const currentDate = getDate();
    const review = {
        name: name.value,
        place: place.value,
        text: text.value,
        date: currentDate
    };

    if (!review.name || !review.place || !review.text) {
        return null;
    }

    const div = document.createElement('div');
    div.classList.add('comments__wrapper');

    div.innerHTML = `
        <div class="comments__comment">
            <div class="comment__head">
                <span class="comment__name">${ review.name }</span>
                <span class="comment__place">${ review.place }</span>
                <time class="comment__date">${ review.date }</time>
            </div>
            <div class="comment__content">
                <div>${ review.text }</div>
            </div>
        </div>
    `;

    comments.append(div);
    comments.scrollTo(0, comments.scrollHeight);

    const rebound = await api.setPlacemark(button.dataset.coords, review);

    name.value = place.value = text.value = "";

    return rebound;
}

function getDate() {
    const today = new Date();

    const dd = String(today.getUTCDay());
    const mm = String(today.getUTCMonth());
    const yyyy = String(today.getFullYear());

    const currentDate = dd + '.' + mm + '.' + yyyy;
    return currentDate;
}

module.exports = {
    getForm
};