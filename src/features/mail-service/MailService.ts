import NodeMailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { MailData } from './Types';
import config from '../../config';

const mailConfig = config.MAIL;

export class MailService {
  createTransporter() {
    return NodeMailer.createTransport({
      host: mailConfig.MAIL_HOST,
      port: mailConfig.MAIL_PORT,
      secure: true,
      auth: {
        user: mailConfig.MAIL_AUTH_USER,
        pass: mailConfig.MAIL_AUTH_PASSWORD,
      },
    });
  }

  async send(mailData: MailData) {
    const transporter = this.createTransporter();
    const __dirname = path.resolve(); // This will get the project root folder
    const filePath = path.join(__dirname, `./src/templates/${mailData.templateName}.html`); // Ensure templateName is provided in MailData

    try {
      const source = await fs.promises.readFile(filePath, 'utf-8'); // Read the HTML template from the file asynchronously
      const template = handlebars.compile(source); // Compile the Handlebars template
      const replacements = mailData.replacements || {}; // Define the replacements object, make sure to include all necessary placeholders
      const htmlToSend = template(replacements); // Generate the final HTML by applying the replacements
      const mailOptions = {
        from: `<${mailConfig.MAIL_AUTH_USER}>`,
        to: mailData.to,
        subject: mailData.subject,
        html: htmlToSend,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log('Mail sent successfully: %s', info.messageId);
    } catch (error) {
      console.error('Error sending mail:', error);
      throw new Error('Unable to send mail');
    }
  }
}
