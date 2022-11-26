import { Button, Input, InputGroup, InputRightElement,Text, useToast,
    Modal, ModalBody, ModalContent, ModalHeader,ModalCloseButton, ModalFooter,
  FormControl, FormLabel, useDisclosure }
     from '@chakra-ui/react';
import React, { useState } from 'react'
import QRSCANNER from './QRSCANNER';
import { ArrowRightIcon } from "@chakra-ui/icons";
import Erc20 from "../utils/erc20.abi.json"
import { BigNumber } from 'ethers';

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
        console.log(rpcUrl);
        
        try{
          const provider = rpcUrl;
          const Web3 = require('web3');
          const value = Web3.utils.toBN(cantidad);
          const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
          const account = Web3Client.eth.accounts.decrypt(JSON.parse(localStorage.getItem('secret')),pass);
          const contract = new Web3Client.eth.Contract(Erc20, token.contract,{from:account.address});
          console.log(account.address)
          const estimateGas = await Web3Client.eth.estimateGas({
            value: '0x0', // Only tokens
            data: contract.methods.transfer(fromTo,value).encodeABI(),
            from: account.address,
            to: fromTo
            });
            console.log(estimateGas)
            const transactionObject  = {
              value:'0x0',
              data:contract.methods.transfer(fromTo,value).encodeABI(),
            from: account.address,
            to: fromTo,
            gas:Web3Client.utils.toHex(Math.round(estimateGas * 1.10)),
            gasLimit:Web3Client.utils.toHex(Math.round(estimateGas * 1.10)),
            
          }
          //Sing
          const signText = await Web3Client.eth.accounts.signTransaction(transactionObject, account.privateKey);
          //Send Transaction
          const reciep = await Web3Client.eth.sendSignedTransaction(signText.rawTransaction);
          onClose()
          toast({
            title: 'Success',
            description: reciep.transactionHash,
            status: 'success',
            duration: 9000,
            isClosable: true
          })
    
    
        }
        catch (err){
          onClose()
          toast({
            title: 'Error',
            description: err.message,
            status: 'error',
            duration: 9000,
            isClosable: true
          })
        }
    }
        return(
        <>
        
        <Text mb='8px' as="b" fontSize="3xl"> Enviar {token.symbol} a:</Text>
        {/*<QRSCANNER/>*/}
        <Text mb='8px' as="b">Direccion a enviar</Text>
          <Input width="20rem" type="text"  value={fromTo} onChange={handleAddress}/>
          <Text mb='8px' as="b" mt={5}> Max: {token.balance}</Text>
          <Input type="number" width="8rem" value={cantidad} onChange={handleCantidad}></Input>
          <Button mt={5} width={100} colorScheme="green" onClick={onOpen}><ArrowRightIcon/></Button>
          <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalContent>
                    <ModalHeader>Escriba la contraseña de sus fondos</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <FormControl>
                        <FormLabel>Contraseña</FormLabel>
                        <Input type="password" placeholder='Password' onChange={handlePasswordChange}/>
                    </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button size="sm" colorScheme="green" onClick={enviar}> Aceptar</Button>  
                      <Button size="sm" marginLeft={5} onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
               
        <Button mt={2} colorScheme="red" onClick={goBack}>Cancelar</Button>
        </>
    )
}
export default SendToken;