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
  await prisma.plan.deleteMany({});

  await prisma.plan.create({
    data: {
      name: 'Pro',
      price: 10,
      description: 'Access to all lessons, quizzes, and live code editor.',
    },
  });

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
    if (course.name === 'javascript') {
      const jsCourse = await prisma.course.create({
        data: {
          title: course.name,
          description: course.description,
        },
      });

      const basics = await prisma.lesson.create({
        data: {
          title: 'JavaScript Basics',
          content:
            'This lesson covers the fundamental concepts of JavaScript. You will learn about variables, data types (String, Number, Boolean, Null, Undefined, Symbol, BigInt), and operators (arithmetic, assignment, comparison, logical). We will also introduce basic control flow with if/else statements and for/while loops.',
          order: 1,
          courseId: jsCourse.id,
        },
      });

      await prisma.lesson.create({
        data: {
          title: 'Variables',
          content: 'Content for variables',
          order: 1,
          parentId: basics.id,
          courseId: jsCourse.id,
        },
      });

      await prisma.lesson.create({
        data: {
          title: 'Data Types',
          content: 'Content for data types',
          order: 2,
          parentId: basics.id,
          courseId: jsCourse.id,
        },
      });

      const functions = await prisma.lesson.create({
        data: {
          title: 'Functions and Scope',
          content:
            'In this lesson, you will dive deep into functions. You will learn how to declare functions (function declarations, function expressions, arrow functions), pass arguments, and return values. We will also cover the concept of scope (global, function, block) and closures.',
          order: 2,
          courseId: jsCourse.id,
        },
      });

      await prisma.lesson.create({
        data: {
          title: 'Function Declarations',
          content: 'Content for function declarations',
          order: 1,
          parentId: functions.id,
          courseId: jsCourse.id,
        },
      });

      await prisma.lesson.create({
        data: {
          title: 'Arrow Functions',
          content: 'Content for arrow functions',
          order: 2,
          parentId: functions.id,
          courseId: jsCourse.id,
        },
      });
    } else {
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
