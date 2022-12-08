import React from "react";
import { Button, InputGroup,TableContainer,Table,Thead,Tbody,Tr,Th,Td} from "@chakra-ui/react";

const PendingApprove = ({publicKey,pending,rpcUrl,setIsPending}) =>
{
    const goBack = () =>
    {
        setIsPending(false);
    };

    return(
        <>
              <InputGroup alignContent="center">
              <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr>
                    <Th>Medicamento</Th>
                    <Th >Cantidad</Th>
                    <Th>De</Th>
                    {/*<Th>Pendientes de aceptar</Th>*/}
                  </Tr>
                </Thead>
                <Tbody>
                    {
                          pending?.map((element,key) => (
                            element.senders?.map((sender,j)=> 
                          <Tr id={element.senders.length*key+j} key={element.senders.length*key+j}
                             >
                            <Td>{element.token.symbol}</Td>
                            <Td>{sender.value}</Td>
                            <Td>{sender.sender}</Td>
                          </Tr> )))
                    }
                </Tbody>
              </Table>
              </TableContainer>
              </InputGroup>
            <InputGroup alignContent="center">
                <Button onClick={goBack}>Atrás</Button>
            </InputGroup>
        </>
    );
};
export default PendingApprove;