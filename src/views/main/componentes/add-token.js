import React, {useState} from "react";
import { Button ,useDisclosure,FormControl,FormLabel,Input,useToast,Wrap,WrapItem,
    Modal,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent} from "@chakra-ui/react";
import Erc20 from '../utils/erc20.abi.json';

const AddToken = () => {
//listado de token
   const tokenstring = localStorage.getItem('tokenList');
   const listOfTokens = (tokenstring==null)? []:tokenstring.split(',');
   //console.log(listOfTokens);
///

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [simbol,setSimbol] = useState('');
    const [decimal,setDecimal] = useState('');

    ///Conectando a la red para ver si existe el token///
    const Web3 = require('web3');
    const rpcUrl = localStorage.getItem('url');
    const provider = rpcUrl;
    const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

    const [contractToAdd, setContractToAdd] = useState('');
    async function handleContractChange(event){
        setContractToAdd(event.target.value);
        const tokenAddress = event.target.value;
        const contract = new Web3Client.eth.Contract(Erc20, tokenAddress);        
        try{
            const nam = await contract.methods.symbol().call();
            const dec = await contract.methods.decimals().call();
            setSimbol(nam);
            setDecimal(dec);
        }
        catch{
            setSimbol('');
            setDecimal('');
        }
    };

    function manejarAgregar () {
        
        const nuevaLista = listOfTokens.concat(contractToAdd);
        //console.log(nuevaLista);
        localStorage.setItem('tokenList',nuevaLista.toString());
    }
    const toast = useToast();
    const handleClose = () => {
        if(simbol.length>0)
        {
            manejarAgregar();
            onClose();
        }
        else
        {
            toast({
            title: 'No existe.',
            description: "Esa direccion de contrato no existe",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
        
    }
    return(
        <>
            <Button colorScheme="cyan" color="whitesmoke" size="sm" onClick={onOpen}>
                Agregar Medicamento
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalContent>
                    <ModalHeader>Escanee este codigo para recibir</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <FormControl>
                        <FormLabel>Direccion del contrato</FormLabel>
                        <Input placeholder='contrato' onChange={handleContractChange}/>
                        <FormLabel>Simbolo</FormLabel>
                        <Input value={simbol} readOnly placeholder='simbolo' onChange={handleContractChange}/>
                        <FormLabel>Decimales</FormLabel>
                        <Input value={decimal} readOnly placeholder='decimales' onChange={handleContractChange}/>
                    </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button size="sm" colorScheme="green" onClick={handleClose}> Agregar</Button>  
                      <Button size="sm" marginLeft={5} onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
        </>
    );
};
export default AddToken;