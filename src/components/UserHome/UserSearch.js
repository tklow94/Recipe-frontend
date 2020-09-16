import React, {useState, useEffect} from 'react'
import decode from 'jwt-decode'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar'


// save search in state and onsubmit filter results to display
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
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

  const useStyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
      }
  }));





function UserSearch() {
const loggedUser = decode(localStorage.getItem("token"))
const username = loggedUser.username
const userId = loggedUser.user_id 
const [recipe, setRecipe] = useState([])
const [result, setResult] = useState([])
const [query, setQuery] = useState("")
const [user, setUser] = useState([])
const [userResult, setUserResult] = useState([])
const [userQuery, setUserQuery] = useState("")
const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const fetchUsers = () => {
    fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(data => setUser(data.user) )
}

useEffect(() => {
    if(userResult)
    fetchUsers()
},[userResult])

const fetchRecipes = () => {
    fetch('http://localhost:3000/recipes')
    .then(res => res.json())
    .then(data => setRecipe(data.recipes))
}
useEffect(() => {
    if(result)
    fetchRecipes()
},[result])

const updateUserQuery = (e) => {
    setUserQuery(e.target.value)
}

const updateQuery = (e) => {
    setQuery(e.target.value);
}

const userTime = () => {
    setUser(user.filter(u => u.username.toLowerCase().includes(userQuery.toLowerCase())))
}

const recipeTime = () => {
   
    setRecipe(recipe.filter(r => r.name.toLowerCase().includes(query.toLowerCase())))
}

const ushi = (e) => {
    updateUserQuery(e);
    userTime();
}

const combine = (e) => {
    updateQuery(e);
    recipeTime();
}

const submitUser = (e) => {
    e.preventDefault()
    setUserResult(user);
    setUserQuery("")
} 
console.log(user)

const handleSubmit = (e) => {
    e.preventDefault()
 setResult(recipe);
 setQuery("")
}

const mappedGoodies =  
    result.map(r => {return (
        <div id="card-container"><Link style={{textDecoration: 'none'}} to={`./recipecard/${r.id}`}>  <div id="card-title">{r.name.charAt(0).toUpperCase() + r.name.slice(1)}</div> <div id="recipe-image"><Link to={`/recipecard/${r.id}`}><img id="recipe-image" src={r.img}></img>  </Link></div></Link></div>
    )
})

const classe = useStyle();
const mappedUsers = userResult.map(u => {return (
<div className={classe.root}><Link style={{textDecoration: 'none'}} to={`/notuserpage/${u.id}`}><Avatar className={classe.large} src={u.avatar}/></Link><Link style={{textDecoration: 'none', color: "black"}} to={`/notuserpage/${u.id}`}><h2 style={{fontSize: "26px", position: "relative", top: "20px"}}>{u.username.charAt(0).toUpperCase() + u.username.slice(1)}</h2></Link></div>
)})


const handleClick = () => {
    setResult([]); 
    setUserResult([]);
}



    return (
        <div>
        <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
         
        >
          <Tab  onClick={() => handleClick()} label="Recipes" {...a11yProps(0)} />
          <Tab  onClick={() => handleClick()} label="Users" {...a11yProps(1)} />
         
        </Tabs>
      </AppBar>
    <TabPanel value={value} index={0}>
   
          <form onSubmit={handleSubmit}>
              <input type="text" value={query} onChange={(e) => combine(e)} placeholder="search">
              </input>
              <button type="submit">Search</button>
          </form>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
      <form onSubmit={submitUser}>
              <input type="text" value={userQuery} onChange={(e) => ushi(e)} placeholder="search">
              </input>
              <button type="submit">Search</button>
          </form>
      </TabPanel>
   
    </div>
    {mappedGoodies}
    {mappedUsers}
    
          </div>

      
        
       
      
           
                 
          
     
    )
}

export default UserSearch
