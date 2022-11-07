import React from "react";
import { Box, Button,InputGroup,Stack,Text,Divider,Input} from "@chakra-ui/react";

const Redes = ({url,setUrl,setConfigRedes}) => {

    const goBack = () => {
        localStorage.setItem('url',url);
        setConfigRedes(false);
    };

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    return(<>
        <Box display="flex" justifyContent="center" width="100%"
                  maxWidth="500px" borderWidth="1px" p={6}>
            <Stack width="100%" maxWidth="500px" justifyContent="center">
            <InputGroup alignItems="center">
            <Text as="samp">URL</Text>
                <Input ml={5} value={url} placeholder='URL'size='sm' onChange={handleUrlChange}/>
            </InputGroup>
            <Divider/>
            <Button onClick={goBack}>Atras</Button>
            </Stack>
        </Box>
    </>);

};
export default Redes;