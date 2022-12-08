import { Box, Button, Input, InputGroup,Text, useToast,useDisclosure,
    Modal,ModalBody,ModalContent,ModalFooter,ModalHeader,ModalCloseButton,FormControl,FormLabel,Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import Erc20 from "../utils/mederc20.abi.json";
import getBalance from "../utils/getBalance";

const ApproveOrReject = ({setIsApproveOrReject,transferSel,rpcUrl,publicKey,list,setList}) =>
{
    const [value1,setValue1] = useState(transferSel.value);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ap,setap] = useState(false);
    const [pass,setPass] = useState("");
    const [isLoad,setIsLoad] = useState(false);
    const handleValueChange = (event) =>
    {
        setValue1(event.target.value)
        if(parseInt(transferSel.value)<value1)
        {
            toast({
          title: 'Error',
          description: 'Cantidad maxima de ' + transferSel.value,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
        setValue1(parseInt(transferSel.value))
      }
      else{
        setValue1(event.target.value)
      }
    }
    const handlePasswordChange = (event) =>
    {
      setPass(event.target.value)
    }
    const goBack = () =>
    {
        setIsApproveOrReject(false);
    };

    const aceptar = async() =>
    {
        setIsLoad(true);
        try{
          const provider = rpcUrl;
          const Web3 = require('web3');
          const value = Web3.utils.toBN(value1);
          const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
          const account = Web3Client.eth.accounts.decrypt(JSON.parse(localStorage.getItem('secret')),pass);
          console.log(transferSel.token.contract);
          const contract = new Web3Client.eth.Contract(Erc20, transferSel.token.contract,{from:account.address});
          console.log(account.address);
          const estimateGas = await Web3Client.eth.estimateGas({
            value: '0x0', // Only tokens
            data: contract.methods.approveTransfer(transferSel.sender,value).encodeABI(),
            from: account.address,
            to: transferSel.token.contract
            });
            console.log(estimateGas)
            const transactionObject  = {
              value:'0x0',
              data:contract.methods.approveTransfer(transferSel.sender,value).encodeABI(),
            from: account.address,
            to: transferSel.token.contract,
            gas:Web3Client.utils.toHex(Math.round(estimateGas * 1.10)),
            gasLimit:Web3Client.utils.toHex(210000),
            
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
          var newList = await Promise.all(list?.map(
            async (element) => 
            {
              return await getBalance(rpcUrl,element,publicKey)
            }
          ))
          setList(newList);
          setIsApproveOrReject(false);
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
          var newList2 = await Promise.all(list?.map(
            async (element) => 
            {
              return await getBalance(rpcUrl,element,publicKey)
            }
          ))
          setList(newList2);
          setIsApproveOrReject(false);
          setIsLoad(false);
        }
    }
    const rechazar = async() =>
    {
        setIsLoad(true);
        try{
          const provider = rpcUrl;
          const Web3 = require('web3');
          const value = Web3.utils.toBN(value1);
          const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
          const account = Web3Client.eth.accounts.decrypt(JSON.parse(localStorage.getItem('secret')),pass);
          console.log(transferSel.token.contract);
          const contract = new Web3Client.eth.Contract(Erc20, transferSel.token.contract,{from:account.address});
          console.log(account.address);
          const estimateGas = await Web3Client.eth.estimateGas({
            value: '0x0', // Only tokens
            data: contract.methods.approveTransfer(transferSel.sender,value).encodeABI(),
            from: account.address,
            to: transferSel.token.contract
            });
            console.log(estimateGas)
            const transactionObject  = {
              value:'0x0',
              data:contract.methods.approveTransfer(transferSel.sender,value).encodeABI(),
            from: account.address,
            to: transferSel.token.contract,
            gas:Web3Client.utils.toHex(Math.round(estimateGas * 1.10)),
            gasLimit:Web3Client.utils.toHex(210000),
            
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
          var newList = await Promise.all(list?.map(
            async (element) => 
            {
              return await getBalance(rpcUrl,element,publicKey)
            }
          ))
          setList(newList);
          setIsApproveOrReject(false);
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
          var newList2 = await Promise.all(list?.map(
            async (element) => 
            {
              return await getBalance(rpcUrl,element,publicKey)
            }
          ))
          setList(newList2);
          setIsApproveOrReject(false);
          setIsLoad(false);
        }
    }
    const rej = () =>
    {
        setap(false);
        onOpen();
    }

    return(<>
                <Text mb='8px'>Símbolo</Text>
                <Input variant="filled" size="sm" readOnly value={transferSel.token.symbol}/>            
                <Text>Dirección que envía</Text>
                <Input variant="filled" size="sm" readOnly value={transferSel.sender}/>           
                <Text>Cantidad </Text>
                <Text fontSize="xs" mt={5}> Max: {transferSel.value}</Text>
                <Input type="number" size="sm" value={value1} onChange={handleValueChange}/>
                <Box display="flex" alignItems="center">
                <InputGroup mt={3} alignItems="center">
                    <Button colorScheme="green" size="sm" onClick={onOpen}>Aprobar transferencia</Button>
                    <Button ml={3} colorScheme="red" size="sm" onClick={onOpen}>Rechazar transferencia</Button>
                    <Button ml={3} colorScheme="gray" size="sm" onClick={goBack}>Atrás</Button>
                </InputGroup>
                </Box>
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
                       
                         !isLoad ? <Button size="sm" colorScheme="green" onClick={aceptar}> Aceptar</Button> : <Spinner color='red.500'/>
                        
                      }
                      <Button size="sm" marginLeft={5} onClick={onClose}>Close</Button>
                      
                    </ModalFooter>
                  </ModalContent>
                </Modal>
            
    </>)
};
export default ApproveOrReject;