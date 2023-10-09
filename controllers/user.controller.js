const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Function

const subscribe = async (req, res) => {
  try {
    const { fullName, role, email, password, phone } = req.body;

    if (!(email && password && fullName && role && phone)) {
      res.status(400).send("All input is required");
      return;
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");  
    }
    
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName: fullName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: role,
      phone: phone
    });  

    const token = jwt.sign(
      { user_id: user._id, email }, 
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );
    user.token = token;  
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  } 
};

// Login Function

const loginUser = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });  
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email, role:user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );  
      user.token = token;
      res.status(200).send({
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role:user.role
        },
        message: "Login successfull",
        accessToken: token,
      })
    }
    else
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  };

  // function get delivery

  const getAllDelivery = async(req , res)=>{
    try {
        const delivery = await User.find({role:'delivery'})
        res.status(200).json({"All delivery":delivery})
    } catch (error) {
        res.status(500).json({error:'internal server error'})
    }
  }

module.exports = { subscribe , loginUser , getAllDelivery};
