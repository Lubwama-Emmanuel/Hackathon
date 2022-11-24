const nodemailer = require("nodemailer");
const pug = require("pug");
const { htmlToText } = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.summary = user.summary;
    this.result = user.result;
    this.ag = user.ag;
    this.agStatus = user.agStatus;
    this.url = url;
    this.from = `<Welcome to the ZUKTI 1.0 App>`;
    console.log("From Email:", this.firstName)
  }

  newTransport() {
      // Sendgrid
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.GOOGLE_APP_PASSWORD,
        },
      });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the ZUKTI 1.0 App!");
  }
  async sendReport() {
    await this.send("report", "Summary of report from ZUKTI!");
  }
};