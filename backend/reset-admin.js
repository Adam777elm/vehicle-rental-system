const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error("ERREUR: MONGO_URL n'est pas défini dans .env");
  process.exit(1);
}

mongoose.connect(MONGO_URL)
  .then(async () => {
    console.log("Connecté à MongoDB.");
    
    const email = "admin@aamotors.ma";
    const plainPassword = "admin123456";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    let user = await User.findOne({ email });
    
    if (user) {
      user.password = hashedPassword;
      user.role = "admin";
      await user.save();
      console.log(`Utilisateur ${email} mis à jour avec succès.`);
    } else {
      user = await User.create({
        name: "Admin AA Motors",
        email: email,
        password: hashedPassword,
        role: "admin"
      });
      console.log(`Utilisateur ${email} créé avec succès.`);
    }
    
    console.log("Mot de passe réinitialisé à: " + plainPassword);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Erreur de connexion:", err);
    process.exit(1);
  });
