import { PrismaClient, Role, ReactionType, CourseType } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const courseList = [
    'ABI - Engenharia',
    'Administração',
    'Arqueologia',
    'Arquitetura e Urbanismo',
    'Artes Visuais',
    'Biblioteconomia',
    'Biomedicina',
    'Cinema e Audiovisual',
    'Ciência Política',
    'Ciência da Computação',
    'Ciência de Materiais',
    'Ciências Ambientais',
    'Ciências Atuariais',
    'Ciências Biológicas',
    'Ciências Contábeis',
    'Ciências Econômicas',
    'Ciências Sociais',
    'Comunicação Social',
    'Dança',
    'Design',
    'Direito',
    'Educação Escolar Quilombola',
    'Educação Física',
    'Enfermagem',
    'Engenharia Biomédica',
    'Engenharia Cartográfica e de Agrimensura',
    'Engenharia Civil',
    'Engenharia Eletrônica',
    'Engenharia Elétrica',
    'Engenharia Mecânica',
    'Engenharia Naval',
    'Engenharia Química',
    'Engenharia da Computação',
    'Engenharia de Alimentos',
    'Engenharia de Controle e Automação',
    'Engenharia de Energia',
    'Engenharia de Materiais',
    'Engenharia de Minas',
    'Engenharia de Produção',
    'Engenharia de Telecomunicações',
    'Estatística',
    'Estudos de Mídia',
    'Expressão Gráfica',
    'Farmácia',
    'Filosofia',
    'Fisioterapia',
    'Fonoaudiologia',
    'Física',
    'Geografia',
    'Geologia',
    'Gestão da Informação',
    'História',
    'Hotelaria',
    'Inteligência Artificial',
    'Intercultural Indígena',
    'Interdisciplinar em Ciência e Tecnologia',
    'Jornalismo',
    'Letras',
    'Letras Espanhol',
    'Letras Francês',
    'Letras Inglês',
    'Letras Libras',
    'Letras Português',
    'Letras-Língua Espanhola',
    'Letras-Língua Portuguesa',
    'Matemática',
    'Matemática Aplicada',
    'Medicina',
    'Museologia',
    'Música',
    'Música - Canto',
    'Música - Instrumento',
    'Nutrição',
    'Oceanografia',
    'Odontologia',
    'Pedagogia',
    'Psicologia',
    'Publicidade e Propaganda',
    'Química',
    'Química Industrial',
    'Rádio, TV e Internet',
    'Saúde Coletiva',
    'Secretariado Executivo',
    'Serviço Social',
    'Sistemas de Informação',
    'Teatro',
    'Terapia Ocupacional',
    'Turismo'
];

const centerList = [
    'CAA',
    'CAC',
    'CB',
    'CCEN',
    'CCJ',
    'CCM',
    'CCS',
    'CCSA',
    'CE',
    'CFCH',
    'CIN',
    'CAV',
    'CTG'
];

const professorNames = [
    'Dr. Ricardo Oliveira',
    'Profa. Maria Silva',
    'Dr. João Santos',
    'Profa. Ana Carolina Mendes',
    'Dr. Paulo Freitas',
    'Profa. Juliana Costa',
    'Dr. Fernando Almeida',
    'Profa. Camila Pereira',
    'Dr. Marcos Rodrigues',
    'Profa. Luciana Ferreira',
    'Dr. Carlos Eduardo Lima',
    'Profa. Patrícia Andrade',
    'Dr. Roberto Gomes',
    'Profa. Débora Nascimento',
    'Dr. Eduardo Santana'
];

// Helper function to generate random number within range
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate random discipline code
const generateDisciplineCode = () => {
  const prefixes = ['COMP', 'MAT', 'FIS', 'BIO', 'ECO', 'DIR', 'MED', 'ENG', 'LET', 'GEO', 'QUI', 'PSI', 'SOC', 'HIS'];
  const prefix = getRandomItem(prefixes);
  const number = getRandomInt(1000, 9999);
  return `${prefix}${number}`;
};

