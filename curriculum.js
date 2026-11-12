'use strict';

const curriculum = [
  {
    id: 'web',
    title: {
      ru: 'Веб-разработка: первые шаги',
      en: 'Web Development: First Steps',
      tg: 'Сохтани веб: қадамҳои аввал'
    },
    description: {
      ru: 'Создай свою первую веб-страницу и добавь ей стиль и интерактивность.',
      en: 'Build your first web page, then add styling and interaction.',
      tg: 'Аввалин саҳифаи вебии худро созед ва ба он услубу интерактивӣ илова кунед.'
    },
    lessons: [
      {
        id: 'web-html',
        xp: 20,
        videoId: 'kUMe1FH4CHE',
        videoTitle: 'Learn HTML — Full Tutorial for Beginners',
        title: {
          ru: 'Урок 1. Каркас страницы на HTML',
          en: 'Lesson 1. Page structure with HTML',
          tg: 'Дарси 1. Сохтори саҳифа бо HTML'
        },
        content: {
          ru: {
            intro: 'HTML описывает структуру страницы. Браузер читает теги и превращает их в заголовки, абзацы, ссылки и другие элементы.',
            explanation: 'Большинство тегов имеют открывающую и закрывающую части. Содержимое размещается между ними. h1 — главный заголовок, а p — обычный абзац.',
            code: '<h1>Мой первый сайт</h1>\n<p>Я изучаю программирование!</p>',
            task: 'Представь, что нужно добавить на страницу заголовок «Привет, мир!» и абзац «Я учусь кодить». Какой тег используют для абзаца?',
            question: 'Какой HTML-тег создаёт абзац текста?',
            options: ['<h1>', '<p>', '<img>'],
            correctOption: 1
          },
          en: {
            intro: 'HTML describes the structure of a page. The browser reads tags and turns them into headings, paragraphs, links, and other elements.',
            explanation: 'Most tags have an opening and a closing part. Content goes between them. h1 is the main heading, while p is a paragraph.',
            code: '<h1>My first website</h1>\n<p>I am learning to code!</p>',
            task: 'You want to add the paragraph “I am learning to code”. Which tag creates a paragraph?',
            question: 'Which HTML tag creates a paragraph?',
            options: ['<h1>', '<p>', '<img>'],
            correctOption: 1
          },
          tg: {
            intro: 'HTML сохтори саҳифаро муайян мекунад. Браузер тегҳоро хонда, сарлавҳа, абзац, пайванд ва унсурҳои дигар месозад.',
            explanation: 'Аксари тегҳо қисми кушода ва пӯшида доранд. Матн дар байни онҳо навишта мешавад. h1 сарлавҳаи асосӣ, p бошад абзац аст.',
            code: '<h1>Сомонаи аввалини ман</h1>\n<p>Ман барномасозиро меомӯзам!</p>',
            task: 'Барои сохтани абзаци матн кадом тег истифода мешавад?',
            question: 'Кадом теги HTML абзац месозад?',
            options: ['<h1>', '<p>', '<img>'],
            correctOption: 1
          }
        }
      },
      {
        id: 'web-css',
        xp: 20,
        videoId: 'OXGznpKZ_sA',
        videoTitle: 'CSS Tutorial — Full Course for Beginners',
        title: {
          ru: 'Урок 2. Стили с помощью CSS',
          en: 'Lesson 2. Styling with CSS',
          tg: 'Дарси 2. Ороиш бо CSS'
        },
        content: {
          ru: {
            intro: 'CSS отвечает за внешний вид сайта: цвета, отступы, шрифты и расположение блоков.',
            explanation: 'Правило CSS состоит из селектора и набора свойств. Селектор p выбирает все абзацы, а color задаёт цвет текста.',
            code: 'p {\n  color: #168cff;\n  font-size: 20px;\n}',
            task: 'Измени цвет абзацев. Свойство color уже знакомо — попробуй подставить другой цвет в примере.',
            question: 'Какое свойство CSS меняет цвет текста?',
            options: ['font-size', 'color', 'padding'],
            correctOption: 1
          },
          en: {
            intro: 'CSS controls how a site looks: colors, spacing, fonts, and layout.',
            explanation: 'A CSS rule has a selector and a set of properties. The p selector targets paragraphs, and color sets their text color.',
            code: 'p {\n  color: #168cff;\n  font-size: 20px;\n}',
            task: 'Change the paragraph color by choosing another value for the color property in the example.',
            question: 'Which CSS property changes text color?',
            options: ['font-size', 'color', 'padding'],
            correctOption: 1
          },
          tg: {
            intro: 'CSS намуди сомонаро идора мекунад: ранг, фосила, ҳуруф ва ҷойгиршавии блокҳо.',
            explanation: 'Қоидаи CSS аз интихобкунанда ва хусусиятҳо иборат аст. Интихобкунандаи p абзацҳоро интихоб мекунад, color бошад рангро таъин мекунад.',
            code: 'p {\n  color: #168cff;\n  font-size: 20px;\n}',
            task: 'Дар мисол қимати color-ро иваз карда, ранги абзацро дигар кунед.',
            question: 'Кадом хусусияти CSS ранги матнро тағйир медиҳад?',
            options: ['font-size', 'color', 'padding'],
            correctOption: 1
          }
        }
      },
      {
        id: 'web-js',
        xp: 25,
        videoId: 'PkZNo7MFNFg',
        videoTitle: 'Learn JavaScript — Full Course for Beginners',
        title: {
          ru: 'Урок 3. Переменные в JavaScript',
          en: 'Lesson 3. JavaScript variables',
          tg: 'Дарси 3. Тағйирёбандаҳо дар JavaScript'
        },
        content: {
          ru: {
            intro: 'JavaScript добавляет странице поведение. Переменная хранит данные, чтобы программа могла использовать их позже.',
            explanation: 'Для значения, которое не будет переназначаться, используют const. let подходит, если значение планируется менять.',
            code: 'const learner = "Амина";\nlet lessonsDone = 0;\nlessonsDone = lessonsDone + 1;',
            task: 'Создай переменную для имени, которое не меняется. Какое ключевое слово выбрать?',
            question: 'Как объявить переменную, которую нельзя переназначить?',
            options: ['const', 'change', 'repeat'],
            correctOption: 0
          },
          en: {
            intro: 'JavaScript adds behavior to a page. A variable stores data so a program can use it later.',
            explanation: 'Use const for a value that will not be reassigned. Use let when you plan to change the value.',
            code: 'const learner = "Amina";\nlet lessonsDone = 0;\nlessonsDone = lessonsDone + 1;',
            task: 'Create a variable for a name that will not change. Which keyword should you use?',
            question: 'Which keyword declares a variable that cannot be reassigned?',
            options: ['const', 'change', 'repeat'],
            correctOption: 0
          },
          tg: {
            intro: 'JavaScript ба саҳифа рафтор илова мекунад. Тағйирёбанда маълумотро нигоҳ медорад, то барнома баъдтар истифода барад.',
            explanation: 'Барои қимате, ки дигар иваз намешавад, const истифода мешавад. Агар қимат тағйир ёбад, let мувофиқ аст.',
            code: 'const learner = "Амина";\nlet lessonsDone = 0;\nlessonsDone = lessonsDone + 1;',
            task: 'Барои номе, ки тағйир намеёбад, кадом калимаи калидӣ лозим аст?',
            question: 'Кадом калимаи калидӣ тағйирёбандаи тағйирнопазир месозад?',
            options: ['const', 'change', 'repeat'],
            correctOption: 0
          }
        }
      }
    ]
  },
  {
    id: 'python',
    title: {
      ru: 'Python: программирование с нуля',
      en: 'Python: Programming from Scratch',
      tg: 'Python: барномасозӣ аз сифр'
    },
    description: {
      ru: 'Освой основы Python: команды, переменные и условия.',
      en: 'Learn Python basics: instructions, variables, and conditions.',
      tg: 'Асосҳои Python: фармонҳо, тағйирёбандаҳо ва шартҳоро омӯзед.'
    },
    lessons: [
      {
        id: 'python-print',
        xp: 20,
        videoId: 'rfscVS0vtbw',
        videoTitle: 'Learn Python — Full Course for Beginners',
        title: {
          ru: 'Урок 1. Первая команда print',
          en: 'Lesson 1. Your first print command',
          tg: 'Дарси 1. Фармони аввалини print'
        },
        content: {
          ru: {
            intro: 'Python — язык программирования с понятным синтаксисом. Начнём с команды, которая показывает сообщение на экране.',
            explanation: 'Функция print принимает значение в скобках и выводит его. Текст в Python записывается внутри кавычек.',
            code: 'print("Привет, мир!")',
            task: 'Напиши команду, которая выводит на экран твоё имя.',
            question: 'Какая команда выводит сообщение в Python?',
            options: ['show("Привет")', 'print("Привет")', 'echo "Привет"'],
            correctOption: 1
          },
          en: {
            intro: 'Python is a programming language with clear syntax. Let us start with a command that displays a message.',
            explanation: 'The print function takes a value in parentheses and displays it. Text in Python is written inside quotes.',
            code: 'print("Hello, world!")',
            task: 'Write a command that displays your name.',
            question: 'Which command displays a message in Python?',
            options: ['show("Hello")', 'print("Hello")', 'echo "Hello"'],
            correctOption: 1
          },
          tg: {
            intro: 'Python забони барномасозӣ бо синтаксиси равшан аст. Аввал фармонеро меомӯзем, ки паёмро дар экран нишон медиҳад.',
            explanation: 'Функсияи print қиматро дар қавс мегирад ва нишон медиҳад. Матн дар Python дар дохили нохунак навишта мешавад.',
            code: 'print("Салом, ҷаҳон!")',
            task: 'Фармонеро нависед, ки номи шуморо нишон медиҳад.',
            question: 'Кадом фармон паёмро дар Python нишон медиҳад?',
            options: ['show("Салом")', 'print("Салом")', 'echo "Салом"'],
            correctOption: 1
          }
        }
      },
      {
        id: 'python-vars',
        xp: 20,
        videoId: 'rfscVS0vtbw',
        videoTitle: 'Learn Python — Full Course for Beginners',
        title: {
          ru: 'Урок 2. Переменные и данные',
          en: 'Lesson 2. Variables and data',
          tg: 'Дарси 2. Тағйирёбандаҳо ва маълумот'
        },
        content: {
          ru: {
            intro: 'Переменная — это имя для значения. Она помогает программе запоминать текст, числа и другие данные.',
            explanation: 'В Python переменная создаётся присваиванием: сначала пишут имя, затем знак = и значение. Для строки используют кавычки.',
            code: 'name = "Амина"\nscore = 10\nprint(name, score)',
            task: 'Создай переменную age со своим возрастом и выведи её при помощи print.',
            question: 'Как присвоить число 10 переменной score?',
            options: ['score == 10', 'score = 10', '10 = score'],
            correctOption: 1
          },
          en: {
            intro: 'A variable is a name for a value. It helps a program remember text, numbers, and other data.',
            explanation: 'In Python, create a variable with an assignment: write the name, then =, then the value. Put strings in quotes.',
            code: 'name = "Amina"\nscore = 10\nprint(name, score)',
            task: 'Create an age variable and display it with print.',
            question: 'How do you assign the number 10 to score?',
            options: ['score == 10', 'score = 10', '10 = score'],
            correctOption: 1
          },
          tg: {
            intro: 'Тағйирёбанда номи қимат аст. Он ба барнома барои нигоҳ доштани матн, рақам ва маълумоти дигар кӯмак мекунад.',
            explanation: 'Дар Python тағйирёбанда бо аломати = сохта мешавад: аввал ном, баъд = ва қимат. Сатр дар нохунак навишта мешавад.',
            code: 'name = "Амина"\nscore = 10\nprint(name, score)',
            task: 'Тағйирёбандаи age сохта, онро бо print нишон диҳед.',
            question: 'Чӣ тавр рақами 10-ро ба score медиҳем?',
            options: ['score == 10', 'score = 10', '10 = score'],
            correctOption: 1
          }
        }
      },
      {
        id: 'python-if',
        xp: 25,
        videoId: 'rfscVS0vtbw',
        videoTitle: 'Learn Python — Full Course for Beginners',
        title: {
          ru: 'Урок 3. Условия if',
          en: 'Lesson 3. if conditions',
          tg: 'Дарси 3. Шартҳои if'
        },
        content: {
          ru: {
            intro: 'Условие позволяет программе выбирать действие. Блок if выполняется только тогда, когда условие истинно.',
            explanation: 'После условия ставят двоеточие, а следующую строку сдвигают вправо. Отступ в Python обозначает тело блока.',
            code: 'score = 20\nif score >= 10:\n    print("Отлично!")',
            task: 'Измени число score и проверь, когда появится сообщение.',
            question: 'Что делает блок if?',
            options: ['Повторяет код много раз', 'Выполняет код, если условие истинно', 'Создаёт текстовый файл'],
            correctOption: 1
          },
          en: {
            intro: 'A condition lets a program choose an action. An if block runs only when its condition is true.',
            explanation: 'Put a colon after the condition and indent the next line. In Python, indentation marks the block body.',
            code: 'score = 20\nif score >= 10:\n    print("Great!")',
            task: 'Change score and see when the message appears.',
            question: 'What does an if block do?',
            options: ['Repeats code many times', 'Runs code when a condition is true', 'Creates a text file'],
            correctOption: 1
          },
          tg: {
            intro: 'Шарт ба барнома имкон медиҳад амалеро интихоб кунад. Блоки if танҳо ҳангоми дуруст будани шарт иҷро мешавад.',
            explanation: 'Баъди шарт ду нуқта гузошта, сатри дигарро бо фосила менависанд. Дар Python фосила қисми блокро нишон медиҳад.',
            code: 'score = 20\nif score >= 10:\n    print("Офарин!")',
            task: 'Қимати score-ро иваз карда, бинед, ки паём кай пайдо мешавад.',
            question: 'Блоки if чӣ кор мекунад?',
            options: ['Кодро чандин маротиба такрор мекунад', 'Ҳангоми дуруст будани шарт кодро иҷро мекунад', 'Файли матнӣ месозад'],
            correctOption: 1
          }
        }
      }
    ]
  }
];

