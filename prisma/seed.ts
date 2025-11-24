import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LessonData {
  title: string;
  content: string;
  order: number;
  quiz?: {
    create: {
      title: string;
      questions: {
        create: {
          text: string;
          answers: {
            create: {
              text: string;
              isCorrect: boolean;
            }[];
          };
        }[];
      };
    };
  };
}

async function main() {
  console.log('Seeding...');

  await prisma.answer.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.course.deleteMany({});

  const courses = [
    { name: 'html', description: 'Learn the fundamentals of HTML, the standard markup language for creating web pages.' },
    { name: 'css', description: 'Learn how to style web pages with CSS, the language for describing the presentation of a document written in a markup language.' },
    { name: 'javascript', description: 'Learn the fundamentals of JavaScript, the programming language of the Web.' },
    { name: 'reactjs', description: 'Learn React, a JavaScript library for building user interfaces.' },
    { name: 'nextjs', description: 'Learn Next.js, a React framework for building production-grade applications.' },
    { name: 'nodejs', description: 'Learn Node.js, a JavaScript runtime built on Chrome\'s V8 JavaScript engine.' },
    { name: 'nestjs', description: 'Learn NestJS, a progressive Node.js framework for building efficient, reliable and scalable server-side applications.' },
    { name: 'postgresql', description: 'Learn PostgreSQL, a powerful, open source object-relational database system.' },
    { name: 'mysql', description: 'Learn MySQL, an open-source relational database management system.' },
  ];

  for (const course of courses) {
    let lessons: LessonData[] = [
      {
        title: `Getting Started with ${course.name}`,
        content: `This is the content for the first lesson of the ${course.name} course.`,
        order: 1,
      },
      {
        title: `Advanced ${course.name}`,
        content: `This is the content for the second lesson of the ${course.name} course.`,
        order: 2,
      },
    ];

    if (course.name === 'javascript') {
      lessons = [
        {
          title: 'JavaScript Basics',
          content: 'This lesson covers the fundamental concepts of JavaScript. You will learn about variables, data types (String, Number, Boolean, Null, Undefined, Symbol, BigInt), and operators (arithmetic, assignment, comparison, logical). We will also introduce basic control flow with if/else statements and for/while loops.',
          order: 1,
        },
        {
          title: 'Functions and Scope',
          content: 'In this lesson, you will dive deep into functions. You will learn how to declare functions (function declarations, function expressions, arrow functions), pass arguments, and return values. We will also cover the concept of scope (global, function, block) and closures.',
          order: 2,
          quiz: {
            create: {
              title: 'Functions and Scope Quiz',
              questions: {
                create: [
                  {
                    text: 'What is a closure in JavaScript?',
                    answers: {
                      create: [
                        { text: 'A function having access to the parent scope, even after the parent function has closed.', isCorrect: true },
                        { text: 'A way to lock a variable to a specific value.', isCorrect: false },
                        { text: 'A special type of loop.', isCorrect: false },
                        { text: 'A built-in JavaScript method for closing windows.', isCorrect: false },
                      ],
                    },
                  },
                  {
                    text: 'What is the difference between `let` and `var` in terms of scope?',
                    answers: {
                      create: [
                        { text: '`let` is block-scoped and `var` is function-scoped.', isCorrect: true },
                        { text: '`var` is block-scoped and `let` is function-scoped.', isCorrect: false },
                        { text: 'There is no difference in terms of scope.', isCorrect: false },
                        { text: '`let` is for numbers and `var` is for strings.', isCorrect: false },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
        {
          title: 'DOM Manipulation',
          content: 'This lesson teaches you how to interact with the Document Object Model (DOM). You will learn how to select elements from the HTML document, change their content and style, and handle events like clicks and keypresses. This is the foundation of creating dynamic and interactive web pages.',
          order: 3,
        },
        {
          title: 'Asynchronous JavaScript',
          content: 'Modern web applications heavily rely on asynchronous operations. In this lesson, you will learn how to handle asynchronous code in JavaScript using callbacks, Promises, and the modern async/await syntax. We will also cover how to fetch data from external APIs.',
          order: 4,
        },
        {
          title: 'ES6+ Features',
          content: 'This lesson introduces you to the modern features of JavaScript, starting from ECMAScript 2015 (ES6). You will learn about let and const, template literals, destructuring, default parameters, rest and spread operators, classes, and modules. These features will help you write cleaner and more efficient code.',
          order: 5,
        },
      ];
    }

    await prisma.course.create({
      data: {
        title: course.name,
        description: course.description,
        lessons: {
          create: lessons,
        },
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
