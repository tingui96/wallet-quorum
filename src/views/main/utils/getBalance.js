import Erc20 from './mederc20.abi.json';

async function getBalance(rpc,token,publicKey)
{
  const Web3 = require('web3');
  const Web3Client = new Web3(new Web3.providers.HttpProvider(rpc));
  const contract = new Web3Client.eth.Contract(Erc20, token.contract);
  var tok =
  {
          symbol: token.symbol,
          balance: token.balance,
          contract: token.contract
  }
  await contract.methods.balanceOf(publicKey).call()
          .then(data => {tok.balance = data});
  return tok; 
};
export default getBalance;