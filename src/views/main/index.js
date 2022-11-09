import React, { useState} from "react";
import AccountData from "./componentes/account-data"
import { Button,Box,Stack,Divider,Text} from "@chakra-ui/react";
import AddToken from "./componentes/add-token";
import {SettingsIcon} from "@chakra-ui/icons";
import Configuracion from "./configuracion";
import connectToken from "./utils/connectToken";

const Main = ({publicKey, resetAccount}) => {

    const [url, setUrl] = useState(localStorage.getItem('url'));

    const [list,setList] = useState([]);
    const [config,setConfig] = useState(false);
    const tokenstring = localStorage.getItem('tokenList');
    const listOfTokens = (tokenstring==null)? []:tokenstring.split(',');

   // if(listOfTokens.length>list.length)
    //{
        listOfTokens?.forEach((element) => (
          connectToken(url,element,publicKey)
            .then(
              (data) => {
                if(typeof(list.find(x=>x.symbol===data.symbol))==='undefined')
                {setList([...list,data]);}
              }
              )));
   // }


    const onConfig = () => {
        setConfig(true);
    };
    if(config)
    {
      return(<Configuracion url={url} setUrl={setUrl} setConfig={setConfig}/>);
    }
    else
    {
      return(
          <>
              <Box display="flex" justifyContent="center" width="100%"
                  maxWidth="600px" borderWidth="1px" p={6}>
                  <Stack width="100%" maxWidth="600px" justifyContent="center">
                    {/*Datos de la cuenta*/}
                    <AccountData publicKey={publicKey} list={list} />
                    {/*Transferencias */}
                    <AddToken list= {list} setList={setList} rpcUrl={url} publicKey={publicKey}/>
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