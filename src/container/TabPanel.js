import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from './GenerateTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <React.Fragment>
      <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
    </React.Fragment>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function GenerateTabPanel(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {typo_mistakes, personality_info} = props.data;
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment >
      <AppBar position="static" color="default" className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Spelling Report" {...a11yProps(0)} />
          <Tab label="Personality Report" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Table data={typo_mistakes} header={['Typos','Suggestions']} flag={'typos'} cnt={personality_info.word_count}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table data={personality_info} header={['Traits','Percentile Analysis']} flag={'personality'} cnt={personality_info.word_count}/>
      </TabPanel>
    </React.Fragment>
  );
}
