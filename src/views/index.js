import React, {useState} from "react";
import Main from "./main";
import Pass from "./pass";
import Setup from "./setup";
import Warning from "./warning";
import {buscarConExpiracion} from "./auth.js"

const Views = () => {
    const rpc = localStorage.getItem('url');
    if(rpc === 'null' || rpc === null )
    {
        localStorage.setItem('url',  "https://goerli.infura.io/v3/a01d2ed284e046f3b1d92517a0178a98" );
    }

    //variables para guardar las Llaves
    const [secret, setSecret] = useState(JSON.parse(localStorage.getItem('secret')));
    const [publicKey, setPublicKey] = useState(localStorage.getItem('publicKey'));
    const [hasSaved, setHasSaved] = useState(!!localStorage.getItem('hasSaved'));
    const [hasPass,setHasPass] = useState(buscarConExpiracion('hasPass'));
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
        return <Setup setSecret={setSecret} setPublicKey ={setPublicKey}
                     setHasSaved={setHasSaved} setHasPass={setHasPass}/>;
    }
    else if(!hasSaved)
    {
        return <Warning secret={secret} resetAccount={resetAccount} 
                setHasSaved={setHasSaved} />;
    }
    else
    {
        if(!hasPass)
        {
            return <Pass setHasPass={setHasPass}/>
        }
        else
        {
            return <Main publicKey={publicKey} resetAccount={resetAccount}/>;
        }
    }
};
export default Views;