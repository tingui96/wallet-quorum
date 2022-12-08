import React, { useState } from "react";
import { Button, InputGroup,TableContainer,Table,Thead,Tbody,Tr,Th,Td} from "@chakra-ui/react";
import ApproveOrReject from "./approve-reject";

const PendingApprove = ({publicKey,pending,rpcUrl,setIsPending}) =>
{
    const [trasferSel,setTransferSel] = useState([]);
    const [isApproveOrReject,setIsApproveOrReject] = useState(false);
    const goBack = () =>
    {
        setIsPending(false);
    };
    const goApproveOrReject = (transfer) =>
    {
       setTransferSel(transfer)
       setIsApproveOrReject(true);
    }
    if(isApproveOrReject)
    {
      return <ApproveOrReject setIsApproveOrReject={setIsApproveOrReject} transferSel={trasferSel} rpcUrl={rpcUrl} publicKey={publicKey}/>
    }
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
                            onClick={()=>goApproveOrReject({
                              token:element.token,
                              value:sender.value,
                              sender:sender.sender})}>
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