async function main() {
  console.log('Starting database seeding...');

  // Create Users
  console.log('Creating users...');
  
  // Admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: adminPassword,
      course: 'Administração',
      emailVerified: true,
      role: Role.ADMIN
    }
  });
  
  // Student users
  const users: Array<{ id: string; email: string; password: string; course: string; emailVerified: boolean; role: Role }> = [];
  for (let i = 1; i <= 20; i++) {
    const password = await hash(`student${i}`, 10);
    const user = await prisma.user.create({
      data: {
        email: `student${i}@ufpe.com`,
        password: password,
        course: getRandomItem(courseList),
        emailVerified: Math.random() > 0.2, // 80% of users have verified email
        role: Role.STUDENT

      }
    });
    users.push(user);
  }
  
  // Create Disciplines
  console.log('Creating disciplines...');
  const disciplines: Array<{
    id: string;
    course: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    code: string;
    professor: string;
    center: string;
    period: number | null;
    type: CourseType;
    hours: number;
  }> = [];
  
  for (let i = 1; i <= 30; i++) {
    const courseType = getRandomItem([CourseType.MANDATORY, CourseType.ELECTIVE_FREE, CourseType.ELECTIVE_PROFILE]);
    const course = getRandomItem(courseList);
    const center = getRandomItem(centerList);
    const hours = getRandomItem([30, 45, 60, 75, 90]);
    const period = getRandomInt(1, 10);
    
    try {
      const discipline = await prisma.discipline.create({
        data: {
          code: generateDisciplineCode(),
          name: `Discipline ${i}`,
          professor: getRandomItem(professorNames),
          course: course,
          center: center,
          period: period,
          type: courseType,
          hours: hours
        }
      });
      disciplines.push(discipline);
    } catch (error) {
      console.error(`Failed to create discipline ${i}:`, error);
    }
  }
  
  // Create Reviews
  console.log('Creating reviews...');
  const reviews: Array<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    disciplineId: string;
    userId: string;
    passedFirstTry: boolean;
    finalGrade: number;
    professorTeachingScore: number;
    periodPaid: string;
    droppedOut: boolean;
    difficultyLevel: number;
    disciplineScore: number;
    wentToRecovery: boolean;
    failedBefore: boolean;
    comment: string | null;
    recommendation: string | null;
  }> = [];
  
  for (let i = 0; i < 60; i++) {
    const user = getRandomItem(users);
    const discipline = getRandomItem(disciplines);
    const passedFirstTry = Math.random() > 0.3;
    const droppedOut = !passedFirstTry && Math.random() > 0.7;
    const wentToRecovery = !passedFirstTry && !droppedOut && Math.random() > 0.5;
    const failedBefore = Math.random() > 0.8;
    
    const finalGrade = droppedOut ? getRandomInt(0, 3) : passedFirstTry ? getRandomInt(7, 10) : getRandomInt(3, 7);
    const professorTeachingScore = getRandomInt(1, 10) / 2; // Score from 0.5 to 5.0
    const difficultyLevel = getRandomInt(1, 10) / 2; // Score from 0.5 to 5.0
    const disciplineScore = getRandomInt(1, 10) / 2; // Score from 0.5 to 5.0
    
    const periodOptions = [20231, 20232, 20241];
    
    const review = await prisma.review.create({
      data: {
        disciplineId: discipline.id,
        userId: user.id,
        passedFirstTry: passedFirstTry,
        finalGrade: finalGrade,
        professorTeachingScore: professorTeachingScore,
        periodPaid: getRandomItem(periodOptions),
        droppedOut: droppedOut,
        difficultyLevel: difficultyLevel,
        disciplineScore: disciplineScore,
        wentToRecovery: wentToRecovery,
        failedBefore: failedBefore,
        comment: Math.random() > 0.3 
          ? `Esta é uma avaliação da disciplina. ${Math.random() > 0.5 ? 'Recomendo fortemente.' : 'Tive algumas dificuldades.'}`
          : null,
        recommendation: Math.random() > 0.4
          ? `${Math.random() > 0.5 ? 'Faça as listas de exercícios com antecedência.' : 'Não falte às aulas práticas.'}`
          : null
      }
    });
    reviews.push(review);
  }
  
  // Create Materials
  console.log('Creating materials...');
  
  for (let i = 1; i <= 50; i++) {
    const user = getRandomItem(users);
    const discipline = getRandomItem(disciplines);
    
    await prisma.material.create({
      data: {
        title: `Material de Estudo ${i}`,
        link: `https://example.com/material${i}`,
        userId: user.id,
        disciplineId: discipline.id
      }
    });
  }
  
  // Create Reactions
  console.log('Creating reactions...');
  
  // Reactions for materials
  for (let i = 0; i < 80; i++) {
    const user = getRandomItem(users);
    const material = await prisma.material.findFirst({
      skip: getRandomInt(0, 49),
      take: 1
    });
    
    if (material) {
      try {
        await prisma.reaction.create({
          data: {
            type: getRandomItem([ReactionType.LIKE, ReactionType.REPORT, ReactionType.FAVORITE]),
            userId: user.id,
            materialId: material.id
          }
        });
      } catch (e) {
        // Skip duplicate reactions (due to unique constraint)
        console.log('Skipping duplicate material reaction');
      }
    }
  }
  
  // Reactions for disciplines
  for (let i = 0; i < 60; i++) {
    const user = getRandomItem(users);
    const discipline = getRandomItem(disciplines);
    
    try {
      await prisma.reaction.create({
        data: {
          type: getRandomItem([ReactionType.LIKE, ReactionType.FAVORITE]),
          userId: user.id,
          disciplineId: discipline.id
        }
      });
    } catch (e) {
      // Skip duplicate reactions
      console.log('Skipping duplicate discipline reaction');
    }
  }
  
  // Reactions for reviews
  for (let i = 0; i < 40; i++) {
    const user = getRandomItem(users);
    const review = getRandomItem(reviews);
    
    try {
      await prisma.reaction.create({
        data: {
          type: ReactionType.LIKE,
          userId: user.id,
          reviewId: review.id
        }
      });
    } catch (e) {
      // Skip duplicate reactions
      console.log('Skipping duplicate review reaction');
    }
  }
  
  // Generate Statistics for each discipline
  console.log('Generating statistics...');
  
  for (const discipline of disciplines) {
    const disciplineReviews = await prisma.review.findMany({
      where: {
        disciplineId: discipline.id
      }
    });
    
    if (disciplineReviews.length > 0) {
      const totalReviews = disciplineReviews.length;
      
      // Calculate averages
      const sumGrades = disciplineReviews.reduce((sum, review) => sum + review.finalGrade, 0);
      const sumTeachingScores = disciplineReviews.reduce((sum, review) => sum + review.professorTeachingScore, 0);
      const sumDifficulty = disciplineReviews.reduce((sum, review) => sum + review.difficultyLevel, 0);
      const sumDisciplineScores = disciplineReviews.reduce((sum, review) => sum + review.disciplineScore, 0);
      
      const dropouts = disciplineReviews.filter(review => review.droppedOut).length;
      const passes = disciplineReviews.filter(review => review.finalGrade >= 7).length;
      
      await prisma.statistic.create({
        data: {
          disciplineId: discipline.id,
          totalReviews: totalReviews,
          averageGrades: parseFloat((sumGrades / totalReviews).toFixed(2)),
          averageTeachingScore: parseFloat((sumTeachingScores / totalReviews).toFixed(2)),
          averageDifficulty: parseFloat((sumDifficulty / totalReviews).toFixed(2)),
          dropoutRate: parseFloat(((dropouts / totalReviews) * 100).toFixed(2)),
          disciplineScore: parseFloat((sumDisciplineScores / totalReviews).toFixed(2)),
          approvalRate: parseFloat(((passes / totalReviews) * 100).toFixed(2))
        }
      });
    }
  }
  
  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
