import Erc20 from './erc20.abi.json';

async function connectToken(rpc,tokenAddress,publicKey)
    {
        const Web3 = require('web3');
        const Web3Client = new Web3(new Web3.providers.HttpProvider(rpc));
        const contract = new Web3Client.eth.Contract(Erc20, tokenAddress);
        var token = {
          symbol: '',
          balance: '',
          contract: tokenAddress
        }
        await contract.methods.symbol().call()
          .then( data => { token.symbol = data });
        await contract.methods.balanceOf(publicKey).call()
          .then(data => {token.balance = data});
        return token;
    };
export default connectToken;