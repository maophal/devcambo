import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

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
    await prisma.course.create({
      data: {
        title: course.name,
        description: course.description,
        lessons: {
          create: [
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
          ],
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
