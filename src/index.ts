import dotenv from 'dotenv';
import express from 'express';
import cron from 'node-cron';
import { tokenBalance } from './services/token.balance';
import { cronJob } from './services/cron.job';

const app = express();
dotenv.config();

app.get("/", async (req, res) => {
  res.send("<h1>hello</h1>");
});

app.get("/own", tokenBalance);

cron.schedule('* * * * *', cronJob);

app.listen(process.env.PORT, () => {
  console.log(`Goto http::/localhost:${process.env.PORT}`);
})