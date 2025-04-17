const mongoose=require('mongoose');
const colors=require('colors');

const connectDB=async ()=>{
try{
await mongoose.connect(process.env.MONGO_URL)
console.log(`mongodb connceted ${mongoose.connection.host}`.bgGreen.white);
}catch(error){
    console.log(`mongodb server error ${error}`.bgRed.white);
}

}
 
module.exports=connectDB;