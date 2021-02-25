import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import 'react-sortable-tree/style.css';
import SwipeableViews from 'react-swipeable-views';
import CodeView from '../components/CodeView';
import Preview from '../components/Preview';
import { useJsve } from '../shared/useJsve';
import '../styles.css';
import Editor from './Editor';

const TabPanel = (props) => {
  const { children, tab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tab !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {tab === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const JsveComponent = () => {
  const { jsve, setJsve } = useJsve();
  const classes = useStyles();
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => setTab(newValue);
  const handleTabChangeIndex = (index) => setTab(index);

  const renderTabs = () => {
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Editor" {...a11yProps(0)} />
            <Tab label="Code" {...a11yProps(1)} />
            <Tab label="Preview" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tab}
          onChangeIndex={handleTabChangeIndex}
        >
          <TabPanel value={tab} index={0} dir={theme.direction}>
            Editor
          </TabPanel>
          <TabPanel value={tab} index={1} dir={theme.direction}>
            Code
          </TabPanel>
          <TabPanel value={tab} index={2} dir={theme.direction}>
            Preview
          </TabPanel>
        </SwipeableViews>
      </div>
    );
  };

  const renderContent = () =>
    tab === 0 ? (
      <Editor jsve={jsve} setJsve={setJsve} />
    ) : tab === 1 ? (
      <CodeView jsve={jsve} />
    ) : tab === 2 ? (
      <Preview jsve={jsve} />
    ) : null;

  return (
    <>
      {renderTabs()}
      {renderContent()}
    </>
  );
};
