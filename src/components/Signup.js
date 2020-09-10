import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Chicken a la King
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();

  // const [users, setUsers] = useState([])

  // const getUsers = () => {
  //   fetch("http://localhost:3000/users")
  //     .then(res => res.json())
  //     .then(data => setUsers(data.user))
  // }
  
  

  // useEffect(() => {
  //   getUsers()
  // }, [])

  const onImage = (e) => {
    e.persist()
    
    props.setEntry({
      ...props.entry,
      [e.target.name]: e.target.files[0]
    })
    console.log(e.target.files[0])
  }

console.log(props.entry)
 
    const userSignUp = (e) => {
        e.preventDefault()
          if (props.entry.password !== props.entry.password_confirmation){
            alert("Passwords don't match!")
          
        }else if (props.entry.username === ""){
          alert("Requires a Username")
        }
        // else if (users.find(user => user.username === props.entry.username)){
        //   alert("Username Already Taken")
        // }
        else{
          const form = new FormData()
          form.append("username", props.entry.username)
          form.append("password", props.entry.password)
          form.append("avatar", props.entry.avatar)
          fetch("http://localhost:3000/users", {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            body: form
            // JSON.stringify(props.entry)
        
          })
          .then(res => res.json())
          .then( data =>{ console.log(data)
        localStorage.setItem("token", data.token)
        if (data.token ){
        history.push("/") 
      }else{
        alert("Username or Password Incorrect")
        }
      })
          // )
          }
        }
          // .then(res =>  fetch("http://localhost:3000/login", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json"
          //   },
          //   body: JSON.stringify(props.entry)
           
          // })
       
     
        
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                id="password_confirmation"
                // autoComplete="current-password"
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            <Grid item xs={12}>
          <Input required type="file" name='avatar' onChange={onImage}></Input>
        </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={userSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" href="/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}


