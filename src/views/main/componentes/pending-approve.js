import React, {useState} from "react";
import { Button ,useDisclosure,FormControl,FormLabel,Input,useToast,
    Modal,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent} from "@chakra-ui/react";
import Erc20 from '../utils/erc20.abi.json';

const PendingApprove = ({publicKey,list,rpcUrl,setIsPending}) =>
{   
    
    const goBack = () =>
    {
        setIsPending(false);
    };

    return(
        <>
        <Button onClick={goBack}>Atrás</Button>
        </>
    );
};
export default PendingApprove;