import Erc20 from "./mederc20.abi.json";

async function approveTransfer(rpcUrl,value1,transferSel,pass)
{
    const provider = rpcUrl;
          const Web3 = require('web3');
          const value = Web3.utils.toBN(value1);
          const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
          const account = Web3Client.eth.accounts.decrypt(JSON.parse(localStorage.getItem('secret')),pass);
          console.log(transferSel.token.contract);
          const contract = new Web3Client.eth.Contract(Erc20, transferSel.token.contract,{from:account.address});
          console.log(account.address);
          const estimateGas = await Web3Client.eth.estimateGas({
            value: '0x0', // Only tokens
            data: contract.methods.approveTransfer(transferSel.sender,value).encodeABI(),
            from: account.address,
            to: transferSel.token.contract
            });
            console.log(estimateGas)
            const transactionObject  = {
              value:'0x0',
              data:contract.methods.approveTransfer(transferSel.sender,value).encodeABI(),
            from: account.address,
            to: transferSel.token.contract,
            gas:Web3Client.utils.toHex(Math.round(estimateGas * 1.10)),
            gasLimit:Web3Client.utils.toHex(210000),
            
          }
          //Sing
          const signText = await Web3Client.eth.accounts.signTransaction(transactionObject, account.privateKey);
          //Send Transaction
          const reciep = await Web3Client.eth.sendSignedTransaction(signText.rawTransaction);
          return reciep;
}
export default approveTransfer;