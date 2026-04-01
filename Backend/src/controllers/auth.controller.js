import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";
import redis from "../config/cache.js"

export async function registerController(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User with this email or username already exists",
      success: false,
      err: "User already exists",
    });
  }

  const user = await userModel.create({ username, email, password });
  const emailVerificaton = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Negotiate_X!",
    html: `
                <p>Hi ${username},</p>
                <p>Thank you registering at <strong>Negotiate_X</strong>, We're excited to have you onboard!</p>
                <P>Please verify your email by clicking on the link below: </p>
                <a href="https://negotiate-x-backend.onrender.com/api/auth/verify-email/?token=${emailVerificaton}">Verify Email </a>
                <p> If it wasn't you , please ignore this email. </p>
                <p>Best Regards, <br>The Negotiate_X Team </p>
                `,
  });

  return res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      email: decoded.email,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "User not found",
      });
    }

    user.verified = true;
    await user.save();

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified - NEGOTIATE_X</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0B0F0E 0%, #060707 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .animated-bg {
            position: fixed;
            inset: 0;
            z-index: -1;
            overflow: hidden;
          }

          .blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.15;
          }

          .blob-1 {
            width: 300px;
            height: 300px;
            background: #02C173;
            top: 10%;
            left: 10%;
            animation: float 6s ease-in-out infinite;
          }

          .blob-2 {
            width: 250px;
            height: 250px;
            background: #02C173;
            bottom: 10%;
            right: 10%;
            animation: float 8s ease-in-out infinite reverse;
          }

          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, 20px); }
          }

          .container {
            background: rgba(11, 15, 14, 0.8);
            border: 1px solid rgba(2, 193, 115, 0.2);
            border-radius: 20px;
            padding: 50px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(2, 193, 115, 0.1);
            animation: slideIn 0.6s ease-out;
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .success-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 30px;
            background: linear-gradient(135deg, #02C173, #00a366);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            animation: scaleIn 0.6s ease-out;
            box-shadow: 0 0 30px rgba(2, 193, 115, 0.4);
          }

          @keyframes scaleIn {
            from {
              transform: scale(0.5);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          h1 {
            color: #ffffff;
            font-size: 28px;
            margin-bottom: 15px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }

          .subtitle {
            color: #ffffff;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: 600;
          }

          p {
            color: #a0a0a0;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 35px;
          }

          .login-btn {
            display: inline-block;
            background: linear-gradient(135deg, #02C173, #00a366);
            color: #000;
            text-decoration: none;
            padding: 14px 40px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 16px;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            box-shadow: 0 4px 15px rgba(2, 193, 115, 0.3);
            margin-bottom: 20px;
            display: block;
          }

          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(2, 193, 115, 0.5);
          }

          .login-btn:active {
            transform: translateY(0);
          }

          .timer {
            color: #666;
            font-size: 14px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(2, 193, 115, 0.1);
          }

          .timer strong {
            color: #02C173;
          }

          .brand {
            font-size: 20px;
            font-weight: 900;
            margin-bottom: 30px;
            letter-spacing: 1px;
          }

          .brand span:first-child {
            color: #02C173;
          }

          .brand span:last-child {
            color: #ffffff;
          }
        </style>
      </head>
      <body>
        <div class="animated-bg">
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
        </div>

        <div class="container">
          <div class="brand">
            <span>NEGOTIATE_</span><span>X</span>
          </div>

          <div class="success-icon">✓</div>

          <h1>Email Verified!</h1>
          <p class="subtitle">You're all set to begin your negotiation journey</p>
          <p>Your email has been verified successfully. You can now log in to your account and start playing.</p>

          <a href="https://negotiate-x-frontend.onrender.com/login" class="login-btn">Go to Login</a>

          <div class="timer">
            Redirecting in <strong>5 seconds</strong>... or click the button above.
          </div>
        </div>

        <script>
          setTimeout(() => {
            window.location.href = 'https://negotiate-x-frontend.onrender.com';
          }, 5000);
        </script>
      </body>
      </html>
    `;

    return res.send(html);
  } catch (err) {
    return res.status(400).json({
      message: "Invalid or expired token",
      success: false,
      err: err.message,
    });
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
      err: "User not found",
    });
  }
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
      err: "Incorrect password",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email before logging in",
      success: false,
      err: "Email not verified",
    });
  }

  const token = jwt.sign(
    {
      id:user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // ✅ REQUIRED for HTTPS (Render)
  sameSite: "none",    // ✅ REQUIRED for cross-origin
  path: "/",           // ✅ good practice
});

  res.status(201).json({
    message: "User logged-in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function getMeController(req, res) {

    const userId = req.user.id
    console.log(req.user)

    const user = await userModel.findById(userId).select("-password")

    if(!user){
        return res.status(404).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }

    res.status(200).json({
        message: "User details fetched successfully",
        success: true,
        user
    })
}

export async function logoutUser(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
});

  await redis.set(token, Date.now().toString(),"EX",60*60)

  res.status(200).json({
    message: "User logged out successfully",
  });
}