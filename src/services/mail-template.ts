import { EmailTemplate } from "@@types/emailTemplate";

function getEmailContent(type: EmailTemplate): {
  welcomeText: string;
  message: string;
} {
  if (type === 'emailVerify') {
    return {
      welcomeText: 'Bem vindo ao Rate My Class',
      message: 'Acesse o link abaixo para confirmar o seu e-mail na plataforma',
    };
  }
  return {
    welcomeText: 'Esqueceu a sua senha?',
    message: 'Acesse o link abaixo para recuperar a sua senha',
  };
}

function getEmailAction(
  type: EmailTemplate,
  token: string,
): {
  actionText: string;
  actionUrl: string;
} {
  if (type === 'emailVerify') {
    return {
      actionText: 'Confirmar e-mail',
      actionUrl: `${process.env.APP_URL}/login?token=${token}`,
    };
  }
  return {
    actionText: 'Recuperar senha',
    actionUrl: `http://localhost:3000/reset-password?token=${token}`,
  };
}

export default (token: string, type: EmailTemplate) => {
  const { welcomeText, message } = getEmailContent(type);
  const { actionText, actionUrl } = getEmailAction(type, token);
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${welcomeText}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                padding: 20px;
                max-width: 600px;
                margin: auto;
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
            }
            .button {
                background-color: #007BFF;
                color: #ffffff;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${welcomeText}</h1>
            <p>${message}</p>
            <a href="${actionUrl}" style="color:white" class="button">${actionText}</a>
            <p>Se você não solicitou isso, ignore esta mensagem.</p>
        </div>
    </body>
    </html>
  `;

  return html;
};
