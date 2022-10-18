import React, {useState} from "react";

import { 
    Heading,
    Text,
    Button,
} from "@chakra-ui/react"; 
import Load from "./load";


const Setup = ({setSecret, setPublicKey}) => {

    const crateAccount = () => {
        const Web3 = require('web3');
        const web3 = new Web3();
        const string = web3.utils.sha3(
            Math.random(0,100000).toString(16) + web3.utils.randomHex(32));
        const wallet = web3.eth.accounts.create(string);
        const secret = wallet.privateKey;
        const publicKey = wallet.address;
        //console.log(secret);
        setSecret(secret);
        setPublicKey(publicKey);

        localStorage.setItem('publicKey', publicKey);
        localStorage.setItem('secret',secret);
        
    };

    const goImport = () => {
        return(
        <Load setSecret={setSecret} setPublicKey={setPublicKey}/>)
    };

       
    
    

    return(
        <div>
            <Heading>Bienvenido a tu wallet</Heading>            
            <Text fontSize="xl">Crea tu cuenta de forma rapida y segura</Text>
            <Button size="lg" colorScheme="blue" 
            mt={10} onClick={crateAccount}>Crear Cuenta</Button>
            <Text mt={10}>O bien, si ya tienes una cuenta, importala</Text>
            {/*<InputGroup marginTop={5}>
                <Input placeholder="Ingresa tu llave privada" 
                roundedRight={0} 
                value={secretToImport} 
                onChange={handleSecretChange}/>
                <Button colorScheme="green" onClick={importAccount}>Importar</Button>
    </InputGroup>*/}
            <Button mt={5} aligment="center" colorScheme="green" onClick={goImport}>Importar </Button>
        </div>
            
    );

};
export default Setup;