import React, {useEffect, useState} from "react";
import { Button,Box,Stack,Divider,Text } from "@chakra-ui/react";

const Main = ({publicKey, resetAccount}) => {
    return(
        <>
            <Box display="flex" justifyContent="center" width="100%"
                maxWidth="500px" borderWidth="1px" p={6}>
                <Stack width="100%" maxWidth="500px" justifyContent="center">
                  {/*Datos de la cuenta*/}
                  {/*Transferencias */}
                  {/*Balance */}
                  <Divider my={10}/>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Text textAlign="center">Cuenta:</Text>
                    <Button variant="outline" color="red"
                    onClick={resetAccount}>Cerrar cuenta</Button>
                  </Box>
                  
                </Stack>
            </Box>
        </>
    );

};
export default Main;