import React, {useState} from "react";

import { 
    Heading,
    Text,
    Button,
    useToast,
    FormControl,FormLabel,FormHelperText,
    Input,InputGroup,InputRightElement, Divider
    
} from "@chakra-ui/react"; 
import { guardarConExpiracion } from "../auth.js";

const Setup = ({setSecret, setPublicKey, setHasSaved, setHasPass}) => {
    const createAccount = () => {
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
        const encryptPrivateKey = web3.eth.accounts.encrypt(secret,password);
        localStorage.setItem('publicKey', publicKey);
        localStorage.setItem('secret',JSON.stringify(encryptPrivateKey));
        guardarConExpiracion('hasPass',true);
        setHasPass(true);
    };

    const toast = useToast();
    const [encryptText, setEncryptText] = useState("");
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const readFile = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        const fileReader = new FileReader();
        fileReader.readAsText(file);

        fileReader.onload = () => {            
            setEncryptText(fileReader.result);
        };
    }

    const importAccount = (event) => {

        if(password.length>7)
        {
            if(encryptText==="")
            { toast({
                    title: 'Advertencia',
                    description: "Debe elegir algun archivo",
                    status: 'info',
                    duration: 9000,
                    isClosable: true
                })
            }
            else
            {
                const Web3 = require('web3');
                const web3 = new Web3();
                try{
                    const account = web3.eth.accounts.decrypt(encryptText,password);
                    setSecret(encryptText);
                    setPublicKey(account.address);
                    setHasSaved(true);
                    localStorage.setItem('hasSaved',true);
                    localStorage.setItem('publicKey', account.address);
                    localStorage.setItem('secret',encryptText);
                }
                catch{
                    toast({
                        title: 'Error',
                        description: "La contraseña para esa llave privada no es correcta",
                        status: 'error',
                        duration: 9000,
                        isClosable: true
                    })
                }               
            }
        }
        else
        {
            toast({
                title: 'Error',
                description: "La contraseña debe ser mayor de 8 caracteres.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }

    };   
   
    const [showImport,setShowImport] = useState(false);
    const handleClickImport = () => setShowImport(true);
    
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);  
     
    return(
        <div>
            <Heading>Bienvenido a tu Billetera</Heading>            
            <Text fontSize="xl">Crea tu cuenta de forma rapida y segura</Text>
            <Button size="lg" colorScheme="blue" 
            mt={5} onClick={createAccount}>Crear Cuenta</Button>

            <Text mt={5}>O bien, si ya tienes una cuenta, importala</Text>                        
            <Button mt={5} aligment="center" colorScheme="green"
                hidden={showImport} onClick={handleClickImport} >Importar </Button>
            <Divider orientation='horizontal' />

            <FormControl hidden={!showImport} isRequired>
                <FormLabel mt={5}>Importar llave privada</FormLabel> 
                <Input type="file" multiple={false} onChange={ readFile }/>
            </FormControl>

            <FormControl hidden={!showImport} isRequired>
                <FormLabel mt={3}>Contraseña para desencriptar archivo.</FormLabel>
                <InputGroup size='md'>
                    <Input pr='4.5rem' type={show ? 'text' : 'password'} 
                        placeholder='Enter password' onChange={handlePasswordChange}/>
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                         {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormHelperText>Nunca compartas la llave privada.</FormHelperText>
                <Button mt={5} aligment="center" colorScheme="green"
                    onClick={importAccount}>Importar </Button>
            </FormControl>
            
        </div>
            
    );

};
export default Setup;



