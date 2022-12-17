import { Box, Button, Input, InputGroup,Text, useToast,useDisclosure,
    Modal,ModalBody,ModalContent,ModalFooter,ModalHeader,ModalCloseButton,FormControl,FormLabel,Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import actualizarCuenta from "../utils/actualizar-cuenta";
import approveTransfer from "../utils/approveTransfer";
import rejectTransfer from "../utils/rejectTransfer";

const ApproveOrReject = ({publicKey,setIsPending,setIsApproveOrReject,transferSel,rpcUrl,list,setList,setPending}) =>
{
    const [value1,setValue1] = useState(transferSel.value);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [appro,setappro] = useState(true);
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
        try
        {
          const reciep = await approveTransfer(rpcUrl,value1,transferSel,pass);
          onClose()
          toast({
            title: 'Success',
            description: reciep.transactionHash,
            status: 'success',
            duration: 9000,
            isClosable: true
          })
          actualizarCuenta(rpcUrl,publicKey,list,setList,setPending)
          setIsApproveOrReject(false);
          setIsLoad(false);
          setIsPending(false);
        }
        catch (err)
        {
          onClose()
          console.log(err.message)
          toast(
            {
            title: 'Error',
            description: err.message,
            status: 'error',
            duration: 9000,
            isClosable: true
            } )
          setIsApproveOrReject(false);
          setIsLoad(false);
        }
    }
    const rechazar = async() =>
    {
        setIsLoad(true);
        try{
          const reciep = await rejectTransfer(rpcUrl,value1,transferSel,pass);
          onClose()
          toast({
            title: 'Success',
            description: reciep.transactionHash,
            status: 'success',
            duration: 9000,
            isClosable: true
          })
          actualizarCuenta(rpcUrl,publicKey,list,setList,setPending)
          setIsPending(false);
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
          } )
          setIsApproveOrReject(false);
          setIsLoad(false);
        }
    }
    const rej = () =>
    {
        setappro(false);
        onOpen();
    }
    return(
    <>
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
                    <Button ml={3} colorScheme="red" size="sm" onClick={()=> rej()}>Rechazar transferencia</Button>
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
                         !isLoad ? <Button size="sm" colorScheme="green" 
                         onClick={()=>{
                           if(appro)aceptar();
                           else rechazar()
                          }}> Aceptar</Button> : <Spinner color='red.500'/>
                      }
                      <Button size="sm" marginLeft={5} onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
    </>
    )
};
export default ApproveOrReject;