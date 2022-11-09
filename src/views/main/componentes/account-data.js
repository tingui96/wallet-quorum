import React, { useEffect } from "react";
import {
    Text,InputGroup,
    InputRightElement,
    Button,useDisclosure,
    Modal,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent,
    Table, Thead, Tbody, Tfoot,Tr,Th,Td,TableContainer
} from '@chakra-ui/react'
import QRCode from "react-qr-code";


const AccountData = ({publicKey, list}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const saveList = () => {
        localStorage.setItem('tokenList',JSON.stringify(list));
    };
    useEffect(saveList,[list]);

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
              <Th>Pendientes de aceptar</Th>
            </Tr>
          </Thead>
          <Tbody>
              {list?.map((element,key) => (
                    <Tr key={key} >
                      <Td>{element.symbol}</Td>
                      <Td>{element.balance}</Td>
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
};
export default AccountData;