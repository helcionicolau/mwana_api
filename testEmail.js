require('dotenv').config();
const nodemailer = require('nodemailer');

async function testarEmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"SecureGest" <${process.env.EMAIL_USER}>`,
            to: "antonio.baptista_@outlook.com",
            subject: "Teste de E-mail",
            text: "Este é um teste de envio de e-mail via Nodemailer!",
        });

        console.log("✅ E-mail enviado:", info.messageId);
    } catch (error) {
        console.error("❌ Erro ao enviar e-mail:", error);
    }
}

testarEmail();
