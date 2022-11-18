import React, { useEffect, useState} from "react";
import {
    Text,InputGroup,
    InputRightElement,
    Button,useDisclosure,
    Modal,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent,
    Table, Thead, Tbody, Tfoot,Tr,Th,Td,TableContainer, Tooltip
} from '@chakra-ui/react'
import QRCode from "react-qr-code";
import getBalance from "../utils/getBalance";
import { ArrowRightIcon } from "@chakra-ui/icons";
import SendToken from "./send-token";

const AccountData = ({publicKey, list,setList, rpcUrl}) => {
    //const MINUTE_MS = 5000;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const saveList = () => {
        localStorage.setItem('tokenList',JSON.stringify(list));
    };
    useEffect(saveList,[list]);

 //   const onLoad = async() => {
 //     console.log(1);
//
  //    var newList = await Promise.all(list.map(
  //      async (element) => 
  //      {
  //        return await getBalance(rpcUrl,element,publicKey)
  //      }
  //    ))
  //    setList(newList);
  //  }
  //  setInterval(onLoad,MINUTE_MS);

    const [IsSendToken,setIsSendToken] = useState(false);

    const goSendToken = () =>
    {
        setIsSendToken(true);
    }
    if(IsSendToken)
    {
      return(<SendToken setIsSendToken={setIsSendToken}/>)
    }
    else
    {
        return (
            <>
            <InputGroup alignItems="center">
                <Text textAlign="center" width=" 15rem" as="b" fontSize="xl">
                    Datos de la Cuenta
                </Text>
                <InputRightElement width="7rem">
                    <Button h="1.75rem"  colorScheme="telegram" size="sm"
                        onClick={onOpen}>Recibir</Button>
                    <Modal isCentered isOpen={isOpen} onClose={onClose}>
                      <ModalContent>
                        <ModalHeader>Escanee este codigo para recibir</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody isCentered>
                            <InputGroup marginLeft={10}>
                                <QRCode value={publicKey} size={256} bgColor="#282c34" fgColor="#fff" level="H" />
                            </InputGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button onClick={onClose}>Close</Button>
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
                  <Th>cantidad</Th>
                  {/*<Th>Pendientes de aceptar</Th>*/}
                </Tr>
              </Thead>
              <Tbody>
                  {list?.map((element,key) => (
                        <Tr key={key} >
                          <Td>{element.symbol}</Td>
                          <Td>{element.balance}</Td>
                          <Td><Tooltip label={"Send ".concat(element.symbol)}><ArrowRightIcon onClick={goSendToken}/></Tooltip></Td>
                        </Tr> ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                </Tr>
              </Tfoot>
            </Table>
            </TableContainer>
            </InputGroup>
            </>
        );
    }
};
export default AccountData;