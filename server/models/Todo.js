const mongoose = require( 'mongoose' )


const todoSchema = new mongoose.Schema( {
  title: {
    type: String,
    require: [true, "Item must have a title"]
  },
  body: {
    require: [true, "Item must have body"]
  }
}, {
  timestamps: true
} )

const Todo = mongoose.model( "Todo", todoSchema )

module.exports = Todo