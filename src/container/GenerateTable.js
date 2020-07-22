import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {TableBody, TableHead, Link, Chip} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
    </React.Fragment>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function GenerateTable(props) {

    function createData(name, suggestions) {
            return { name, suggestions};
    }
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [choosenTopic, setTopic] = React.useState(null);

    if(props.data){
        let rows = [];
        if(props.flag === "typos"){
            rows = Object.keys(props.data).map((key)=> createData(<Chip label={key} variant="outlined" />, props.data[key]['suggestions'].length > 0 ? 
                props.data[key]['suggestions'].map((value, id)=> <Chip label={value} variant="outlined" key={id}/> )
                : 
                <Chip label="None" variant="outlined" />))
        }else{
            let obj = [];
            Object.keys(props.data).forEach((key) =>{
                if(Array.isArray(props.data[key])){
                    props.data[key].forEach((personality_details)=>{
                        let args1 = "",
                            args2 = ""; 
                        Object.keys(personality_details).forEach((key)=>{
                            if('name' === key){
                                args1 = personality_details[key]
                            }
                            else if(key === "percentile"){
                                
                                args2 = personality_details[key].toString().slice(0, 4)
                            }
                        })
                        if(args1 && args2){
                            obj.push(createData(<Chip label={args1} variant="outlined" />, <Chip label={args2} variant="outlined" />));
                        }
                    })
                }
            })
            rows = [...obj]
        }
        
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const fetchTopicQuests = (id) =>{
          return(
           setTopic(id)
          )
       }
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };
        
      
        return (
          <React.Fragment>
              <TableContainer component={Paper}>
               <Table className={classes.table} aria-label="custom pagination table">
               <TableHead>
                   <TableRow style={{backgroundColor:'black'}}>
                      <TableCell style={{color:'white'}}>{props.header[0]}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>{props.header[1]}</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {(rowsPerPage > 0
                     ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                     : rows
                   ).map((row) => (
                     <TableRow key={row.name}>
                       <TableCell component="th" scope="row">
                         {row.name}
                       </TableCell>
                       <TableCell align="right">
                         {row.suggestions}
                       </TableCell>
                     </TableRow>
                   ))}
         
                   {emptyRows > 0 && (
                     <TableRow style={{ height: 53 * emptyRows }}>
                       <TableCell colSpan={6} />
                     </TableRow>
                   )}
                 </TableBody>
                 <TableFooter>
                   <TableRow>
                   <Chip style={{marginTop:'3.5%', marginLeft:'3%'}}
                      label={`Word Count: ${props.cnt}`}
                      color="primary"
                    />
                     <TablePagination
                       rowsPerPageOptions={[5, { label: 'All', value: -1 }]}
                       colSpan={3}
                       count={rows.length}
                       rowsPerPage={rowsPerPage}
                       page={page}
                       SelectProps={{
                         inputProps: { 'aria-label': 'rows per page' },
                         native: true,
                       }}
                       onChangePage={handleChangePage}
                       onChangeRowsPerPage={handleChangeRowsPerPage}
                       ActionsComponent={TablePaginationActions}
                     />
                   </TableRow>
                 </TableFooter>
               </Table>
             </TableContainer>
      
          </React.Fragment>
          );
    }
 
}
