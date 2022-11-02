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

const TokenList = ({listOfTokens}) => {
    //index.js

    const listItems = listOfTokens?.map((token) =>
      <Tr>
        <Td>{token}</Td>
      </Tr>
);
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
            {listItems} 
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