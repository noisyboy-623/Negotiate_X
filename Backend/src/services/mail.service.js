import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  try {
    // 1. Refresh the Google Access Token over HTTPS (Port 443)
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        grant_type: "refresh_token",
      }),
    });
    const tokenData = await tokenRes.json();
    
    if (!tokenData.access_token) {
      throw new Error("Failed to get Google access token: " + JSON.stringify(tokenData));
    }

    // 2. Build the Raw Email MIME string locally
    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to,
      subject,
      html,
      text,
    };
    
    const transporter = nodemailer.createTransport({
      streamTransport: true,
      buffer: true,
    });
    
    const info = await transporter.sendMail(mailOptions);
    const rawMessage = info.message.toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // 3. Send over Gmail REST HTTP API (Port 443 - Never blocked!)
    const sendRes = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: rawMessage }),
    });

    const sendData = await sendRes.json();
    if (sendData.error) {
      throw new Error(sendData.error.message);
    }

    console.log("Email sent HTTP successfully: ", sendData);
  } catch (err) {
    console.log("HTTP Email sending failed:", err);
    throw err;
  }
}

