import mailTemplate from '@services/mail-template';
import { MailServer } from '@services/mail-handler';
import { SendMailError } from '@errors/send-mail-error';
import { EmailTemplate } from '@@types/emailTemplate';

function getSubjectText(type: EmailTemplate): string {
  return type === 'emailVerify' ? 'Verificação de e-mail' : 'Redefinição de senha';
}

export class EmailVerificationSender {
  async sendVerificationEmail(
    token: string,
    email: string,
    type: EmailTemplate='emailVerify',
  ): Promise<void> {
    const html = mailTemplate(token, type);

    let emailSend = false;
    let attempts = 0;
    while (!emailSend && attempts < 3) {
      const mailResponse = await MailServer({
        html,
        subjectText: getSubjectText(type),
        userEmail: email,
      });
      if (mailResponse) {
        emailSend = true;
      }
      attempts++;
    }
    if (!emailSend) {
      throw new SendMailError();
    }
  }
}
