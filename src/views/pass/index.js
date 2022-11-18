import { useToast, Box,Input,InputGroup,Stack,InputRightElement,Button } from "@chakra-ui/react";
import React, {useState} from "react";
import { guardarConExpiracion } from "../auth.js";
//import RpcUrl from "./main/configuracion/rpc.json";

const Pass = ({setHasPass}) => {
    const encryptText = localStorage.getItem('secret');
    const [password,setPassword] = useState('');
    const toast = useToast();
    //variables para guardar las Llaves
    const Web3 = require('web3');
    const web3 = new Web3();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show); 

    const Aceptar = (event) => {
        try{
            const account = web3.eth.accounts.decrypt(encryptText,password);
            setHasPass(true);
            //localStorage.setItem('hasPass',true);
            guardarConExpiracion('hasPass',true);
        }
        catch(err)
        {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 9000,
                isClosable: true
            })
        }
    };
    


    

    return(
        <Box display="flex" justifyContent="center" width="100%"
                  maxWidth="600px" borderWidth="1px" p={6}>
                  <Stack width="100%" maxWidth="600px" justifyContent="center">
                    <InputGroup size='md'>
                    <Input pr='4.5rem' type={show ? 'text' : 'password'} 
                        placeholder='Enter password' onChange={handlePasswordChange}/>
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                         {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button mt={5} aligment="center" colorScheme="green"
                    onClick={Aceptar}>Aceptar </Button>
                    
                  </Stack>
              </Box>
    )
};
export default Pass;