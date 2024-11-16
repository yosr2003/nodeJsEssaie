// Import necessary modules
import express from "express"; // Import Express framework
import mongoose from "mongoose"; // Import Mongoose for MongoDB interactions
import bodyParser from "body-parser"; // Import Body-parser for parsing request bodies
import dotenv from "dotenv"; // Import dotenv for loading environment variables
import route from "./Routes/UserRoute.js";
import candidatRoute from "./Routes/CandidatRoute.js";
import CommentRoutes from "./Routes/CommentRoutes.js";
import ejsLayout from 'express-ejs-layouts';

// Initialize Express app
const app = express();
//ejs steps
app.set("view engine","ejs");
app.use(ejsLayout);
// etape css..
app.use(express.static("public"));
//..
app.set('layout','layout');
//analyse form html
app.use(express.urlencoded({extended:true}));

//routes
app.use(bodyParser.json());
app.use(express.json());
app.use(route); 
app.use(candidatRoute); 
app.use(CommentRoutes); 






// Load environment variables from .env file
dotenv.config();

// Define port for the server to listen on
const PORT = process.env.PORT ;

// Define MongoDB connection URL from environment variables
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB database
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully."); // Log successful database connection
    // Start server on specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`); // Log server running message
    });
  })
  .catch((error) => console.log(error)); // Log error if database connection fails


  