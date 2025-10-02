import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mailchimpRoutes from "./routes/integrations.routes"; 


dotenv.config();

const portEnv = process.env.PORT;

if (!portEnv) {
  console.error("Error: PORT IS NOT DEFINED IN .env FILE");
  process.exit(1);
}

const PORT: number = parseInt(portEnv, 10);
if (isNaN(PORT)) {
  console.error("ERROR: PORT IS NOT A NUMBER IN .env file");
  process.exit(1);
}

const app = express();
const corsOption = {
  origin: "*",
  credentials: true,
  allowedHeaders: "*",
  methods: "GET, HEAD, POST",
};

app.use(cors(corsOption));

app.use(express.json());
app.use("/api/integrations", mailchimpRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});