import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'

const useStyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function Avatars() {
    const classes = useStyle();
    return (
      
              <div className={classes.root}>
      <Avatar />
    
    </div>
    
    )
}

export default Avatars
