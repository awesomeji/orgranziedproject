const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventsSchema = mongoose.Schema({

 event:{
   type: Object,
 },
  
 writer : {
  type:Schema.Types.ObjectId,
  ref:'User'
}
},{timestamps:true});



const Events =  mongoose.model('Events', EventsSchema);

module.exports = {Events}