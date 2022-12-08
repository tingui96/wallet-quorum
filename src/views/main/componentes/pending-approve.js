import React, {useEffect, useState} from "react";
import { Button ,useDisclosure,FormControl,FormLabel,Input,useToast,
    Modal,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent,
  InputGroup,TableContainer,Table,Thead,Tbody,Tr,Th,Td,Tfoot,Box,Stack} from "@chakra-ui/react";
import pendingToApprove from "../utils/pendingToApprove";
import getAllValue from "../utils/getAllValue";
import approveOrReject from "../utils/approveOrReject";
import getBalance from "../utils/getBalance";

const PendingApprove = ({publicKey,list,rpcUrl,setIsPending}) =>
{
    const [pending,setPending] = useState([]);
    const listar = async () => {
        //await approveOrReject(rpcUrl,list[0],'0x131de47CD063C4cD9faad0D9F5c0F6C426f30bBc',500,true);
        var newList = await Promise.all(list.map(
            async (element) => 
            {
              return { 
                        token: element,
                        senders: await pendingToApprove(rpcUrl,element,publicKey)
                      }
            }
          ))
          setPending(newList);
        }
    listar();
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