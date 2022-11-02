import React, {useState} from "react";
import { Button ,useDisclosure,FormControl,FormLabel,Input,
    Modal,ModalFooter,ModalHeader,ModalBody, ModalCloseButton,ModalContent} from "@chakra-ui/react";

const AddToken = ({listOfTokens ,setListOfTokens}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [contractToAdd, setContractToAdd] = useState('');
    const handleContractChange = (event) => {
        setContractToAdd(event.target.value);
    };

    function manejarAgregar () {
        const nuevaLista = listOfTokens?.concat(contractToAdd);
        setListOfTokens(nuevaLista) ;
      }
    
    const handleClose = () => {
        manejarAgregar();
        onClose();
    }
    return(
        <>
            <Button colorScheme="cyan" color="whitesmoke" size="sm" onClick={onOpen}>
                Agregar Medicamento
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalContent>
                    <ModalHeader>Escanee este codigo para recibir</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <FormControl>
                        <FormLabel>Direccion del contrato</FormLabel>
                        <Input placeholder='contrato' onChange={handleContractChange}/>
                    </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button size="sm" colorScheme="green" onClick={handleClose}> Agregar</Button>  
                      <Button size="sm" marginLeft={5} onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
        </>
    );
};
export default AddToken;