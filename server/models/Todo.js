const mongoose = require( 'mongoose' )

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Item must have a title"]
    },
    body: {
      type: String,
      required: [true, "Item must have body"]
    }
  }, {
  timestamps: true
} )

const Todo = mongoose.model( "Todo", todoSchema )

module.exports = Todo