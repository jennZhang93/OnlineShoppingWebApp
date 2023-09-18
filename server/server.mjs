import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import bodyParser from "body-parser";
import routes from './routes/index.mjs'; 

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routes);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});