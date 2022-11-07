import React, {useState} from "react";
import { Button ,useDisclosure,FormControl,FormLabel,Input,useToast,
    Modal,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent} from "@chakra-ui/react";
import Erc20 from '../utils/erc20.abi.json';

const AddToken = ({list,setList,rpcUrl,publicKey}) => {
//listado de token
   const tokenstring = localStorage.getItem('tokenList');
   const listOfTokens = (tokenstring==null)? []:tokenstring.split(',');
   //console.log(listOfTokens);
///

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [simbol,setSimbol] = useState('');
    const [balanceOf,setBalanceOf] = useState('');
    const provider = rpcUrl;
    ///Conectando a la red para ver si existe el token///
    const Web3 = require('web3');
    const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
    console.log(provider);
    const [contractToAdd, setContractToAdd] = useState('');
    async function handleContractChange(event){
        setContractToAdd(event.target.value);
        const tokenAddress = event.target.value;
        const contract = new Web3Client.eth.Contract(Erc20, tokenAddress);        
        try{
            const nam = await contract.methods.symbol().call();
            const bal = await contract.methods.balanceOf(publicKey).call();
            setSimbol(nam);
            setBalanceOf(bal);
        }
        catch{
            setSimbol('');
            setBalanceOf('');
        }
    };

    function manejarAgregar () {
        const find = listOfTokens.find(x => x===contractToAdd)
        if(typeof(find)==='undefined')
        {
            const nuevaLista = listOfTokens.concat(contractToAdd);
            const tok = {
                symbol: simbol,
                balance: balanceOf
            }
            setList([...list,tok]);
            //console.log(nuevaLista);
            localStorage.setItem('tokenList',nuevaLista.toString());
            onClose();
        }
        else{
            toast({
                title: 'Ya existe.',
                description: "Esa direccion de contrato ya existe",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        }

    }
    const toast = useToast();
    const handleClose = () => {
        if(simbol.length>0)
        {
            manejarAgregar();
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
                        <Input value={balanceOf} readOnly placeholder='decimales' onChange={handleContractChange}/>
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