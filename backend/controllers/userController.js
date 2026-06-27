const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Utilisateur existe déjà",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email incorrect",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Generate random 6 digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Mock SMTP config using Nodemailer (Ethereal or simple console)
    const nodemailer = require("nodemailer");
    
    // In a production app, use real SMTP credentials. For now, we mock.
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "aa.motors.demo@ethereal.email", // Mock user
        pass: "mockpassword123", // Mock password
      },
    });

    const mailOptions = {
      from: '"AA Motors Support" <support@aamotors.ma>',
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #ea3f33;">AA Motors</h2>
          <p>Bonjour,</p>
          <p>Voici votre code de réinitialisation de mot de passe :</p>
          <h1 style="background: #f8f9fa; padding: 10px; display: inline-block; border-radius: 5px; letter-spacing: 5px;">${resetCode}</h1>
          <p>Ce code est valable pendant 15 minutes.</p>
          <p>Si vous n'avez pas demandé de réinitialisation, veuillez ignorer cet email.</p>
        </div>
      `,
    };

    // Since we don't have real credentials, we just log it to console to simulate
    console.log("=====================================");
    console.log("Mock Email Sent to:", email);
    console.log("Recovery Code:", resetCode);
    console.log("=====================================");
    
    // In real app: await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Email de récupération envoyé",
      code: resetCode // Returning code for frontend mock simulation (In prod, save to DB and don't return)
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};