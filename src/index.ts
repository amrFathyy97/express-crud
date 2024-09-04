import express from "express";
import databaseConnection from "./config/database.config"
import userRouter from "./routes/user.route"
import exceptionFilter from "./utils/exception.filter"

const app = express();

app.use(express.json());
app.use("/user(s)?", userRouter)
app.use(exceptionFilter)


const PORT = process.env.PORT || 4000;


const bootstrap = async () => {
    try {

        await app.listen(PORT);

        console.log("Express server up and running");

        await databaseConnection();
        console.log("MongoDB server up and running");


    }catch(err) {
        console.error(err)
    }
}

bootstrap()
