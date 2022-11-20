import { Button, Input, InputGroup, InputRightElement,Text, useToast,
    Modal, ModalBody, ModalContent, ModalHeader,ModalCloseButton, ModalFooter,
  FormControl, FormLabel, useDisclosure }
     from '@chakra-ui/react';
import React, { useState } from 'react'
import QRSCANNER from './QRSCANNER';
import { ArrowRightIcon } from "@chakra-ui/icons";
import Erc20 from "../utils/erc20.abi.json"

const SendToken = ({setIsSendToken, token, rpcUrl}) =>
{
    const toast = useToast();
    const [fromTo,setFromTo] = useState('')
    const [cantidad,setCantidad] = useState(0);
    const [pass,setPass] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const goBack = () =>
    {
        setIsSendToken(false);
    }
    const handleAddress = (event) =>
    {
      setFromTo(event.target.value)
    }
    const handlePasswordChange = (event) =>
    {
      setPass(event.target.value)
    }
    const handleCantidad = (event) =>
    {
      if(parseInt(token.balance)<cantidad)
      {
        toast({
          title: 'Error',
          description: 'Cantidad maxima de ' + token.balance,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
        setCantidad(parseInt(token.balance))
      }
      else{
        setCantidad(event.target.value)
      }
    }
    const enviar = async() =>
    {

        const provider = rpcUrl;
        const Web3 = require('web3');
        const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
        const contract = new Web3Client.eth.Contract(Erc20, token.contract);

        await contract.methods.Transfer()

    }
        return(
        <>
        <Text mb='8px' as="b" fontSize="3xl"> Enviar {token.symbol} a:</Text>
        {/*<QRSCANNER/>*/}
        
        <Text mb='8px' as="b">Direccion a enviar</Text>        
          <Input type="text"  value={fromTo} onChange={handleAddress}/>
          <Text mb='8px' as="b" mt={5}> Max: {token.balance}</Text>
          <Input type="number" width={200} value={cantidad} onChange={handleCantidad}></Input>
          <Button mt={5} width={100} colorScheme="green" onClick={onOpen}><ArrowRightIcon/></Button>
          <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalContent>
                    <ModalHeader>Escriba la contrasena de sus fondos</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <FormControl>
                        <FormLabel>Contrasena</FormLabel>
                        <Input type="password" placeholder='Password' onChange={handlePasswordChange}/>
                    </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button size="sm" colorScheme="green" onClick={enviar}> Agregar</Button>  
                      <Button size="sm" marginLeft={5} onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
        <Button mt={1} colorScheme="red" onClick={goBack}>Cancelar</Button>
        </>
    )
}
export default SendToken;