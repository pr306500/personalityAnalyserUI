import React, {useState} from 'react';
import DisplayProfileAssesmentReport from './container/DisplayProfileAssesmentReport';
import FormUserInput from './container/FormUserInput';

function App() {

  const [usrInfo, setUsrInfo] = useState("")
  const submitFormDetails = (info)=>{
    setUsrInfo(info)
  }
  return (
    <React.Fragment>
       {
         (usrInfo === "") ?
         (<FormUserInput formInfo={{usrInfo, submitFormDetails}}/>)
          :
          (<DisplayProfileAssesmentReport usrData={usrInfo}/>)
       }
    </React.Fragment>
  );
}

export default App;
