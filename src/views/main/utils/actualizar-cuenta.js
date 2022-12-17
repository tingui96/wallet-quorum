import actualizarBalance from './actualizar-balances';
import actualizarPending from './actualizar-pending';

async function actualizarCuenta(rpc,publicKey,list,setList,setPending)
{
    actualizarBalance(rpc,publicKey,list,setList);
    actualizarPending(rpc,publicKey,list,setPending);
};
export default actualizarCuenta;