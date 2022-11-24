const app = require("./app");
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config({ path: "./config.env" })

const port = process.env.PORT || 4000;
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB).then((con) => console.log("DATABASE CONNECTED")).catch(err => console.log("OOooooops NOT"))

app.listen(port, () => {
    console.log(`---server is listening to ${port}`)
})