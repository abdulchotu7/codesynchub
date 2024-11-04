import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./config/db.js";
import cpRoutes from "./routes/cpRoutes.js";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

dbconnect();

app.use('/api/v1/cp', cpRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/scrap', (req, res) => {
    const { url } = req.query;
    console.log(url);
    if (!url) {
        return res.status(400).send('URL query parameter is required');
    }

    exec(`python scrape.py "${url}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('An error occurred while running the script.');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Script produced errors.');
        }
        res.status(200).redirect('/sc');
    });
});

app.get('/sc', (req, res) => {
    exec('python sc.py', (error) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('An error occurred while running the script.');
        }
        const dataPath = path.join(__dirname, 'data', 'scraped_data.json');
        res.sendFile(dataPath);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
