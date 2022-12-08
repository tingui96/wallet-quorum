import {Html5QrcodeScanner} from "html5-qrcode"
import React from "react"

class QRSCANNER extends React.Component {
  constructor(props)
  {
    super(props);
    function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
    }
    
    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }
    var html5QrcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: {width: 250, height: 250} },
      /* verbose= */ false);
      html5QrcodeScanner.render(onScanSuccess, onScanFailure)
      this.setState(html5QrcodeScanner)
     
  }
  render()
  {
    return(<div id="reader" width="500px"></div>);
  }
}
export default QRSCANNER;

