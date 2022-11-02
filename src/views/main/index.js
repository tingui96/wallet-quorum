import React, {useEffect, useState} from "react";
import AccountData from "./componentes/account-data"
import { Button,Box,Stack,Divider,Text, useDisclosure } from "@chakra-ui/react";
import AddToken from "./componentes/add-token";
import {SettingsIcon} from "@chakra-ui/icons";
import Configuracion from "./configuracion";

const Main = ({publicKey, resetAccount}) => {
    const [url, setUrl] = useState(localStorage.getItem('url'));
    const [chainId, setChainId] = useState(localStorage.getItem('chainId'));

    const [listOfTokens, setListOfTokens] = useState(["Pepe"]);
    const [config,setConfig] = useState(false);
    const onConfig = () => {
        setConfig(true);
    };
    if(config)
    {
      return(<Configuracion setConfig={setConfig}/>);
    }
    else
    {
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
                      <Button onClick={onConfig}><SettingsIcon/></Button>
                      <Text textAlign="center"> </Text>
                      <Button variant="outline" color="red"
                      onClick={resetAccount}>Cerrar cuenta</Button>                    
                    </Box>                  
                  </Stack>
              </Box>
          </>
      );
    };

};
export default Main;