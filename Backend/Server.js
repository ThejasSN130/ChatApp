import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatroutes from "./Routes/chat.js";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/AuthRoute.js";

const app = express();
const port = 8080;

//middleweare
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());

//API Routes
app.use("/api", chatroutes);
app.use("/", authRoute);

// MongoDB connection

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

app.listen(port, () => {
  console.log("Server is running on 8080");
  connectDB();
});

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       message: [
//         {
//           role: "user",
//           content: req.body.message,
//         },
//       ],
//     }),
//   };

//   try {
//     let response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     console.log(data);
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// });
