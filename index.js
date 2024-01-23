const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const cors = require("cors");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log("db connection successful"))
    .catch((err)=>{console.log(err);
});


app.use("/hello-world",(req, res) => {
    res.send({message: 'Hello-world', code: 200})
});

app.use(cors({
    origin: ["https://redux-fe.vercel.app"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));

// middleware
app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);


// app.use("/api/auth", useR   )
// app.get("/", (req, res)=>{
//     res.send("asdkflj");
// })

app.listen(8800,()=>{
    console.log("server is running")
})