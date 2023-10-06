const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require('../models/user')
const Userschema = {
    signup: async (req, res) => {
        const { email, password } = req.body;
        try {
          const user = await User.findOne({ email });
          if (user) {
            return res.status(401).json({ message: "emailAll ready exists" });
          }
    
          const hash = await bcrypt.hash(password, 10);
          const newuser = await User.create({ email, password: hash});
    
          return res.json({
            user:newuser,
            success: true,
            message: "User created successfully ",
          });
        } catch (err) {
          return res.json({ success: false, message: err.message });
        }
      },
      // for login user
      login: async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) throw new Error("User not found");
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({message: "invalid password"})
          }//{throw new Error("Invalid password")};
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          await User.updateOne({ _id: user.id}, { token: token });
    
          
    
          res.status(200).json({ message: "login successful", token: token });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: error });
        }
      },
}

module.exports = Userschema