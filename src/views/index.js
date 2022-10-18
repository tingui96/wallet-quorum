import React, {useState} from "react";
import Main from "./main";
import Setup from "./setup";
import Warning from "./warning";

const Views = () => {

    //variables para guardar las Llaves
    const [secret, setSecret] = useState(localStorage.getItem('secret'));
    const [publicKey, setPublicKey] = useState(localStorage.getItem('publicKey'));
    const [hasCopied, setHasCopied] = useState(!!localStorage.getItem('hasCopied'));

    //funcion para resetear la cuenta
    const resetAccount = () => {
        setSecret('');
        setPublicKey('');
        setHasCopied(false);
        localStorage.clear();
        
    }

    //Condiciones de navegacion
    if(!secret && !publicKey)
    {
        return <Setup setSecret={setSecret} setPublicKey ={setPublicKey} />;
    }
    else if(!hasCopied)
    {
        return <Warning secret={secret} resetAccount={resetAccount} setHasCopied={setHasCopied} />;
    }
    else
    {
        return <Main publicKey={publicKey} resetAccount={resetAccount}/>;
    }
};
export default Views;