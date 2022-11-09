import React, {useState} from "react";
import Main from "./main";
import Setup from "./setup";
import Warning from "./warning";
//import RpcUrl from "./main/configuracion/rpc.json";

const Views = () => {
    const rpc = localStorage.getItem('url');
    if(rpc === 'null' || rpc === null )
    {
        localStorage.setItem('url',  "https://goerli.infura.io/v3/a01d2ed284e046f3b1d92517a0178a98" );
    }

    //variables para guardar las Llaves
    const [secret, setSecret] = useState(localStorage.getItem('secret'));
    const [publicKey, setPublicKey] = useState(localStorage.getItem('publicKey'));
    const [hasSaved, setHasSaved] = useState(!!localStorage.getItem('hasSaved'));
    //funcion para resetear la cuenta
    const resetAccount = () => {
        setSecret('');
        setPublicKey('');
        setHasSaved(false);
        localStorage.clear();
    }

    //Condiciones de navegacion
    if(!secret && !publicKey)
    {
        return <Setup setSecret={setSecret} setPublicKey ={setPublicKey} setHasSaved={setHasSaved}/>;
    }
    else if(!hasSaved)
    {
        return <Warning secret={secret} resetAccount={resetAccount} setHasSaved={setHasSaved} />;
    }
    else
    {
        return <Main publicKey={publicKey} resetAccount={resetAccount}/>;
    }
};
export default Views;