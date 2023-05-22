//
const mongoose = require('mongoose')

const db =()=> {
   mongoose
  .connect("mongodb://127.0.0.1:27017/Author_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log("error"))
  .then(console.log("Database connected"));
}

module.exports = db