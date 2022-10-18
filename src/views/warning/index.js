import { AlertIcon, Box, Stack,
     Text, Alert, InputGroup,
      Input, InputRightElement, Button,
       useClipboard
} from "@chakra-ui/react";
import React from "react";

const Warning = ({secret, resetAccount, setHasCopied}) => {
    const { onCopy, hasCopied } = useClipboard(secret);
    const goForward = () => {
        localStorage.setItem('hasCopied',true)
        setHasCopied(true);
    };
    return(
        <Box borderWidth="1px" p={6}>
            <Stack width="100%" maxWidth="500px" justifyContent="center">
                <Alert>
                    <AlertIcon/>
                    <Text>
                        Antes de avanzar, por favor asegurate que guardaste tu llave en un lugar seguro
                        sino, no podras recuprarla NUNCA!
                    </Text>
                </Alert>
                <InputGroup>
                    <Input readOnly pr="4.5rem" value={secret}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={onCopy}>
                            { !hasCopied ? 'Copiar':'Copiado'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Box display="flex" justifyContent="space-between">
                    <Button colorScheme="red" onClick={resetAccount}>Regresar</Button>
                    <Button colorScheme="blue" onClick={goForward}>Avanzar</Button>
                </Box>
            </Stack>
        </Box>
    );

};
export default Warning;