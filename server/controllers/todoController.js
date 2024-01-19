const Todo = require( "../models/toDo" )

exports.getAllTodos = async ( req, res, next ) => {
  
  try {
    const todos = await Todo.find()
    
    return res.status( 200 ).json( {
      status: 'success',
      results: todos.length,
      data: {
        todos
      }
    })
  } catch (error) {
    res.status( 400 ).json( {
      status: 'failed to GET'
    })
  }
}

exports.getOneTodo = async ( req, res, next ) => {
  
  try {

    const todo = await Todo.findById(req.params.id)

    return res.status( 200 ).json(
      {
        status: 'success',
        data: {
          todo
        }
      }
    )
    
  } catch (error) {
    res.status( 400 ).json( {
      status: 'failed to GET'
    })    
  }
}

exports.createTodo = async ( req, res, next ) => {

  try {

    const todo = await Todo.create(req.body)

    return res.status( 200 ).json(
      {
        status: 'success',
        data: {
          todo
        }
      }
    )

  } catch ( error ) {
    res.status( 400 ).json( {
      status: 'failed to GET'
    } )
  }
}

exports.updateTodo = async ( req, res, next ) => {

  try {

    const todo = await Todo.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    return res.status( 200 ).json(
      {
        status: 'success',
        data: {
          todo
        }
      }
    )

  } catch ( error ) {
    res.status( 400 ).json( {
      status: 'failed to GET'
    } )
  }
}

exports.deleteTodo = async ( req, res, next ) => {

  try {

    await Todo.findByIdAndDelete(req.params.id)

    return res.status( 200 ).json(
      {
        status: 'success',
      }
    )

  } catch ( error ) {
    res.status( 400 ).json( {
      status: 'failed to GET'
    } )
  }
}

