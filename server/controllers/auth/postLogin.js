const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    console.log("login event came");
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail.toLowerCase() });
console.log(user,"in login credentials runs");

    if (user && (await bcrypt.compare(password, user.password))) {
      // send new token
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      console.log("running",user);

      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id
        },
      });
    }

    return res.status(400).send("Invalid credentials. Please try again");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postLogin;
