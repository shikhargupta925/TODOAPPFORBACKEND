import express from "express";
import userRouter from "./router/user.js"
import taskRouter from "./router/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middleware/error.js";
import cors from "cors"

export const app = express();
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));
config({
    path:"./data/config.env"
})
app.use(express.json());
app.use("/api/v1/users",userRouter);

app.use("/api/v2/task",taskRouter);
app.use(errorMiddleware);

app.use((err,req,res,next)=>{
return res.status(404).json({
    success:false,
    message:err.message,
})

})
 