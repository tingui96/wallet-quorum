import React from 'react';
import {Html5QrcodeScanner} from "html5-qrcode"
import { Box } from '@chakra-ui/react';
//import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
//import ResultContainerPlugin from './ResultContainerPlugin.jsx'
//
const QRSCANNER = () =>
{
    const onScanSuccess = (decodedText, decodedResult) => {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);
      };
      
    const onScanFailure = (error) => {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`);
      };
     // html5QrcodeScanner.render(onScanSuccess, onScanFailure)
    const html5QrcodeScanner = new Html5QrcodeScanner('reader',{ fps: 10, qrbox: {width: 250, height: 250} },
        /* verbose= */ false);
    const config = { fps: 10, qrbox: {width: 250, height: 250} }

   
        html5QrcodeScanner.render(onScanSuccess,onScanFailure);
   
    

    return (
        
        <>
            <div id='reader' width='500px' >{/*render()*/}</div>
        </>
    );
}

//
//import { QrCodeScanner } from "react-simple-qr-code-scanner";
//import { Text} from "@chakra-ui/react";
//import { useState } from "react";
//const QRSCANNER = () => {
//    const [result,setResult] = useState('');
//    const error ='';
//  return (
//    <>
//    <QrCodeScanner onResult={(result) => {setResult(result)}}
//      Errors={(error) => {console.log(error);}}  //or user
//    />
//    <Text>{result} </Text>
//    </>
//  );
//}
export default QRSCANNER;

  
