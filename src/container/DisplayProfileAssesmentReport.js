import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { TextField, Divider, Box, Checkbox, makeStyles,CircularProgress} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import Table from './GenerateTable';
import TabPanel from './TabPanel';
import fetchReportApi from '../api/index';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />

const checkedIcon = <CheckBoxIcon fontSize="small" />

const useStyles = makeStyles(theme => ({
  inputRoot: {
    '& .MuiChip-root': {
      backgroundColor: 'blue',
      color          : 'white'
    },
    '& .MuiChip-deleteIcon': {
      color: 'lightblue'
    },
    width: '100%'
  },
  switchPosition: {
    marginLeft: '-1%'
  },
  imageUploadPosition: {
    marginTop: '10px'
  },
  inputFieldPosition: {
    display: 'none'
  },
  avatarPosition: {
    display: 'inline-block'
  },
  imageHelpText: {
    fontSize: '12px'
  },
  formCreateButton: {
    textAlign: 'center'
  },
  formClearButton: {
    textAlign: 'right'
  }
}))

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin : 0,
    padding: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      width : '25ch'
    }
  }
}))(MuiDialogActions)

const fetchEntireReport = async() => fetchReportApi();

export default function DisplayProfileAssesmentReport(props) {
    

    const [open, setOpen] = React.useState(true)
    const [jsonReport, setJSONReport] = useState({})
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(()=>{
        async function fetchData() {
            // You can await here
            const response = await fetchReportApi(props.usrData);
            setJSONReport(response)
            // ...
        }
        fetchData();
    },[])
    

  return (
    <React.Fragment>
      {
          (jsonReport && Object.keys(jsonReport).length > 0) 
                      ?
                (
                    <Dialog key="1" aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth="md">
                            <TabPanel data={jsonReport}/>
                    </Dialog>
                )
                      :
            (<CircularProgress style={{marginLeft:'45vw', marginTop:'45vh'}}/>)
      }
    </React.Fragment>
  )
}
