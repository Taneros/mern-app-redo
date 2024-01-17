const mongoose = require( "mongoose" );

const connectToDB = async () => {
    try {
	const connect = await mongoose.connect(process.env.MONGO_URI, {
		dbName: process.env.DB_NAME,
	});
	    console.log(`MongoDB connected: ${connect.connection.host}`);
} catch (error) {
	        console.error(`MongoDB connection error: ${error.message}`);

}
};

module.exports = connectToDB;