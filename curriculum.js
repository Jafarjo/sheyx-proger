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
