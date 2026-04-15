const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ayaushSchema = new Schema({
   title: {
    type : String ,
    required : true ,
   } ,
   category:{
      type : String,
   },
   image : {

      type : String,
   }, 
   description: {
       type : String,
   },
   benefits : {
      type : [String],
     
   },
   ingredients : [String],
   preparation : {
      type : String,
   },
   usage : {
      type : String,
   },
   precautions : {
      type : String,
   }
});
const Ayaush = mongoose.model("Ayaush" , ayaushSchema);
module.exports = Ayaush;