import React, { useState } from "react";
import { Box, Button,InputGroup,Stack,Text,Divider } from "@chakra-ui/react";
import {SettingsIcon} from "@chakra-ui/icons";
import Redes from "./redes";

const Configuracion = ({setConfig}) => {
    const goBack = () => {
        setConfig(false);
    };
    const [configRedes,setConfigRedes] = useState(false);
    const goRedes = () => {
        setConfigRedes(true);
    };
    if(configRedes)
    {
        return(<Redes setConfigRedes={setConfigRedes}/>)
    }
    else
    {
        return(<>
            <Box display="flex" justifyContent="center" width="100%"
                      maxWidth="500px" borderWidth="1px" p={6}>
                <Stack width="100%" maxWidth="500px" justifyContent="center">
                <InputGroup alignItems="center">
                    <Text textAlign="center" as="b" fontSize="xl">
                        <SettingsIcon/>  Configuracion  <SettingsIcon/>
                    </Text>
                </InputGroup>
                <Divider/>
                <Button variant="ghost" onClick={goRedes}>Redes</Button>
                <Button onClick={goBack} color="red" variant="outline">Atras</Button>
                </Stack>
            </Box>
        </>);
    }

};
export default Configuracion;