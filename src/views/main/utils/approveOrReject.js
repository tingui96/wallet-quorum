import Erc20 from './mederc20.abi.json';

async function approveOrReject(rpc,token,sender,value,bool)
{
  const Web3 = require('web3');
  const Web3Client = new Web3(new Web3.providers.HttpProvider(rpc));
  const contract = new Web3Client.eth.Contract(Erc20, token.contract);
  if(bool)
  {
      return await contract.methods.approveTransfer(sender,value).call();
  }
  else
  {
      return await contract.methods.rejectTransfer(sender,value).call();
  }
};
export default approveOrReject;