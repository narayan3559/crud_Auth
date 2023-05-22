const user_model = require('../models/user_collection')
const nodemailer = require('nodemailer')

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body

  const user = await user_model.findOne({ email })

  if (!user) {
    return res.status(400).json({ error: "User not found" })
  }

  const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
  const expiration = new Date(Date.now() + 3600000)

  await user_model.findByIdAndUpdate(user._id, {
    reset_token: token,
    reset_token_expiration: expiration,
  })

  const resetLink = `http://localhost:3000/reset-password/${token}`;
  const message = {
    to: user.email,
    subject: "Password reset request",
    text: `Please click the link below to reset your password: ${resetLink}`,
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.email
    },
  })

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
      return res.status(400).json({ error: "Unable to send email" });
    }
    console.log("Message sent successfully!");
    console.log('Server responded with "%s"', info.response);
    res.json({ message: "Password reset link sent" });
  });

  res.json({ message: "Password reset link sent" });
})
//