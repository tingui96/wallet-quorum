import pendingToApprove from './pendingToApprove';

async function actualizarPending(rpc,publicKey,list,setPending)
{
    var newPending = await Promise.all(list?.map(
        async (element) => 
        {
          var a = {token:element, senders:[]};
          await pendingToApprove(rpc,element,publicKey).then((data)=> a.senders=data);
          return a
        }))
      setPending(newPending.filter(x=>x.senders.length>0));
};
export default actualizarPending;