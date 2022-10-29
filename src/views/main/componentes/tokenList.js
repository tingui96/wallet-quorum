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
  } from '@chakra-ui/react'

const TokenList = ({publicKey}) => {
    //index.js

    const Web3 = require("web3");

    const provider = "https://localhost:22000";

    const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

    // The minimum ABI required to get the ERC20 Token balance
    const minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
    ];
    const tokenAddress = "0x0d8775f648430679a709e98d2b0cb6250d2887ef";

    const contract = new Web3Client.eth.Contract(minABI, tokenAddress);

    async function getBalance() {
      const result = await contract.methods.balanceOf(publicKey).call();
      console.log(result);
    }

    getBalance();


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
          <Tr>
            <Td>inches</Td>
            <Td>millimetres</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres</Td>
          </Tr>
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