import fetch from 'node-fetch';
import { dateTimeUnix } from '../helpers/data-time';
import { writeFileResult } from '../helpers/write-file';
import { blockType } from '../types/block-type';

let scanUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.WALLET_HASH}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`;

export const cronJob = async () => {
  let result: blockType = await fetch(scanUrl)
  .then(res => Promise.all([res.status, res.json()]))
  .then(([status, jsonData]) => {
    return jsonData;
  });
  result.timeFetched = dateTimeUnix();

  writeFileResult(`${dateTimeUnix()}`, result, 'token-ec20');
}