import Erc20 from './mederc20.abi.json';

async function getValueToAprove(rpc,token,publicKey,sender)
{
  const Web3 = require('web3');
  const Web3Client = new Web3(new Web3.providers.HttpProvider(rpc));
  const contract = new Web3Client.eth.Contract(Erc20, token.contract);
  var value = 0
  await contract.methods.getValueToApprove(sender,publicKey).call()
          .then(data => {
            value = data
        });
  return value; 
};
export default getValueToAprove;