const advancedLessons = {
  web: [
    {
      id: 'web-semantic-html',
      xp: 25,
      videoId: 'kUMe1FH4CHE',
      title: { ru: 'Урок 4. Семантический HTML и формы', en: 'Lesson 4. Semantic HTML and forms', tg: 'Дарси 4. HTML-и маъноӣ ва формаҳо' },
      content: {
        ru: { intro: 'Семантические элементы объясняют назначение частей страницы браузеру и вспомогательным технологиям.', explanation: 'Используй header, nav, main и footer для структуры. В форме подпиши поле через label и свяжи его с input атрибутом for и id. Это делает интерфейс понятнее и доступнее.', code: '<main>\n  <h1>Связаться с нами</h1>\n  <label for="email">Email</label>\n  <input id="email" type="email">\n</main>', task: 'Добавь к полю ввода подпись и используй семантический контейнер для главного содержания.', question: 'Для чего нужен элемент label в форме?', options: ['Связывает подпись с полем ввода', 'Меняет цвет текста', 'Отправляет форму на сервер'], correctOption: 0 },
        en: { intro: 'Semantic elements explain the purpose of page sections to browsers and assistive technologies.', explanation: 'Use header, nav, main, and footer for structure. Label each form input with label and connect it using matching for and id attributes. This makes interfaces clearer and more accessible.', code: '<main>\n  <h1>Contact us</h1>\n  <label for="email">Email</label>\n  <input id="email" type="email">\n</main>', task: 'Add a label to the input and use a semantic container for the main content.', question: 'What does a label element do in a form?', options: ['Connects a caption to an input', 'Changes text color', 'Submits a form to a server'], correctOption: 0 },
        tg: { intro: 'Унсурҳои маъноӣ вазифаи қисмҳои саҳифаро ба браузер ва технологияҳои ёрирасон мефаҳмонанд.', explanation: 'Барои сохт сохтор header, nav, main ва footer-ро истифода баред. Барои ҳар майдони форма label нависед ва онро бо атрибутҳои for ва id пайваст кунед. Ин саҳифаро фаҳмотар ва дастрас мекунад.', code: '<main>\n  <h1>Бо мо тамос гиред</h1>\n  <label for="email">Email</label>\n  <input id="email" type="email">\n</main>', task: 'Ба майдони воридкунӣ label илова кунед ва барои мундариҷаи асосӣ унсури маъноиро интихоб кунед.', question: 'Унсури label дар форма чӣ вазифа дорад?', options: ['Номи майдонро бо майдони воридкунӣ мепайвандад', 'Ранги матнро иваз мекунад', 'Формаро ба сервер мефиристад'], correctOption: 0 }
      }
    },
    {
      id: 'web-flexbox',
      xp: 25,
      videoId: 'OXGznpKZ_sA',
      title: { ru: 'Урок 5. Раскладка с Flexbox', en: 'Lesson 5. Layout with Flexbox', tg: 'Дарси 5. Ҷойгиркунӣ бо Flexbox' },
      content: {
        ru: { intro: 'Flexbox помогает выстраивать элементы в строку или колонку и управлять свободным местом между ними.', explanation: 'Сначала назначь родителю display: flex. Свойство justify-content распределяет элементы по главной оси, а align-items выравнивает по поперечной.', code: '.menu {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}', task: 'Расположи элементы меню в один ряд и разнеси их по краям контейнера.', question: 'Как включить Flexbox для дочерних элементов?', options: ['display: flex', 'position: flex', 'layout: row'], correctOption: 0 },
        en: { intro: 'Flexbox arranges items in a row or column and distributes the available space between them.', explanation: 'Set display: flex on the parent. justify-content distributes items along the main axis, while align-items controls the cross axis.', code: '.menu {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}', task: 'Place menu items in one row and spread them across the container.', question: 'How do you enable Flexbox for child elements?', options: ['display: flex', 'position: flex', 'layout: row'], correctOption: 0 },
        tg: { intro: 'Flexbox унсурҳоро дар як қатор ё сутун мегузорад ва фазои байни онҳоро идора мекунад.', explanation: 'Ба унсури волидайн display: flex таъин кунед. justify-content унсурҳоро аз рӯи меҳвари асосӣ тақсим мекунад, align-items бошад аз рӯи меҳвари дигар баробар мекунад.', code: '.menu {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}', task: 'Унсурҳои менюро дар як қатор ҷойгир карда, байни онҳоро баробар тақсим кунед.', question: 'Барои фаъол кардани Flexbox кадом қоида лозим аст?', options: ['display: flex', 'position: flex', 'layout: row'], correctOption: 0 }
      }
    },
    {
      id: 'web-responsive',
      xp: 25,
      videoId: 'OXGznpKZ_sA',
      title: { ru: 'Урок 6. Адаптивный дизайн', en: 'Lesson 6. Responsive design', tg: 'Дарси 6. Тарҳи мутобиқшаванда' },
      content: {
        ru: { intro: 'Адаптивный сайт удобно читать на большом мониторе, планшете и телефоне.', explanation: 'Медиазапрос @media применяет CSS только при подходящих условиях, например при небольшой ширине экрана. Начинай с простой гибкой раскладки и проверяй её на разных размерах.', code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n@media (max-width: 700px) {\n  .cards { grid-template-columns: 1fr; }\n}', task: 'На маленьком экране переключи три колонки карточек на одну.', question: 'Какое правило применяет стили только при заданной ширине экрана?', options: ['@media', '@font-face', '@keyframes'], correctOption: 0 },
        en: { intro: 'A responsive site remains easy to read on a desktop, tablet, and phone.', explanation: 'A @media query applies CSS only when conditions match, such as a narrow screen. Start with a flexible layout and test it at different sizes.', code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n@media (max-width: 700px) {\n  .cards { grid-template-columns: 1fr; }\n}', task: 'Switch the three card columns to one column on a small screen.', question: 'Which rule applies styles only at a specified screen width?', options: ['@media', '@font-face', '@keyframes'], correctOption: 0 },
        tg: { intro: 'Сомонаи мутобиқшаванда дар компютер, планшет ва телефон хуб хонда мешавад.', explanation: 'Қоидаи @media CSS-ро танҳо дар шароити мувофиқ, масалан дар экрани хурд, татбиқ мекунад. Аз сохтори чандир оғоз кунед ва онро дар андозаҳои гуногун санҷед.', code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n@media (max-width: 700px) {\n  .cards { grid-template-columns: 1fr; }\n}', task: 'Дар экрани хурд се сутуни кортҳоро ба як сутун табдил диҳед.', question: 'Кадом қоида услубро танҳо дар паҳнои муайяни экран татбиқ мекунад?', options: ['@media', '@font-face', '@keyframes'], correctOption: 0 }
      }
    },
    {
      id: 'web-loops',
      xp: 30,
      videoId: 'PkZNo7MFNFg',
      title: { ru: 'Урок 7. Условия и циклы JavaScript', en: 'Lesson 7. JavaScript conditions and loops', tg: 'Дарси 7. Шарт ва даврҳои JavaScript' },
      content: {
        ru: { intro: 'Условия выбирают действие, а циклы повторяют его для каждого значения или пока выполняется условие.', explanation: 'if/else выбирает одну из ветвей. Цикл for удобен, когда известно число повторений. Следи за границей цикла, чтобы он завершился.', code: 'for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}', task: 'Измени цикл, чтобы он вывел числа от 1 до 5.', question: 'Какой цикл подходит для повторения известное число раз?', options: ['for', 'if', 'switch'], correctOption: 0 },
        en: { intro: 'Conditions choose an action, while loops repeat it for each value or while a condition remains true.', explanation: 'if/else selects a branch. A for loop is useful when the number of repetitions is known. Check its boundary so it eventually stops.', code: 'for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}', task: 'Change the loop so it prints numbers from 1 through 5.', question: 'Which loop is useful when the number of repetitions is known?', options: ['for', 'if', 'switch'], correctOption: 0 },
        tg: { intro: 'Шарт амалро интихоб мекунад, давр бошад онро барои ҳар қимат ё то иҷро шудани шарт такрор мекунад.', explanation: 'if/else яке аз роҳҳоро интихоб мекунад. Даври for вақте мувофиқ аст, ки шумораи такрор маълум бошад. Ҳудуди даврро санҷед, то он анҷом ёбад.', code: 'for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}', task: 'Даврро тағйир диҳед, то ададҳои аз 1 то 5-ро нишон диҳад.', question: 'Барои такрори шумораи маълум кадом давр мувофиқ аст?', options: ['for', 'if', 'switch'], correctOption: 0 }
      }
    },
    {
      id: 'web-arrays',
      xp: 30,
      videoId: 'PkZNo7MFNFg',
      title: { ru: 'Урок 8. Массивы и их методы', en: 'Lesson 8. Arrays and array methods', tg: 'Дарси 8. Массивҳо ва усулҳои онҳо' },
      content: {
        ru: { intro: 'Массив хранит несколько значений в одном упорядоченном списке.', explanation: 'Индекс первого элемента равен нулю. Метод push добавляет значение в конец, а length сообщает количество элементов.', code: 'const skills = ["HTML", "CSS"];\nskills.push("JavaScript");\nconsole.log(skills.length); // 3', task: 'Добавь в массив новый язык программирования и проверь его длину.', question: 'С какого индекса начинается первый элемент массива?', options: ['0', '1', '-1'], correctOption: 0 },
        en: { intro: 'An array stores multiple values in one ordered list.', explanation: 'The first item has index zero. The push method adds a value at the end, and length gives the item count.', code: 'const skills = ["HTML", "CSS"];\nskills.push("JavaScript");\nconsole.log(skills.length); // 3', task: 'Add another programming language to the array and check its length.', question: 'At which index does the first array item start?', options: ['0', '1', '-1'], correctOption: 0 },
        tg: { intro: 'Массив якчанд қиматро дар рӯйхати бо тартиб нигоҳ медорад.', explanation: 'Индекси унсури аввал сифр аст. Усули push қиматро ба охири рӯйхат илова мекунад, length бошад шумораи унсурҳоро медиҳад.', code: 'const skills = ["HTML", "CSS"];\nskills.push("JavaScript");\nconsole.log(skills.length); // 3', task: 'Ба массив забони нав илова карда, дарозии онро санҷед.', question: 'Индекси унсури аввали массив аз чанд сар мешавад?', options: ['0', '1', '-1'], correctOption: 0 }
      }
    },
    {
      id: 'web-dom-events',
      xp: 35,
      videoId: 'PkZNo7MFNFg',
      title: { ru: 'Урок 9. DOM и события', en: 'Lesson 9. The DOM and events', tg: 'Дарси 9. DOM ва рӯйдодҳо' },
      content: {
        ru: { intro: 'DOM — объектное представление HTML-страницы, с которым работает JavaScript.', explanation: 'Найди элемент через querySelector, а затем добавь обработчик события. Не запускай код до появления элемента на странице — подключай скрипт с defer или размещай его после HTML.', code: 'const button = document.querySelector("button");\nbutton.addEventListener("click", () => {\n  alert("Привет!");\n});', task: 'Добавь обработчик click, который меняет текст кнопки после нажатия.', question: 'Какой метод добавляет реакцию на нажатие?', options: ['addEventListener', 'querySelectorAll', 'createElement'], correctOption: 0 },
        en: { intro: 'The DOM is an object representation of an HTML page that JavaScript can work with.', explanation: 'Find an element with querySelector, then add an event handler. Ensure the script runs after the element exists: use defer or load the script after the HTML.', code: 'const button = document.querySelector("button");\nbutton.addEventListener("click", () => {\n  alert("Hello!");\n});', task: 'Add a click handler that changes the button text after it is pressed.', question: 'Which method registers a response to a click?', options: ['addEventListener', 'querySelectorAll', 'createElement'], correctOption: 0 },
        tg: { intro: 'DOM тасвири объекти HTML-саҳифа аст, ки JavaScript метавонад бо он кор кунад.', explanation: 'Унсурро бо querySelector ёбед ва баъд коркардкунандаи рӯйдод илова кунед. Скриптро пас аз пайдо шудани унсур иҷро кунед: defer-ро истифода баред ё скриптро баъди HTML гузоред.', code: 'const button = document.querySelector("button");\nbutton.addEventListener("click", () => {\n  alert("Салом!");\n});', task: 'Коркарди click илова кунед, то баъди пахш матни тугма иваз шавад.', question: 'Кадом усул вокуниш ба пахшро сабт мекунад?', options: ['addEventListener', 'querySelectorAll', 'createElement'], correctOption: 0 }
      }
    }
  ],
  python: [
    {
      id: 'python-input',
      xp: 25,
      videoId: 'rfscVS0vtbw',
      title: { ru: 'Урок 4. Ввод данных и числа', en: 'Lesson 4. Input and numbers', tg: 'Дарси 4. Воридкунӣ ва ададҳо' },
      content: {
        ru: { intro: 'input() получает строку от пользователя. Чтобы выполнить арифметику, введённый текст нужно преобразовать в число.', explanation: 'int() подходит для целых чисел, float() — для дробных. При неверном вводе преобразование может вызвать ошибку, поэтому в реальных программах данные проверяют.', code: 'name = input("Как тебя зовут? ")\nage = int(input("Сколько тебе лет? "))\nprint(f"Привет, {name}! Через год тебе будет {age + 1}.")', task: 'Получи два числа и выведи их сумму.', question: 'Что возвращает input() до преобразования?', options: ['Строку', 'Целое число', 'Список'], correctOption: 0 },
        en: { intro: 'input() reads text from a user. Convert that text to a number before doing arithmetic.', explanation: 'Use int() for whole numbers and float() for decimals. Invalid input can raise an error, so real programs validate user data.', code: 'name = input("What is your name? ")\nage = int(input("How old are you? "))\nprint(f"Hi, {name}! Next year you will be {age + 1}.")', task: 'Read two numbers and print their sum.', question: 'What does input() return before conversion?', options: ['A string', 'An integer', 'A list'], correctOption: 0 },
        tg: { intro: 'input() матни воридкардаи корбарро мегирад. Барои ҳисоб матнро ба адад табдил диҳед.', explanation: 'Барои адади бутун int(), барои адади касрӣ float() истифода мешавад. Агар матн рақам набошад, табдилдиҳӣ метавонад хато диҳад, бинобар ин маълумотро санҷед.', code: 'name = input("Номат чист? ")\nage = int(input("Чандсола ҳастӣ? "))\nprint(f"Салом, {name}! Соли дигар {age + 1} сола мешавӣ.")', task: 'Ду ададро гирифта, суммаи онҳоро нишон диҳед.', question: 'input() пеш аз табдилдиҳӣ чӣ бармегардонад?', options: ['Сатр', 'Адади бутун', 'Рӯйхат'], correctOption: 0 }
      }
    },
    {
      id: 'python-loops',
      xp: 30,
      videoId: 'rfscVS0vtbw',
      title: { ru: 'Урок 5. Циклы for и while', en: 'Lesson 5. for and while loops', tg: 'Дарси 5. Даврҳои for ва while' },
      content: {
        ru: { intro: 'Циклы позволяют повторить действие без копирования одних и тех же строк кода.', explanation: 'for перебирает значения последовательности. range(5) создаёт числа от 0 до 4, правая граница не включается. while повторяет блок, пока условие истинно.', code: 'for number in range(1, 4):\n    print(number)\n\ncount = 0\nwhile count < 3:\n    count += 1', task: 'Выведи числа от 1 до 5, используя for и range.', question: 'Включает ли range(1, 4) число 4?', options: ['Нет, верхняя граница не включается', 'Да, всегда', 'range создаёт только одно число'], correctOption: 0 },
        en: { intro: 'Loops repeat an action without copying the same lines of code.', explanation: 'for iterates through a sequence. range(5) produces numbers from 0 to 4 because its upper bound is exclusive. while repeats as long as its condition is true.', code: 'for number in range(1, 4):\n    print(number)\n\ncount = 0\nwhile count < 3:\n    count += 1', task: 'Print numbers from 1 through 5 using for and range.', question: 'Does range(1, 4) include the number 4?', options: ['No, the upper bound is exclusive', 'Yes, always', 'range creates only one number'], correctOption: 0 },
        tg: { intro: 'Даврҳо амалро такрор мекунанд, бе он ки як сатрро борҳо нусха кунед.', explanation: 'for қиматҳои пайдарпайиро мегузарад. range(5) ададҳои аз 0 то 4 медиҳад, зеро ҳудуди боло дохил намешавад. while то дуруст будани шарт такрор мешавад.', code: 'for number in range(1, 4):\n    print(number)\n\ncount = 0\nwhile count < 3:\n    count += 1', task: 'Бо for ва range ададҳои аз 1 то 5-ро нишон диҳед.', question: 'Оё range(1, 4) адади 4-ро дар бар мегирад?', options: ['Не, ҳудуди боло дохил намешавад', 'Ҳа, ҳамеша', 'range танҳо як адад месозад'], correctOption: 0 }
      }
    },
    {
      id: 'python-lists',
      xp: 30,
      videoId: 'rfscVS0vtbw',
      title: { ru: 'Урок 6. Списки и строки', en: 'Lesson 6. Lists and strings', tg: 'Дарси 6. Рӯйхатҳо ва сатрҳо' },
      content: {
        ru: { intro: 'Список хранит несколько элементов, а строка — последовательность символов. С ними можно работать по индексам и перебирать их циклом.', explanation: 'Индексация начинается с нуля. append() добавляет элемент в конец, len() возвращает длину. Срезы позволяют получить часть строки или списка.', code: 'languages = ["Python", "JavaScript"]\nlanguages.append("HTML")\nprint(languages[0])\nprint(len(languages))', task: 'Добавь язык в список и выведи последний элемент.', question: 'Как добавить элемент в конец списка?', options: ['append()', 'push()', 'addLast()'], correctOption: 0 },
        en: { intro: 'A list stores multiple items, while a string is a sequence of characters. You can index and loop through both.', explanation: 'Indexing starts at zero. append() adds an item to the end and len() returns the length. Slices select part of a string or list.', code: 'languages = ["Python", "JavaScript"]\nlanguages.append("HTML")\nprint(languages[0])\nprint(len(languages))', task: 'Add a language to the list and print its last item.', question: 'How do you add an item to the end of a list?', options: ['append()', 'push()', 'addLast()'], correctOption: 0 },
        tg: { intro: 'Рӯйхат якчанд унсурро нигоҳ медорад, сатр бошад пайдарпайии ҳарфҳост. Бо индексҳо кор кунед ё онҳоро бо давр гузаред.', explanation: 'Индекс аз сифр сар мешавад. append() унсурро ба охир илова мекунад, len() дарозиро медиҳад. Буриш қисми рӯйхат ё сатрро интихоб мекунад.', code: 'languages = ["Python", "JavaScript"]\nlanguages.append("HTML")\nprint(languages[0])\nprint(len(languages))', task: 'Забонро ба рӯйхат илова карда, унсури охиринро нишон диҳед.', question: 'Барои илова кардани унсур ба охири рӯйхат кадом усул аст?', options: ['append()', 'push()', 'addLast()'], correctOption: 0 }
      }
    },
    {
      id: 'python-functions',
      xp: 35,
      videoId: 'rfscVS0vtbw',
      title: { ru: 'Урок 7. Функции и параметры', en: 'Lesson 7. Functions and parameters', tg: 'Дарси 7. Функсияҳо ва параметрҳо' },
      content: {
        ru: { intro: 'Функция объединяет действия под именем и помогает повторно использовать код.', explanation: 'Объяви функцию через def. Параметр принимает входное значение, а return возвращает результат вызывающему коду. Отступы определяют тело функции.', code: 'def greet(name):\n    return f"Привет, {name}!"\n\nmessage = greet("Амина")\nprint(message)', task: 'Создай функцию, которая принимает два числа и возвращает их сумму.', question: 'Какое ключевое слово возвращает результат из функции?', options: ['return', 'print', 'yield'], correctOption: 0 },
        en: { intro: 'A function groups actions under a name so you can reuse code.', explanation: 'Declare a function with def. A parameter receives input, and return sends a result back to the caller. Indentation defines the function body.', code: 'def greet(name):\n    return f"Hello, {name}!"\n\nmessage = greet("Amina")\nprint(message)', task: 'Create a function that accepts two numbers and returns their sum.', question: 'Which keyword returns a result from a function?', options: ['return', 'print', 'yield'], correctOption: 0 },
        tg: { intro: 'Функсия амалҳоро бо ном ҷамъ мекунад ва имкон медиҳад кодро аз нав истифода баред.', explanation: 'Функсияро бо def муайян кунед. Параметр маълумоти воридиро мегирад, return натиҷаро ба ҷои даъват бармегардонад. Фосила қисми функсияро нишон медиҳад.', code: 'def greet(name):\n    return f"Салом, {name}!"\n\nmessage = greet("Амина")\nprint(message)', task: 'Функсияе созед, ки ду ададро гирифта, суммаи онҳоро баргардонад.', question: 'Кадом калима натиҷаро аз функсия бармегардонад?', options: ['return', 'print', 'yield'], correctOption: 0 }
      }
    },
    {
      id: 'python-dictionaries',
      xp: 35,
      videoId: 'rfscVS0vtbw',
      title: { ru: 'Урок 8. Словари и мини-проект', en: 'Lesson 8. Dictionaries and a mini project', tg: 'Дарси 8. Луғатҳо ва лоиҳаи хурд' },
      content: {
        ru: { intro: 'Словарь хранит пары «ключ — значение», поэтому по понятному ключу можно быстро получить данные.', explanation: 'Ключи уникальны, а значения могут иметь разные типы. Метод get безопасно читает значение, а присваивание по ключу добавляет или меняет запись.', code: 'student = {"name": "Амина", "lessons": 3}\nstudent["xp"] = 60\nprint(student.get("name"))', task: 'Добавь в словарь ученика ключ xp и выведи его значение.', question: 'Как получить значение словаря по ключу name?', options: ['student["name"]', 'student.name()', 'student(name)'], correctOption: 0 },
        en: { intro: 'A dictionary stores key-value pairs, so you can look up data using a meaningful key.', explanation: 'Keys are unique and values can have different types. get reads a value safely; assignment by key adds or updates an entry.', code: 'student = {"name": "Amina", "lessons": 3}\nstudent["xp"] = 60\nprint(student.get("name"))', task: 'Add an xp key to the student dictionary and print its value.', question: 'How do you read the value for the name key?', options: ['student["name"]', 'student.name()', 'student(name)'], correctOption: 0 },
        tg: { intro: 'Луғат ҷуфтҳои «калид — қимат»-ро нигоҳ медорад, бинобар ин маълумотро бо калиди фаҳмо меёбем.', explanation: 'Калидҳо такрор намешаванд, қиматҳо бошанд навъҳои гуногун доранд. get қиматро мехонад, таъйин тавассути калид сабтро илова ё нав мекунад.', code: 'student = {"name": "Амина", "lessons": 3}\nstudent["xp"] = 60\nprint(student.get("name"))', task: 'Ба луғати донишҷӯ калиди xp илова карда, қимати онро нишон диҳед.', question: 'Қимати калиди name-ро чӣ гуна хонем?', options: ['student["name"]', 'student.name()', 'student(name)'], correctOption: 0 }
      }
    },
    {
      id: 'python-errors',
      xp: 35,
      videoId: 'rfscVS0vtbw',
      title: { ru: 'Урок 9. Обработка ошибок', en: 'Lesson 9. Handling errors', tg: 'Дарси 9. Кор бо хатоҳо' },
      content: {
        ru: { intro: 'Ошибки ввода или внешних данных могут прервать программу. Обработка исключений позволяет ответить на ожидаемую проблему.', explanation: 'Помести рискованную операцию в try, а подходящую обработку — в except. Лови конкретные типы ошибок: так случайные дефекты не будут скрываться.', code: 'try:\n    age = int(input("Возраст: "))\nexcept ValueError:\n    print("Введите целое число")', task: 'Обработай ситуацию, когда пользователь вводит текст вместо целого числа.', question: 'Какой блок выполняется, если в try возникает ValueError?', options: ['except ValueError', 'finally ValueError', 'else ValueError'], correctOption: 0 },
        en: { intro: 'Invalid input or external data can stop a program. Exception handling lets you respond to an expected problem.', explanation: 'Put a risky operation in try and a matching handler in except. Catch specific error types so unrelated bugs are not hidden.', code: 'try:\n    age = int(input("Age: "))\nexcept ValueError:\n    print("Enter a whole number")', task: 'Handle the case where a user enters text instead of a whole number.', question: 'Which block handles a ValueError raised inside try?', options: ['except ValueError', 'finally ValueError', 'else ValueError'], correctOption: 0 },
        tg: { intro: 'Маълумоти нодуруст метавонад барномаро боздорад. Коркарди истисноҳо имкон медиҳад ба мушкили интизоршуда ҷавоб диҳем.', explanation: 'Амали эҳтимолан хатарнокро дар try ва коркардро дар except гузоред. Навъи мушаххаси хаторо гиред, то камбудиҳои дигар пинҳон нашаванд.', code: 'try:\n    age = int(input("Синну сол: "))\nexcept ValueError:\n    print("Адади бутун ворид кунед")', task: 'Ҳолатеро коркард кунед, ки корбар ба ҷои адади бутун матн менависад.', question: 'Кадом блок ValueError-и дохили try-ро коркард мекунад?', options: ['except ValueError', 'finally ValueError', 'else ValueError'], correctOption: 0 }
      }
    }
  ]
};

curriculum.forEach((course) => {
  course.lessons.push(...advancedLessons[course.id]);
});

function getCourse(courseId) {
  return curriculum.find((course) => course.id === courseId) || null;
}

function getLesson(lessonId) {
  for (const course of curriculum) {
    const index = course.lessons.findIndex((lesson) => lesson.id === lessonId);
    if (index >= 0) return { course, lesson: course.lessons[index], index };
  }
  return null;
}

module.exports = { curriculum, getCourse, getLesson };
