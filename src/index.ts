import dotenv from 'dotenv';
import express from 'express';
import cron from 'node-cron';
import { CronEtherium, TokenBalance } from './services';

const app = express();
dotenv.config();

app.get("/", async (req, res) => {
  res.send("<h1>hello</h1>");
});

app.get("/own-etherium", TokenBalance.tokenBalance);

cron.schedule('* * * * *', CronEtherium.cronJob);

app.listen(process.env.PORT, () => {
  console.log(`Goto http:/localhost:${process.env.PORT}`);
})