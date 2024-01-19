require( "dotenv" ).config();
const express = require( "express" );
const connectToDB = require( "./database/db" );

const todoRouter = require("./routes/todoRoutes")

const app = express();

connectToDB();

app.use( express.json() );

const PORT = process.env.PORT || 5050;

app.use( "/todos/", todoRouter )

app.get("/test", (req, res) => {
    res.json({
        Hi: "Welcome to the MERN TODO API",
    });
} );

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
