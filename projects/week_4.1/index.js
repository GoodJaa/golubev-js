/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

function getRandom(from, to) {
  return Math.round(from + Math.random() * to - from);
}

let currentDrag;
let startY = 0;
let startX = 0;

document.addEventListener('mousemove', (e) => {
  if (currentDrag) {
    currentDrag.style.top = e.clientY - startY + 'px';
    currentDrag.style.left = e.clientX - startX + 'px';
  }
});

export function createDiv() {
  const newDiv = document.createElement('div');
  newDiv.classList.add('draggable-div');

  const minSize = 20;
  const maxSize = 200;

  const divSize = getRandom(minSize, maxSize).toFixed();
  const posX = getRandom(0, window.innerWidth).toFixed();
  const posY = getRandom(0, window.innerHeight).toFixed();
  const divColor = '#' + Math.random().toString(16).substring(2, 8).toUpperCase();
  newDiv.style.cssText = `
    height: ${divSize + 'px'};
    width: ${divSize + 'px'};
    top: ${posY + 'px'};
    left: ${posX + 'px'};
    background-color: ${divColor};
    z-index: 1000;
  `;

  newDiv.addEventListener('mousedown', (e) => {
    currentDrag = newDiv;
    startX = e.offsetX;
    startY = e.offsetY;
  });

  newDiv.addEventListener('mouseup', (e) => (currentDrag = false));

  return newDiv;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
