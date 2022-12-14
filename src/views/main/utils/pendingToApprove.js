import Erc20 from './mederc20.abi.json';

async function pendingToApprove(rpc,token,publicKey)
{
  const Web3 = require('web3');
  const Web3Client = new Web3(new Web3.providers.HttpProvider(rpc));
  const contract = new Web3Client.eth.Contract(Erc20, token.contract);
  var isPending;
  await contract.methods.transferPendingToApprove(publicKey).call()
          .then(async(data) => {
            isPending = await data;
          });
  return isPending;
};
export default pendingToApprove;