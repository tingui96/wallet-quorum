import { Button, Input, InputGroup, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import QRSCANNER from './QRSCANNER';
import { ArrowRightIcon } from "@chakra-ui/icons";

const SendToken = ({setIsSendToken, token}) => 
{
    const toast = useToast();
    const [fromTo,setFromTo] = useState('')
    const [cantidad,setCantidad] = useState(0);
    const goBack = () =>
    {
        setIsSendToken(false);
    }
    const handleAddress = (event) =>
    {
      setFromTo(event.target.value)
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
    const enviar = () =>
    {

    }
        return(
        <>
        <Button onClick={goBack}>Atras</Button>
        {/*<QRSCANNER/>*/}
        <InputGroup alignItems="center">
          <Input type="text"  value={fromTo} onChange={handleAddress}/>
        </InputGroup>
        <InputGroup>
          <Text mb='8px'> Max: {token.balance}</Text>
          <Input type="number" value={cantidad} onChange={handleCantidad}></Input>
          <Button onClick={enviar}><ArrowRightIcon/></Button>
        </InputGroup>
        </>
    )
}
export default SendToken;