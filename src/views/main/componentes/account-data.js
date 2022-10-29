import React from "react";
import {
    Text,InputGroup,
    Input,InputRightElement,
    InputLeftAddon,InputRightAddon,
    Button,useClipboard
} from '@chakra-ui/react'

const AccountData = ({publicKey}) => {
    const {onCopy,hasCopied} = useClipboard(publicKey)
    return (
        <>
        <Text textAlign="center" fontSize="xl" >Cuenta</Text>
        <InputGroup>
            <Input readOnly pr="4.5rem" fontSize="sm" value={publicKey}/>
            <InputRightElement width="4.5rem">
                <Button onClick={onCopy} h="1.75rem" size="sm">
                    {!hasCopied ? 'Copiar':'Copiado'}
                </Button>
            </InputRightElement>
        </InputGroup>
        <Text textAlign="center" fontSize="xl">Balance</Text>
        </>
    );
};
export default AccountData;