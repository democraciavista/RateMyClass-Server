import { EmailTemplate } from '@@types/emailTemplate';

function getEmailContent(type: EmailTemplate): {
  welcomeText: string;
  message: string;
} {
  if (type === 'emailVerify') {
    return {
      welcomeText: 'Seu código de verificação',
      message: 'Cópie e cole o código abaixo para concluir a autenticação:',
    };
  }
  return {
    welcomeText: 'Esqueceu a sua senha?',
    message: 'Cópie e cole o código para recuperar a sua senha',
  };
}

export default (token: string, type: EmailTemplate) => {
  const { welcomeText, message } = getEmailContent(type);
  const html = `
<head>
  <meta charset="UTF-8">
  <title>Verificação de E-mail</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #007FFF;
      margin-bottom: 20px;
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .message {
      font-size: 16px;
      color: #555;
      margin-bottom: 20px;
    }

    .code-box {
      display: inline-block;
      background-color: #f0f0f0;
      padding: 12px 24px;
      font-size: 22px;
      letter-spacing: 4px;
      font-weight: bold;
      border-radius: 6px;
      color: #007FFF;
      user-select: all;
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">Rate My Class</div>
    <div class="title">${welcomeText}
    </div>
    <div class="message">
      ${message}
    </div>
<div class="code-box" title="Clique com o botão direito para copiar" style="cursor: text; font-family: 'Courier New', monospace;">
 ${token}
</div>    <div class="footer">
      Se você não solicitou este código, ignore este e-mail.
    </div>
  </div>
</body>
</html>
  `;

  return html;
};
