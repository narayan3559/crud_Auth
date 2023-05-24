const express = require('express')
const app = express()
const port = 8000
const db = require('./config/user')
const cors = require('cors')
const user_model = require('./models/user_collection')
const jwt = require('jsonwebtoken')
const PRIVATE_KEY = '02Ni@wBb4Eu2'
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
const otpGenerator = require('otp-generator')

app.use(express.json())
db()
app.use(cors())

app.post("/register", async(req, res) => {
  const { email } = req.body;
  console.log(req.body.password);
  const user = await user_model.findOne({ email })
  if (user) {
    return res.status(400).json({ error: "User Already Exist" })
  }
  const { username } = req.body;
  const userr = await user_model.findOne({ username });
  if (userr) {
    return res.status(400).json({ error: "this username is taken, try with diffrent username" })
  }
  const data = new user_model(req.body)
  const value = await data.save()
  res.json(value)
})

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    const user = await user_model.findOne({ email: req.body.email })
    if (user) {
      let epass = req.body.password
      // console.log(epass)
      bcrypt.compare(epass, user.password, (err, result) => {
        if (err) {
          res.send("something went wrong")
        } else if (result) {
          jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "7d" }, (err, token) => {
            if (err) {
              res.send("something went wrong")
            }
            res.send({ user, auth: token })
          })
        } else {
          res.send("incorrect credentials")
        }
      })
    } else {
      res.send("user not found")
    }
  }else {
    res.status(400)
       .json({error: "login credentials are required",})
  }
})

app.put("/changePassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body
  const user = await user_model.findOne({ email })

  if (!user) {
    return res.status(400).json({ error: "User not found" })
  }

  if (oldPassword && newPassword) {
    bcrypt.compare(oldPassword, user.password, async (err, result) => {
      if (err) {
        res.send("Something went wrong, try again!")
      } else if (result) {
          if (oldPassword === newPassword) {
            return res
              .status(400)
              .json({
                error: "New password cannot be the same as the old password",
              });
          }
        let newpass = newPassword
        const salt = await bcrypt.genSalt()
        newpass = await bcrypt.hash(newpass, salt)

        await user_model.findByIdAndUpdate(user._id, {
          password: newpass,
        })

        res.send("Changed password successfully")
      } else {
        res.status(400).json({ error: "Incorrect old password" })
      }
    })
  }
})

app.post("/forgot", async (req, res) => {
  const { email } = req.body;
  const user = await user_model.findOne({ email })
  if (!user) {
    return res.status(400).json({ error: "User not found" })
  }

  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
  });
  const token = Math.random().toString(36).substr(2) + Date.now().toString(36)
  const expiration = new Date(Date.now() + 600000)

  await user_model.findByIdAndUpdate(user._id, {
    reset_token: token,
    reset_token_expiration: expiration,
    permit: true,
    otp: otp,
    otp_expiration: expiration,
  });

  const resetLink = `http://localhost:3000/forgot/reset/${token}`
  const message = {
    to: email,
    subject: "Password reset request",
    text: `Please click the link below to reset your password: ${resetLink}\n\nYour OTP: ${otp}`,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "narayan35594004@gmail.com",
      pass: "yfdnjinpriebryct",
    },
  })

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred")
      console.log(error.message)
      return res.status(400).json({ error: "Unable to send email" })
    }
    console.log("Message sent successfully!")
    console.log('Server responded with "%s"', info.response)
    res.json({ message: "Password reset link sent" })
  })
})

app.put("/forgot/reset/:resetToken", async (req, res) => {
  const token = req.params.resetToken
  let resetpass = req.body.newPassword
  const salt = await bcrypt.genSalt();
  resetpass = await bcrypt.hash(resetpass, salt)
  console.log(token)
  const user = await user_model.findOne({ reset_token: token })
  if (!user) {
    return res.status(400).json({ error: "Invalid link" })
  }
  if (user.reset_token_expiration < Date.now()) {
    return res.status(400).json({ error: "link is expired" })
  }
  if (user.otp !== req.body.otp || user.otp_expiration < Date.now()) {
    return res.status(400).json({ error: "Invalid OTP" });
  }
  if(user.permit == false) {
    return res.status(400).json({ error: "link is already used" })
  }
  await user_model
    .findOneAndUpdate(
      { reset_token: token },
      {
        $set: {
          password: resetpass,
        },
      }
    )
    .then((data) => {
      if (data == null) {
        res.send("data not found")
      } else {
        // res.send(data)
        res.send("Reset password Successfuly")
      }
    })
    .catch((err) => {
      console.log(err)
    })
  await user_model.findByIdAndUpdate(user._id, {
    permit: false,
  })
})

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded.user;
    next();
  });
}

app.post("/private", verifyToken, async (req, res) => {
  res.send("Private route accessed");
})

app.put("/update/:username", (req, res) => {
  let updateusername = req.params.username
  let updateName = req.body.name
  user_model
    .findOneAndUpdate(
      { username: updateusername },
      {
        $set: {
          name: updateName,
        },
      },      
    )
    .then((data) => {
      if (data == null) {
        res.send("data not found")
      } else {
        // res.send(data)
        res.send("success")
      }
    })
    .catch((err) => {
      console.log(err);
    });
})

app.get('/fetch/:username', (req, res) => {
  let fetchusername = req.params.username
  user_model
    .find({ username: fetchusername })
    .then((data) => {
      if (data.length == 0) {
        res.send("data does not exist")
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      console.log(err)
    });
})

app.delete("/delete/:username", (req, res) => {
  let deleteusername = req.params.username
  user_model
    .findOneAndDelete({ username:deleteusername })
    .then((data) => {
      if (data == null) {
        res.send("Cant delete, data not found")
      } else {
        res.send('deleted');
      }
    })
    .catch((err) => {
      console.log(err)
    });
})

app.listen(port, () => {
  console.log('Port connected: 8000')
})