import { AlertIcon, Box, Stack,
     Text, Alert, InputGroup,
      Input, InputRightElement, Button,
       FormLabel,
       FormControl, useToast, InputRightAddon
} from "@chakra-ui/react";
import React,{useState} from "react";
import { saveAs } from "file-saver";

const Warning = ({secret, resetAccount, setHasSaved}) => {
    const [hasSaveFile,setHasSaveFile] = useState(false);
    const [fileName,setFileName] = useState("MyPrivateKey");
    const handleFileNameChange = (event) => {
        setFileName(event.target.value);
    }

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const Web3 = require('web3');
    const web3 = new Web3();

    const guardar = () => 
    {
        const encryptPrivateKey = web3.eth.accounts.encrypt(secret,password);
        const blob = new Blob([JSON.stringify(encryptPrivateKey)],{ type: 'text/plain;charset= utf-8' });
        saveAs(blob,fileName+'.pk' );
        setHasSaveFile(true);
    };

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [valid, setValid] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    

    const handleConfirmPassChange = (event) => {
        setConfirmPass(event.target.value);
    };

    const checkPassword = () => {
        if(password.length>7)
        {
            if(password===confirmPass)
            {
                setValid(true);
            }
            else { 
                toast({
                        title: 'Error',
                        description: "Asegurate que ambas contraseñas coincidan.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true, 
                    })
                }
        }
        else { 
             toast({
                    title: 'Error',
                    description: "La contraseña debe ser mayor de 8 caracteres.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
          }) }
    };
    const goForward = () => {
        if(hasSaveFile)
        {
            const encryptPrivateKey = web3.eth.accounts.encrypt(secret,password);
            localStorage.setItem('secret',JSON.stringify(encryptPrivateKey));
            localStorage.setItem('hasCopied',true)
            setHasSaved(true); 
        }
        else
        {
            toast({
                title: 'Advertencia',
                description: "Asegurate de guardar la llave privada",
                status: 'warning',
                duration: 9000,
                isClosable: true,
      })

        }
           
    };
    return(
        
        <Box borderWidth="1px" p={6} mt={10}>
            <Stack width="100%" maxWidth="500px" justifyContent="center" hidden={valid}>
                <FormControl mt={5} isRequired>
                    <FormLabel>Cree una contraseña segura para su Billetera</FormLabel>
                    <InputGroup>
                        <Input id="1" type={show ? 'text' : 'password'} placeholder="Enter password" onChange={handlePasswordChange}/>
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                    </InputGroup>
                    <FormLabel mt={5}>Confirmar Contraseña</FormLabel>
                    <InputGroup>
                        <Input id="2" type={show ? 'text' : 'password'} placeholder="Confirm password" onChange={handleConfirmPassChange}/>
                    </InputGroup>
                    <Box display="flex" justifyContent="space-between" mt={5}>
                        <Button colorScheme="red" onClick={resetAccount}>Regresar</Button>
                        <Button colorScheme="blue" onClick={checkPassword}>Avanzar</Button>
                    </Box>
                </FormControl>
            </Stack>
            <Stack width="100%" maxWidth="500px" justifyContent="center" hidden={!valid}>
                <Alert>
                    <AlertIcon/>
                    <Text>
                        Antes de avanzar, por favor asegurate de guardar tu llave privada en un lugar seguro,
                        sino, no podras recuperarla NUNCA!
                    </Text>
                </Alert>
                <InputGroup>
                    <Box display="flex" alignItems="center">
                    <Input width="15.5rem" onChange={handleFileNameChange} placeholder="My Private Key"/>
                    <InputRightAddon children= ".pk"/>
                    <InputRightElement width="6rem" >
                        <Button colorScheme="green" onClick={guardar}>
                            { !hasSaveFile ? 'Guardar':'Guardado'}
                        </Button>
                    </InputRightElement>
                    </Box>
                </InputGroup>
                <Box display="flex" justifyContent="space-between">
                    <Button mt={3} colorScheme="red" onClick={resetAccount}>Regresar</Button>
                    <Button mt={3} colorScheme="blue" onClick={goForward}>Avanzar</Button>
                </Box>
            </Stack>
        </Box>
    );

};
export default Warning;