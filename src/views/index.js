import React, {useState} from "react";
import Main from "./main";
import Setup from "./setup";
import Warning from "./warning";

const Views = () => {
    localStorage.setItem('url',"http://localhost:22000");
    localStorage.setItem('chainId','10');
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
        localStorage.setItem('url',"http://localhost:22000");
        localStorage.setItem('chainId','10');
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