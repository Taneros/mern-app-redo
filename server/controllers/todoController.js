const Todo = require( "../models/toDo" )

exports.getAllTodos = async ( req, res, next ) => {
  
  try {
    const todos = await Post.find()
    
    res.status( 200 ).json( {
      status: 'success',
      results: posts.length,
      data: {
        todos
      }
    })
  } catch (error) {
    res.status( 400 ).json( {
      status: 'failed to Get'
    })
  }

}