const mongoose = require('mongoose')

const conatactSchema =  new mongoose.Schema({
    fullName:String,
    phones: [
        {
          phone: {
            type: String,
          },
          type: {
            type: String,
          }
        }
      ],
    city:String,
    active:Boolean,
    date:{type:Date,default:Date.now},
})
module.exports = mongoose.model('Contac',conatactSchema)
module.exports.get = function (callback, limit) {
    Contac.find(callback).limit(limit);
}