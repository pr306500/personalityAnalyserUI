import React from 'react';
import {TextareaAutosize, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
}));

export default function FormUserInput(props) {
  const classes = useStyles();

  const updateUsrInfo = (e)=>{
      const {name, value} = e.target;
      props.formInfo.usrInfo = value;
  }

  return (
    <form className={classes.root} style={{paddingLeft:'25vw', marginTop:'25vh'}}>
            <TextareaAutosize aria-label="minimum height" rowsMin={15} style={{width:'40vw'}} onChange={updateUsrInfo} placeholder="Enter User Info.." />
         <div>
             <Button variant="contained" onClick={()=>props.formInfo.submitFormDetails(props.formInfo.usrInfo)}>Generate Report</Button>
         </div>
    </form>
  );
}
