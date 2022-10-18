import {Box,Button, Image} from "@chakra-ui/react";
import Views from "./views";

function App() {
  return (     

        <Box
          display="flex" 
          alignItems="center"
          justifyCenter="center"
          flexDirection="column"
          padding={30}>
            <Views/>          
        </Box>

  );
}

export default App;
