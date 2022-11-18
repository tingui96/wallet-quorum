import React, {useState} from "react";
import { Button ,useDisclosure,FormControl,FormLabel,Input,useToast,
    Modal,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent} from "@chakra-ui/react";
import Erc20 from '../utils/erc20.abi.json';

const AddToken = ({list,setList,rpcUrl,publicKey}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [simbol,setSimbol] = useState('');
    const [balanceOf,setBalanceOf] = useState('');
    const provider = rpcUrl;
    ///Conectando a la red para ver si existe el token///
    const Web3 = require('web3');
    const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
    const [contractToAdd, setContractToAdd] = useState('');

    const handleContractChange =  async (event) => {
        const tokenAddress = event.target.value;
        setContractToAdd(tokenAddress);
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

    const manejarAgregar = () => {
        const find = list?.find(x => x.contract ===contractToAdd)
        if(typeof(find)==='undefined')
        {
            const tok = {
                symbol: simbol,
                balance: balanceOf,
                contract: contractToAdd
            }
            setList([...list,tok]);
            localStorage.setItem('tokenList',JSON.stringify(list));
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
                        <FormLabel>Contrato</FormLabel>
                        <Input placeholder='contrato' onChange={handleContractChange}/>
                        <FormLabel mt={2}>Simbolo</FormLabel>
                        <Input value={simbol} readOnly placeholder='simbolo' onChange={handleContractChange}/>
                        <FormLabel mt={2}>Balance</FormLabel>
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