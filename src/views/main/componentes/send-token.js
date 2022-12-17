import { Button, Input,Text, useToast,
    Modal, ModalBody, ModalContent, ModalHeader,ModalCloseButton, ModalFooter,
  FormControl, FormLabel, useDisclosure, Spinner }
     from '@chakra-ui/react';
import React, { useState } from 'react'
import QRSCANNER from './QRSCANNER';
import { ArrowRightIcon } from "@chakra-ui/icons";
import actualizarBalance from '../utils/actualizar-balances';
import transfer from '../utils/trasfer';

const SendToken = ({setIsSendToken, token, rpcUrl, list, setList, publicKey}) =>
{
    const toast = useToast();
    const [isLoad,setIsLoad] = useState(false);
    const [fromTo,setFromTo] = useState('');
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
        setIsLoad(true);
        try
        {
            const reciep = await transfer(rpcUrl,token,cantidad,fromTo,pass);
            onClose()
            toast({
              title: 'Success',
              description: reciep.transactionHash,
              status: 'success',
              duration: 9000,
              isClosable: true
            })
            setIsSendToken(false);
            actualizarBalance(rpcUrl,publicKey,list,setList);
            setIsLoad(false);
        }
        catch (err){
          onClose()
          console.log(err.message)
          toast({
            title: 'Error',
            description: err.message,
            status: 'error',
            duration: 9000,
            isClosable: true
          })
          setIsLoad(false);
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
                      { 
                        !isLoad ? <Button size="sm" colorScheme="green" onClick={enviar}> Aceptar</Button> : <Spinner color='red.500'/>
                      }
                      <Button size="sm" marginLeft={5} onClick={onClose}>Close</Button>
                      
                    </ModalFooter>
                  </ModalContent>
                </Modal>
               
        <Button mt={2} colorScheme="red" onClick={goBack}>Cancelar</Button>
        </>
    )
}
export default SendToken;