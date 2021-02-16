import React from 'react';
//import Button from '@material-ui/core/Button';
//import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
  },
  paper: {
    marginRight: theme.spacing(2),
    display:"inline-block",
  },
}));

export default function Menu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          <MenuItem onClick={handleClose}>5F</MenuItem>
          <MenuItem onClick={handleClose}>4F</MenuItem>
          <MenuItem onClick={handleClose}>3F</MenuItem>
          <MenuItem onClick={handleClose}>2F</MenuItem>
          <MenuItem onClick={handleClose}>1F</MenuItem>
        </MenuList>
      </Paper>  
    </div>
  );
}