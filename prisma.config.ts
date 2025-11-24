    // prisma.config.ts
    import 'dotenv/config'; // If you're using environment variables
    import { defineConfig, env } from 'prisma/config';

    export default defineConfig({
      schema: 'prisma/schema.prisma', // Path to your schema.prisma file
      migrations: {
        path: 'prisma/migrations', // Path to your migrations folder
      },
      datasource: {
        url: env('DATABASE_URL'), // Your database connection URL
      },
    });