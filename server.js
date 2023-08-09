import { app } from "./app.js";
import {connectdb} from "./data/connection.js";

connectdb();

app.listen(process.env.PORT,()=>{console.log(`server is working on port ${process.env.PORT} and mode is ${process.env.NODE_ENV}`)});


// set NODE_ENV=Production&& 