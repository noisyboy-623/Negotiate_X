import nodemailer from "nodemailer";

async function test() {
    const transporter = nodemailer.createTransport({
        streamTransport: true,
        buffer: true, // returns buffer
    });

    const info = await transporter.sendMail({
        from: "test@example.com",
        to: "foo@example.com",
        subject: "Hello",
        html: "<p>World</p>"
    });

    console.log(info.message.toString('base64').substring(0, 50));
}
test();
