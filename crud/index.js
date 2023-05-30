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
  const { username } = req.body;
  console.log("regis", req.body.password);
  const user = await user_model.findOne({ email })
  if (user) {
    return res.status(400).json({ error: "User Already Exist" })
  }
  const userr = await user_model.findOne({ username });
  if (userr) {
    return res.status(400).json({ error: "this username is taken already" })
  }
  const data = new user_model(req.body)
  const value = await data.save()
  res.status(200).json({ message: "Registered Succesfully" });
})

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    console.log("login",req.body.password);
    const user = await user_model.findOne({ email: req.body.email })
    if (user) {
      let epass = req.body.password
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
          res.status(400).json({ error: "Incorrect credentials" })
        }
      })
    } else {
      res.status(400).json({ error: "User not found" });
    }
  }else {
    res.status(400)
       .json({error: "login credentials are required",})
  }
})

app.post("/changePassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body
  const user = await user_model.findOne({ email })

  if (!user) {
    return res.status(400).json({ error: "User not found" })
  }

  if (oldPassword && newPassword) {
    console.log("newpass:",newPassword);
    bcrypt.compare(oldPassword, user.password, async (err, result) => {
      if (err) {
        res.send("Something went wrong, try again!");
      } else if (result) {
        if (oldPassword === newPassword) {
          return res.status(400).json({
            error: "New password cannot be the same as the old password",
          });
        }
        let newpass = newPassword;
        const salt = await bcrypt.genSalt();
        newpass = await bcrypt.hash(newpass, salt);

        await user_model.findByIdAndUpdate(user._id, {
          password: newpass,
        });

        res.status(200).json({ message: "Changed Password Successfully"});
      } else {
        res.status(400).json({ error: "Incorrect old password" });
      }
    });
  } else {
    res.status(400).json({ error: "Input field cant be empty" });
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
    res.status(200).json({ message: "Password reset link sent" })
  })
})

app.post("/forgot/reset/:resetToken", async (req, res) => {
  const token = req.params.resetToken
  let resetpass = req.body.newPassword
  const salt = await bcrypt.genSalt();
  resetpass = await bcrypt.hash(resetpass, salt)
  console.log("g",token)
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
        res.status(200).json({ message: "Reset password Successfuly" });
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

app.post("/update/", async (req, res) => {
  const { email, username, name, auth } = req.body
  if (username && name) {
    const user1 = await user_model.findOne({ username: username });
    if (user1) {
      return res.status(400).json({ error: "this username is already taken" })
    }
    user_model
    .findOneAndUpdate(
      { email: email },
      {
        $set: {
          username: username,
          name: name,
        },
      },      
    )
    .then((user) => {
      if (user == null) {
        res.status(400).json({ error: "user not found" });
      } else {
        user_model
          .findOne({ email })
          .then((user) =>
            res.status(200).json({ message: "Updated Succesfully", user: {user, auth} })
          )
      }
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    res.status(400).json({ error: "required feild cant be empty" })
  }
})

app.post("/fetch", (req, res) => {
  const fetchusername = req.body.username;
  console.log('a',fetchusername);
  user_model
    .find({ username: fetchusername })
    .then((data) => {
      console.log("l", data);
      if (data.length == 0) {
        console.log("null");
        res.status(400).json({ error: "user not found" });
      } else {
        console.log("d-", data);
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(400).json({ error: "Something went wrong, try again later" });
      console.log(err);
    });
});

app.delete("/delete", (req, res) => {
  const deleteusername = req.body.username
  console.log(deleteusername);
  user_model
    .findOneAndDelete({ username: deleteusername })
    .then((data) => {
      if (data == null) {
        res.status(400).json({ error: "user does not exist" });
      } else {
        console.log("deleted");
        res.status(200).json({ message: "Deleted Succesfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Something went wrong" });
    });
})

app.listen(port, () => {
  console.log('Port connected: 8000')
})