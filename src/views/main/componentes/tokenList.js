import React,{useState} from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    InputGroup,
    list,
  } from '@chakra-ui/react';
  import Erc20 from '../utils/erc20.abi.json';


const TokenList = ({publicKey}) => {

///Funcion para buscar el nombre del token y el balance de la wallet
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
    
///////////////////////////////////////////////////////////////////////////////////
///                        Inicializando variables
///////////////////////////////////////////////////////////////////////////////////
      const tokenstring = localStorage.getItem('tokenList');
      const listOfTokens = (tokenstring==null)? []:tokenstring.split(',');
      const rpcUrl = localStorage.getItem('url');
      const [list,setList] = useState([]);
      
       listOfTokens?.map((element) => (
        //lista.push(connectToken(rpcUrl,element,publicKey));
        connectToken(rpcUrl,element,publicKey)
          .then(
            (data) => {
              list.push(data);
            }
            )));
      console.log(list);

      const checkBalance = async (token) => {
      const tok = await connectToken(rpcUrl,token,publicKey);
      setList([...list,tok]);
    };


    return( 
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
            {
                list?.map((element) => (
                  <Tr>
                    <Td>{element.symbol}</Td>
                    <Td>{element.balance}</Td>
                  </Tr>
                ))
            }
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
    );

};
export default TokenList;