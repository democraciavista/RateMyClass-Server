import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV !== 'production' ? ['warn', 'error'] : [],
});

// Check if models are availableyyy
try {
  console.log('Checking Prisma models availability:');
  console.log(
    '- User model:',
    typeof prisma.user === 'object' ? 'Available ✅' : 'Not available ❌',
  );
  console.log(
    '- Subjects model:',
    typeof prisma.subjects === 'object' ? 'Available ✅' : 'Not available ❌',
  );
  console.log(
    '- Material model:',
    typeof prisma.material === 'object' ? 'Available ✅' : 'Not available ❌',
  );
  console.log(
    '- Reaction model:',
    typeof prisma.reaction === 'object' ? 'Available ✅' : 'Not available ❌',
  );
} catch (error) {
  console.error('Error checking models:', error);
}

prisma
  .$connect()
  .then(() => {
    console.log('📦 Successfully connected with database');
  })
  .catch((error) => {
    console.log('❌ Error connecting to database', error);
  });

export default prisma;
