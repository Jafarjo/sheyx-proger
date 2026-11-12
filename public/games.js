'use strict';

const gameQuestions = {
  ru: {
    output: [
      { prompt: 'Что покажет программа?', code: 'let score = 2;\nscore += 3;\nconsole.log(score);', options: ['5', '23', 'Ошибка'], answer: 0, explanation: 'Оператор += прибавляет 3 к 2, поэтому результат — 5.' },
      { prompt: 'Что напечатает Python?', code: 'print(2 ** 3)', options: ['6', '8', '9'], answer: 1, explanation: 'Оператор ** возводит число в степень: 2 × 2 × 2 = 8.' },
      { prompt: 'Сколько элементов будет в массиве?', code: 'const colors = ["blue"];\ncolors.push("gold");\nconsole.log(colors.length);', options: ['1', '2', '3'], answer: 1, explanation: 'В массив добавили второй цвет, поэтому длина равна 2.' },
      { prompt: 'Какие числа выведет цикл?', code: 'for i in range(3):\n    print(i)', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3'], answer: 1, explanation: 'range(3) начинает с 0 и не включает верхнюю границу 3.' }
    ],
    debug: [
      { prompt: 'Как исправить проверку равенства?', code: 'if (score = 10) {\n  console.log("Победа");\n}', options: ['Заменить = на ===', 'Удалить скобки', 'Заменить if на for'], answer: 0, explanation: 'В условии === проверяет равенство. Один знак = присваивает значение.' },
      { prompt: 'Чего не хватает в условии Python?', code: 'if score > 0\n    print("Есть очки")', options: ['Двоеточия после условия', 'Точки с запятой', 'Круглых скобок вокруг print'], answer: 0, explanation: 'После условия if в Python ставится двоеточие.' },
      { prompt: 'Почему кнопка не найдена?', code: 'document.querySelector("menu")', options: ['Для класса нужен селектор .menu', 'querySelector работает только с числами', 'Нужно написать print вместо querySelector'], answer: 0, explanation: 'Строка "menu" ищет HTML-тег <menu>. Для класса menu селектор пишется ".menu".' },
      { prompt: 'Как исправить тело цикла?', code: 'for item in items:\nprint(item)', options: ['Сделать отступ перед print', 'Удалить двоеточие', 'Заменить for на if'], answer: 0, explanation: 'Python использует отступы, чтобы обозначить строки внутри цикла.' }
    ],
    html: [
      { prompt: 'Какой тег подходит для обычного абзаца?', code: '', options: ['<p>', '<h1>', '<img>'], answer: 0, explanation: 'Тег <p> обозначает абзац текста.' },
      { prompt: 'Как создать ссылку на другую страницу?', code: '', options: ['<a href="/learn.html">Курсы</a>', '<link>Курсы</link>', '<url>Курсы</url>'], answer: 0, explanation: 'Для ссылки используют <a>, а адрес указывают в атрибуте href.' },
      { prompt: 'Какой тег добавляет изображение?', code: '', options: ['<img src="photo.jpg" alt="Фото">', '<picture>photo.jpg</picture>', '<image>Фото</image>'], answer: 0, explanation: 'Тег <img> показывает изображение; атрибут alt описывает его.' },
      { prompt: 'Какие теги создают маркированный список?', code: '', options: ['<ul> и <li>', '<table> и <tr>', '<p> и <br>'], answer: 0, explanation: '<ul> задаёт список, а каждый его пункт размещают в <li>.' }
    ]
  },
  en: {
    output: [
      { prompt: 'What does this program print?', code: 'let score = 2;\nscore += 3;\nconsole.log(score);', options: ['5', '23', 'An error'], answer: 0, explanation: 'The += operator adds 3 to 2, so the result is 5.' },
      { prompt: 'What does Python print?', code: 'print(2 ** 3)', options: ['6', '8', '9'], answer: 1, explanation: 'The ** operator raises a number to a power: 2 × 2 × 2 = 8.' },
      { prompt: 'How many items are in the array?', code: 'const colors = ["blue"];\ncolors.push("gold");\nconsole.log(colors.length);', options: ['1', '2', '3'], answer: 1, explanation: 'A second color was added, so the array length is 2.' },
      { prompt: 'Which numbers does the loop print?', code: 'for i in range(3):\n    print(i)', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3'], answer: 1, explanation: 'range(3) starts at 0 and excludes its upper bound, 3.' }
    ],
    debug: [
      { prompt: 'How should this equality check be fixed?', code: 'if (score = 10) {\n  console.log("Win");\n}', options: ['Replace = with ===', 'Remove the parentheses', 'Replace if with for'], answer: 0, explanation: 'Use === to test equality. A single = assigns a value.' },
      { prompt: 'What is missing from this Python condition?', code: 'if score > 0\n    print("Points!")', options: ['A colon after the condition', 'A semicolon', 'Parentheses around print'], answer: 0, explanation: 'Python requires a colon after an if condition.' },
      { prompt: 'Why is the button not found?', code: 'document.querySelector("menu")', options: ['Use .menu to select a class', 'querySelector only accepts numbers', 'Use print instead'], answer: 0, explanation: '"menu" selects a <menu> tag. A class named menu needs the selector ".menu".' },
      { prompt: 'How should the loop body be fixed?', code: 'for item in items:\nprint(item)', options: ['Indent the print line', 'Remove the colon', 'Replace for with if'], answer: 0, explanation: 'Python uses indentation to mark statements inside a loop.' }
    ],
    html: [
      { prompt: 'Which tag is used for a regular paragraph?', code: '', options: ['<p>', '<h1>', '<img>'], answer: 0, explanation: 'The <p> tag represents a paragraph.' },
      { prompt: 'How do you link to another page?', code: '', options: ['<a href="/learn.html">Courses</a>', '<link>Courses</link>', '<url>Courses</url>'], answer: 0, explanation: 'Use <a> for a link and put its address in the href attribute.' },
      { prompt: 'Which tag adds an image?', code: '', options: ['<img src="photo.jpg" alt="Photo">', '<picture>photo.jpg</picture>', '<image>Photo</image>'], answer: 0, explanation: 'The <img> tag displays an image; alt describes it.' },
      { prompt: 'Which tags create an unordered list?', code: '', options: ['<ul> and <li>', '<table> and <tr>', '<p> and <br>'], answer: 0, explanation: '<ul> creates the list, and each item goes inside <li>.' }
    ]
  },
  tg: {
    output: [
      { prompt: 'Ин барнома чӣ нишон медиҳад?', code: 'let score = 2;\nscore += 3;\nconsole.log(score);', options: ['5', '23', 'Хато'], answer: 0, explanation: 'Оператори += ба 2 адади 3-ро ҷамъ мекунад, натиҷа 5 аст.' },
      { prompt: 'Python чӣ чоп мекунад?', code: 'print(2 ** 3)', options: ['6', '8', '9'], answer: 1, explanation: 'Оператори ** ададро ба дараҷа мебардорад: 2 × 2 × 2 = 8.' },
      { prompt: 'Дар массив чанд унсур мемонад?', code: 'const colors = ["blue"];\ncolors.push("gold");\nconsole.log(colors.length);', options: ['1', '2', '3'], answer: 1, explanation: 'Ранги дуюм илова шуд, бинобар ин дарозии массив 2 аст.' },
      { prompt: 'Давр кадом ададҳоро нишон медиҳад?', code: 'for i in range(3):\n    print(i)', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3'], answer: 1, explanation: 'range(3) аз 0 сар шуда, ҳудуди болоии 3-ро дар бар намегирад.' }
    ],
    debug: [
      { prompt: 'Чӣ гуна санҷиши баробариро ислоҳ мекунем?', code: 'if (score = 10) {\n  console.log("Ғолиб");\n}', options: ['= -ро ба === иваз кунед', 'Қавсҳоро нест кунед', 'if-ро ба for иваз кунед'], answer: 0, explanation: 'Барои санҷиши баробарӣ === истифода мешавад. Як аломати = қиматро таъин мекунад.' },
      { prompt: 'Дар шарти Python чӣ намерасад?', code: 'if score > 0\n    print("Хол ҳаст")', options: ['Ду нуқта баъди шарт', 'Нуқтавергул', 'Қавс гирди print'], answer: 0, explanation: 'Дар Python баъди шарти if ду нуқта гузошта мешавад.' },
      { prompt: 'Чаро тугма ёфт нашуд?', code: 'document.querySelector("menu")', options: ['Барои синф .menu нависед', 'querySelector танҳо адад мегирад', 'Ба ҷои он print нависед'], answer: 0, explanation: '"menu" теги <menu>-ро меҷӯяд. Барои синфи menu интихобкунандаи ".menu" лозим аст.' },
      { prompt: 'Қисми дохили даврро чӣ гуна ислоҳ мекунем?', code: 'for item in items:\nprint(item)', options: ['Пеши print фосила гузоред', 'Ду нуқтаро нест кунед', 'for-ро ба if иваз кунед'], answer: 0, explanation: 'Дар Python фосила сатрҳои дохили даврро нишон медиҳад.' }
    ],
    html: [
      { prompt: 'Барои сархати оддӣ кадом тег мувофиқ аст?', code: '', options: ['<p>', '<h1>', '<img>'], answer: 0, explanation: 'Теги <p> сархатро муайян мекунад.' },
      { prompt: 'Ба саҳифаи дигар чӣ гуна пайванд сохтан мумкин аст?', code: '', options: ['<a href="/learn.html">Курсҳо</a>', '<link>Курсҳо</link>', '<url>Курсҳо</url>'], answer: 0, explanation: 'Барои пайванд <a> ва барои суроға атрибути href истифода мешавад.' },
      { prompt: 'Кадом тег расм илова мекунад?', code: '', options: ['<img src="photo.jpg" alt="Расм">', '<picture>photo.jpg</picture>', '<image>Расм</image>'], answer: 0, explanation: 'Теги <img> расмро нишон медиҳад, alt бошад онро тавсиф мекунад.' },
      { prompt: 'Кадом тегҳо рӯйхати аломатдор месозанд?', code: '', options: ['<ul> ва <li>', '<table> ва <tr>', '<p> ва <br>'], answer: 0, explanation: '<ul> рӯйхатро месозад ва ҳар банди он дар <li> ҷойгир мешавад.' }
    ]
  }
};

const language = localStorage.getItem('sheyx-proger-lang') || 'ru';
const messages = {
  ru: { correct: 'Верно! Хорошая работа.', wrong: 'Не совсем. Посмотри объяснение и попробуй дальше.', done: 'Игра завершена!', score: 'Счёт', next: 'Следующий раунд', restart: 'Играть снова' },
  en: { correct: 'Correct! Nice work.', wrong: 'Not quite. Read the explanation and keep going.', done: 'Game complete!', score: 'Score', next: 'Next round', restart: 'Play again' },
  tg: { correct: 'Дуруст! Офарин.', wrong: 'На он қадар. Шарҳро хонда, идома диҳед.', done: 'Бозӣ анҷом ёфт!', score: 'Хол', next: 'Даври навбатӣ', restart: 'Бозӣ аз нав' }
};
const text = messages[language] || messages.ru;
const panel = document.getElementById('gamePanel');
const prompt = document.getElementById('gamePrompt');
const codeBlock = document.getElementById('gameCode');
const optionsElement = document.getElementById('gameOptions');
const feedback = document.getElementById('gameFeedback');
const nextButton = document.getElementById('gameNext');
let questions = [];
let currentRound = 0;
let score = 0;

function renderRound() {
  if (currentRound >= questions.length) {
    prompt.textContent = text.done;
    codeBlock.classList.add('hidden');
    optionsElement.replaceChildren();
    feedback.textContent = `${text.score}: ${document.getElementById('gameScore').textContent} / ${questions.length}`;
    nextButton.textContent = text.restart;
    nextButton.classList.remove('hidden');
    nextButton.dataset.restart = 'true';
    return;
  }

  const question = questions[currentRound];
  document.getElementById('gameRound').textContent = `${currentRound + 1} / ${questions.length}`;
  prompt.textContent = question.prompt;
  codeBlock.classList.toggle('hidden', !question.code);
  codeBlock.querySelector('code').textContent = question.code;
  optionsElement.replaceChildren();
  feedback.textContent = '';
  nextButton.classList.add('hidden');
  nextButton.dataset.restart = 'false';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'game-option';
    button.textContent = option;
    button.addEventListener('click', () => {
      optionsElement.querySelectorAll('button').forEach((item) => { item.disabled = true; });
      const correct = index === question.answer;
      if (correct) score += 1;
      button.classList.add(correct ? 'correct' : 'incorrect');
      if (!correct) optionsElement.children[question.answer].classList.add('correct');
      document.getElementById('gameScore').textContent = String(score);
      feedback.textContent = `${correct ? text.correct : text.wrong} ${question.explanation}`;
      nextButton.textContent = currentRound === questions.length - 1 ? text.done : text.next;
      nextButton.classList.remove('hidden');
    });
    optionsElement.append(button);
  });
}

document.querySelectorAll('[data-game-mode]').forEach((button) => {
  button.addEventListener('click', () => {
    const pool = gameQuestions[language]?.[button.dataset.gameMode];
    if (!pool?.length) return;
    questions = [...pool].sort(() => Math.random() - 0.5).slice(0, 4);
    currentRound = 0;
    score = 0;
    document.getElementById('gameScore').textContent = '0';
    panel.classList.remove('hidden');
    renderRound();
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

nextButton.addEventListener('click', () => {
  if (nextButton.dataset.restart === 'true') {
    currentRound = 0;
    score = 0;
    document.getElementById('gameScore').textContent = '0';
    nextButton.dataset.restart = 'false';
  } else {
    currentRound += 1;
  }
  renderRound();
});
