import React, { useEffect} from "react";
import {
    Text,InputGroup,
    InputRightElement,Input,Box,
    Button,useDisclosure, useClipboard,
    Modal,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent,
    Table, Thead, Tbody, Tfoot,Tr,Th,Td,TableContainer, Tooltip
} from '@chakra-ui/react'
import QRCode from "react-qr-code";
import { ArrowRightIcon,BellIcon } from "@chakra-ui/icons";


const AccountData = ({publicKey, list,setIsSendToken,setTokenSel,setIsPending}) => {
    //const MINUTE_MS = 5000;
    const {copied, onCopy ,hasCopied} = useClipboard(publicKey)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const saveList = () => {
        localStorage.setItem('tokenList',JSON.stringify(list));
    };
    useEffect(saveList,[list]);

    const goSendToken = (token) =>
    {
        setTokenSel(token)
        setIsSendToken(true);
    }
    const goPending = () =>
    {
      setIsPending(true)
    }
   return (
       <>
       <InputGroup alignItems="center">
           <Text textAlign="center" width=" 15rem" as="b" fontSize="xl">
               Datos de la Cuenta
           </Text>
           <InputRightElement width="7rem">
                <BellIcon w={6} h={6} mr={5} onClick={goPending}/>
               <Button h="1.75rem"  colorScheme="telegram" size="sm" mr={2}
                   onClick={onOpen}>Recibir</Button>
               <Modal isCentered isOpen={isOpen} onClose={onClose}>
                 <ModalContent>
                   <ModalHeader>Escanee este código para recibir</ModalHeader>
                   <ModalCloseButton />
                   <ModalBody >
                       <InputGroup  marginLeft={12}>
                           <QRCode value={publicKey} size={256} bgColor="#282c34" fgColor="#fff" level="H" />
                       </InputGroup>
                       <Text textAlign="center"fontSize="xl" mt={5}>O copie la direccion a continuación:</Text>
                       <InputGroup alignItems="center">
                       <Box display="flex" alignItems="center" mt={1}>
                          <Input readOnly value={publicKey} ml={8} pr="7rem" size="sm"/>
                          <InputRightElement width="4.5rem" mr={5} >
                        <Button h="2rem" onClick={onCopy}>
                            { !hasCopied ? 'Copiar':'Copiado'}
                        </Button>
                        </InputRightElement>
                        </Box>
                       </InputGroup>
                   </ModalBody>
                   <ModalFooter>
                     <Button colorScheme="red" onClick={onClose}>Close</Button>
                   </ModalFooter>
                 </ModalContent>
               </Modal>
           </InputRightElement>
       </InputGroup>
       <InputGroup>
       <TableContainer>
       <Table size='sm'>
         <Thead>
           <Tr>
             <Th>Medicamento</Th>
             <Th >cantidad</Th>
             {/*<Th>Pendientes de aceptar</Th>*/}
           </Tr>
         </Thead>
         <Tbody>
             {list?.map((element,key) => (
                   <Tr id={key} key={key} onClick={() => goSendToken(element)}
                      >
                     <Td>{element.symbol}</Td>
                     <Td width={300}>{element.balance}</Td>
                     <Td ><Tooltip label={"Send ".concat(element.symbol)}><ArrowRightIcon /></Tooltip></Td>
                   </Tr> ))}
         </Tbody>
       </Table>
       </TableContainer>
       </InputGroup>
       </>
   );
};
export default AccountData;