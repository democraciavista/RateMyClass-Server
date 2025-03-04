export default (name: string, subjectText: string, type: 'emailVerify') => {
  const welcomeText = `Confirmação de e-mail para ${name}!`;

  const message = 'Utilize o código abaixo para confirmar o seu e-mail:';

  const html = `
  <html>
    <body>
      <div 
        style="
          width: 80%; 
          height: 100%; 
          background-color: #FFFFFF; 
          padding: 20px;
      ">
        <h1 style="font-size: 24px; font-weight: 600; color: #1B4A85; margin-bottom: 20px;">${welcomeText}</h1>
        <p style="font-size: 16px; font-weight: 400; color: #1B4A85; margin-bottom: 20px;">${message}</p>  
        <div style="width: 100%; padding: 20px; background-color: #ADB5BD; border-radius: 10px;">
          <p style="font-size: 16px; font-weight: 400; color: #1B4A85; margin-bottom: 20px;">${subjectText}</p>
        </div>
        <p style="font-size: 16px; font-weight: 400; color: #1B4A85; margin-bottom: 20px;">Se você não solicitou isso, ignore este e-mail.</p>
      </div>
    </body>
  </html>
  `;

  return html;
};
