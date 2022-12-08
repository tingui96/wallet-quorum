import getValueToApprove from './getValueToApprove';

async function getAllValue(rpc,token,publicKey,senders)
{
  var item = {
     medicina: token,
     senders: '',
     value: 0
  }
  senders?.map(async(element)=>
  {
     await getValueToApprove(rpc,token,publicKey,element)
     .then(data=>
        {
            item.senders = element;
            item.value = data;
        }
        );
  })
  return item; 
};
export default getAllValue;