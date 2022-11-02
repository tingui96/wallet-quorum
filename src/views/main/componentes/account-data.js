import React,{useState} from "react";
import {
    Text,InputGroup,
    Input,InputRightElement,
    InputLeftAddon,InputRightAddon,
    Button,useDisclosure,
    Modal,ModalOverlay,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent
} from '@chakra-ui/react'
import QRCode from "react-qr-code";
import TokenList from "./tokenList";

const AccountData = ({publicKey,listOfTokens}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    
          
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
            <TokenList listOfTokens={listOfTokens}/>
        </InputGroup>
        
        </>
    );
};
export default AccountData;