import React, {useEffect, useState} from "react";
import AccountData from "./componentes/account-data"
import { Button,Box,Stack,Divider,Text, chakra } from "@chakra-ui/react";
import AddToken from "./componentes/add-token";
import {SettingsIcon} from "@chakra-ui/icons";

const Main = ({publicKey, resetAccount}) => {

    const [listOfTokens, setListOfTokens] = useState(["Pepe"]);
    
    return(
        <>
            <Box display="flex" justifyContent="center" width="100%"
                maxWidth="500px" borderWidth="1px" p={6}>
                <Stack width="100%" maxWidth="500px" justifyContent="center">
                  {/*Datos de la cuenta*/}
                  <AccountData publicKey={publicKey} listOfTokens={listOfTokens}/>
                  {/*Transferencias */}
                  <AddToken listOfTokens={listOfTokens} setListOfTokens={setListOfTokens}/>
                  {/*Balance */}
                  <Divider my={10}/>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <SettingsIcon/>
                    <Text textAlign="center"> </Text>
                    <Button variant="outline" color="red"
                    onClick={resetAccount}>Cerrar cuenta</Button>
                    
                  </Box>
                  
                </Stack>
            </Box>
        </>
    );

};
export default Main;