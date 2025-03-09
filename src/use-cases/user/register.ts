import { $Enums, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { IUserRepository } from '@repositories/interface/user-repository';
import { AlreadyExistsError } from '@errors/already-exists-error';
import { EmailVerificationSender } from '@services/email-verification-sender';

interface RegisterUseCaseRequest {
  email: string;
  password: string;
  role?: $Enums.Role;
  course: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(
    private userRepository: IUserRepository,
    private EmailVerificationSender: EmailVerificationSender,
    private generateToken: () => Promise<{
      token: string;
      hashedToken: string;
    }>,
  ) {}

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const hashedPassword = await hash(data.password, 10);

    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AlreadyExistsError('Email já cadastrado');
    }

    const { token, hashedToken } = await this.generateToken();

    const now = new Date();
    const emailVerifyTokenExpiry = now.setHours(now.getHours() + 1);

    this.EmailVerificationSender.sendVerificationEmail(token, data.email);

    const user = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      role: data.role,
      course: data.course,
      emailVerificationToken: hashedToken,
      emailTokenExpiry: new Date(emailVerifyTokenExpiry),
    });

    return { user };
  }
}
