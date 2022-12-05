import React, { useState} from "react";
import AccountData from "./componentes/account-data"
import { Button,Box,Stack,Divider,Text} from "@chakra-ui/react";
import {SettingsIcon} from "@chakra-ui/icons";
import Configuracion from "./configuracion";
import AddToken from "./componentes/add-token";
import SendToken from "./componentes/send-token";
import PendingApprove from "./componentes/pending-approve";


const Main = ({publicKey, resetAccount}) => {

    const [url, setUrl] = useState(localStorage.getItem('url'));
    const [IsSendToken,setIsSendToken] = useState(false);
    const [IsPending,setIsPending] = useState(false);
    const [tokenSel,setTokenSel] = useState('');
    const [list,setList] = useState(JSON.parse(localStorage.getItem('tokenList')));
    
    if(list===null){setList([])}
    
    const [config,setConfig] = useState(false);

    const onConfig = () => {
        setConfig(true);
    };
    if(config)
    {
      return(<Configuracion url={url} setUrl={setUrl} setConfig={setConfig}/>);
    }
    else if(IsSendToken)
    {
      return(<SendToken setIsSendToken={setIsSendToken} token={tokenSel} rpcUrl={url} list={list} setList={setList} publicKey={publicKey}/>)
    }
    else if(IsPending)
    {
       return(<PendingApprove publicKey={publicKey} list={list} rpcUrl={url} setIsPending={setIsPending}/>)
    }
    else
    {
      return(
          <>
              <Box display="flex" justifyContent="center" width="100%"
                  maxWidth="600px" borderWidth="1px" p={6}>
                  <Stack width="100%" maxWidth="600px" justifyContent="center">
                    {/*Datos de la cuenta*/}
                    <AccountData publicKey={publicKey} list={list} setIsSendToken={setIsSendToken} setTokenSel={setTokenSel} setIsPending={setIsPending}/>
                    {/*Transferencias */}
                    {/*Balance */}

                    <Divider my={10}/>
                    <AddToken list={list} setList={setList} rpcUrl={url} publicKey={publicKey} />
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