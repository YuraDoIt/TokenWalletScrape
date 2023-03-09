import { EvmChain } from '@moralisweb3/common-evm-utils';
import moralis from 'moralis';
import { dateTimeUnix } from '../helpers/data-time';
import { writeFileResult } from '../helpers/write-file';

export const tokenBalance = async (req, res) => {
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
    
    writeFileResult(`${dateTimeUnix()}`, response, 'tokens-own')
    
    console.log(response.toJSON());
  }
  runApp();

  res.send("<h1>hello</h1>");
};
