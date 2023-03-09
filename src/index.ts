import dotenv from 'dotenv';
import express from 'express';
import cron from 'node-cron';
import fetch from 'node-fetch';
import { dateTimeUnix } from './helpers/data-time';
import { writeFileResult } from './helpers/write-file';
import { blockType } from './types/block-type';
import Web3 from 'web3';
import moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const app = express();
dotenv.config();

let scanUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.WALLET_HASH}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`;

cron.schedule('* * * * *', async function() {
  let result: blockType = await fetch(scanUrl)
  .then(res => Promise.all([res.status, res.json()]))
  .then(([status, jsonData]) => {
    return jsonData;
  });
  result.timeFetched = dateTimeUnix();

  writeFileResult(`${dateTimeUnix()}`, result);
});

app.get("/", async (req, res) => {
  const runApp = async () => {
    await moralis.start({
      apiKey: `${process.env.MORALIS_API}`,
    });
    
    const address = `${process.env.WALLET_HASH}`;
    const chain = EvmChain.ETHEREUM;
    const response = await moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });
    
    console.log(response.toJSON());
  }
  runApp();
  res.send("<h1>hello</h1>");
});


app.listen(process.env.PORT, () => {
  console.log(`Goto http::/localhost:${process.env.PORT}`);
})