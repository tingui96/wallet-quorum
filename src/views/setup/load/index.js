import React from "react";  
import { FormControl, FormLabel, FormHelperText,
    Text, Alert, InputGroup,
     Input, Button,
} from "@chakra-ui/react";            
import { useState } from "react";   


const Load = ({setSecret,setPublicKey}) => {
        const [name, setName] = useState("");
        const [selectedFile, setSelectedFile] = useState(null);  
        const [secretToImport, setSecretToImport] = useState('')  
        const handleSecretChange = (event) => {
                setSecretToImport(event.target.value);
            };
        const importAccount = () => {
            if(secretToImport.length===66)
            {
                const Web3 = require('web3');
                const web3 = new Web3();
                const sourceKeys = web3.eth.accounts.privateKeyToAccount(secretToImport);
                const publicKey = sourceKeys.address;
                setSecret(secretToImport);
                setPublicKey(publicKey);
                localStorage.setItem('publicKey', publicKey);
                localStorage.setItem('secret',secretToImport);

            }

        }; 
        const password = '' ; 

    return (
        <FormControl>
        <FormLabel>Importar llave privada</FormLabel> 
        <Input type="file" alignContent="center"
            onFileSelectSuccess={(file) => setSelectedFile(file)}
            onFileSelectError={({ error }) => alert(error)}
        />
        <FormHelperText>Nunca compartas la llave privada</FormHelperText>
        <Input type="password" placeholder="Pasword del archivo" value={password}/>
        <Button mt={5} colorScheme="green" onClick={importAccount}>Submit</Button>
        </FormControl>
    );
};
export default Load; 



                
             
                
               