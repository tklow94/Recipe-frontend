import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/onepirate/modules/components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/onepirate/modules/components/Toolbar';


// const fontHeader = {
//     color: rawTheme.palette.text.primary,
//     fontWeight: rawTheme.typography.fontWeightMedium,
//     fontFamily: rawTheme.typography.fontFamilySecondary,
//     textTransform: 'uppercase',
//   };
const styles = (theme) => ({
  title: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: "700",
    fontFamily: "'Roboto Condensed', sans-serif",
    color: '#e0e0e0',
    
      
    

  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;

  const handleToken = () => {
    localStorage.removeItem("token")
  }

  const signInLink = () => {
    if(localStorage.token !== undefined){
      return <Link
      color="inherit"
      variant="h6"
      underline="none"
      className={classes.rightLink}
      href="/signin"
      onClick={handleToken}
    >
      {'Sign Out'}
    </Link>

    }else{
      return     <Link
      color="inherit"
      variant="h6"
      underline="none"
      className={classes.rightLink}
      href="/signin"
    >
      {'Sign In'}
    </Link>
    }
  }

  


  return (
    <div>
      <AppBar position="fixed" style={{ background: '#000000' }}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/premium-themes/onepirate/"
          >
            {'Chicken a la King'}
          </Link>
     
          <div className={classes.right}>

            
            
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              href="/userhome"
            >
              {'Account'}
              {signInLink()}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
