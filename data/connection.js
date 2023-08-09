import mongoose from "mongoose";
export const connectdb = ()=> {
mongoose.connect("mongodb://127.0.0.1:27017",{dbName:"backendapi",})
.then(()=>console.log("Database Connected"))
.catch((e)=>console.log(e));
}