const chai = require( 'chai' )
const chaiHttp = require( 'chai-http' )

const expect = chai.expect
const should = chai.should()

chai.use( chaiHttp )

describe( 'Test API is running', () => {
  it( 'should respond with status 200', ( done ) => {
    chai
      .request( 'http://localhost:5050' )
      .get( '/welcome' )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        done();
      } );
  } );
} );

describe( 'Test API /todos/ route', () => {
  let createdTodoId;

  // Test GET /todos
  it( 'should get all todos', ( done ) => {
    chai
      .request( 'http://localhost:5050' )
      .get( '/todos' )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        expect( res.body.status ).to.equal( 'success' );
        expect( res.body.results ).to.be.an( 'number' );
        expect( res.body.data.todos ).to.be.an( 'array' );
        done();
      } );
  } );

  // Test POST /todos
  it( 'should create a new todo', ( done ) => {
    chai
      .request( 'http://localhost:5050' )
      .post( '/todos' )
      .send( {
        title: 'New Todo',
        body: 'This is a new todo',
      } )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        expect( res.body.status ).to.equal( 'success' );
        expect( res.body.data.todo.title ).to.equal( 'New Todo' );
        expect( res.body.data.todo.body ).to.equal( 'This is a new todo' );

        createdTodoId = res.body.data.todo._id; // Store the ID for further testing
        done();
      } );
  } );

  // Test multiple POST /todos
  it( 'should create 5 new todos', ( done ) => {
    // Make 5 requests in parallel
    const requests = Array.from( {length: 5}, ( _, index ) => {
      const randomTitle = `Chore ${ index + 1 }`;
      const randomBody = `Description for chore ${ index + 1 }`;

      return chai
        .request( 'http://localhost:5050' )
        .post( '/todos' )
        .send( {
          title: randomTitle,
          body: randomBody,
        } );
    } );

    // Wait for all requests to complete
    Promise.all( requests )
      .then( ( responses ) => {
        // Check each response
        responses.forEach( ( res, index ) => {
          expect( res ).to.have.status( 200 );
          expect( res.body.status ).to.equal( 'success' );
          expect( res.body.data.todo.title ).to.equal( `Chore ${ index + 1 }` );
          expect( res.body.data.todo.body ).to.equal( `Description for chore ${ index + 1 }` );
        } );

        done();
      } )
      .catch( ( error ) => {
        done( error );
      } );
  } );

  // Test GET /todos/:id
  it( 'should get a single todo by ID', ( done ) => {
    chai
      .request( 'http://localhost:5050' )
      .get( `/todos/${ createdTodoId }` )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        expect( res.body.status ).to.equal( 'success' );
        expect( res.body.data.todo.title ).to.equal( 'New Todo' );
        expect( res.body.data.todo.body ).to.equal( 'This is a new todo' );
        done();
      } );
  } );

  // Test PATCH /todos/:id
  it( 'should update a todo by ID', ( done ) => {
    chai
      .request( 'http://localhost:5050' )
      .patch( `/todos/${ createdTodoId }` )
      .send( {
        title: 'Updated Todo',
        body: 'This todo has been updated',
      } )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        expect( res.body.status ).to.equal( 'success' );
        expect( res.body.data.todo.title ).to.equal( 'Updated Todo' );
        expect( res.body.data.todo.body ).to.equal( 'This todo has been updated' );
        done();
      } );
  } );

  // Test DELETE /todos/:id
  it( 'should delete a todo by ID', ( done ) => {
    chai
      .request( 'http://localhost:5050' )
      .delete( `/todos/${ createdTodoId }` )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        expect( res.body.status ).to.equal( 'success' );
        done();
      } );
  } );
} );
