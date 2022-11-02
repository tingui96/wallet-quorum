import React, { useState } from "react";
import { Box, Button,InputGroup,Stack,Text,Divider,Input} from "@chakra-ui/react";

const Redes = ({setConfigRedes}) => {
    const [url, setUrl] = useState(localStorage.getItem('url'));
    const [chainId, setChainId] = useState(localStorage.getItem('chainId'));
    const goBack = () => {
        localStorage.setItem('url',url);
        localStorage.setItem('chainId',chainId);
        setConfigRedes(false);
    };

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };
    const handleChainChange = (event) => {
        setChainId(event.target.value);
    };
    return(<>
        <Box display="flex" justifyContent="center" width="100%"
                  maxWidth="500px" borderWidth="1px" p={6}>
            <Stack width="100%" maxWidth="500px" justifyContent="center">
            <InputGroup alignItems="center">
            <Text as="samp">URL</Text>
                <Input ml={5} value={url} placeholder='URL'size='sm' onChange={handleUrlChange}/>
            </InputGroup>
            <InputGroup alignItems="center">
            <Text as="samp">CadenaId</Text>
                <Input ml={5} value={chainId} placeholder='CadenaId' onChange={handleChainChange}/>
            </InputGroup>
            <Divider/>
            
            <Button onClick={goBack}>Atras</Button>
            </Stack>
            
            
        </Box>
        
    
    </>);

};
export default Redes;