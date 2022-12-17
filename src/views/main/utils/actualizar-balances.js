import getBalance from './getBalance';

async function actualizarBalance(rpc,publicKey,list,setList)
{
    var newList = await Promise.all(list?.map(
        async (element) => 
        {
          return await getBalance(rpc,element,publicKey)
        }
      ))
    setList(newList);
};
export default actualizarBalance;