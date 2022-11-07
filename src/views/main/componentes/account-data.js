import React,{useState} from "react";
import {
    Text,InputGroup,
    Input,InputRightElement,
    InputLeftAddon,InputRightAddon,
    Button,useDisclosure,
    Modal,ModalOverlay,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent,
    Table, Thead, Tbody, Tfoot,Tr,Th,Td,TableCaption,TableContainer
    
} from '@chakra-ui/react'
import QRCode from "react-qr-code";
import Erc20 from '../utils/erc20.abi.json';

async function connectToken(rpc,tokenAddress,publicKey)
    {
        const Web3 = require('web3');
        const Web3Client = new Web3(new Web3.providers.HttpProvider(rpc));
        const contract = new Web3Client.eth.Contract(Erc20, tokenAddress);
        var token = {
          symbol: '',
          balance: ''
        }
        await contract.methods.symbol().call()
          .then( data => { token.symbol = data });
        await contract.methods.balanceOf(publicKey).call()
          .then(data => {token.balance = data});
        return token;
    }

const AccountData = ({publicKey, list,setList, rpcUrl}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const tokenstring = localStorage.getItem('tokenList');
    const listOfTokens = (tokenstring==null)? []:tokenstring.split(',');
    console.log(rpcUrl);
    if(listOfTokens.length>list.length)
    {
        listOfTokens?.map((element) => (
          connectToken(rpcUrl,element,publicKey)
            .then(
              (data) => {
                setList([...list,data]);
              }
              )));
    }
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
              {list?.map((element) => (
                    <Tr>
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