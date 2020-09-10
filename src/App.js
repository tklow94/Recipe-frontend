import React, {useState, useEffect} from 'react';
import './App.css'
import Signup from './components/Signup'
import SignIn from './components/Signin'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import Home from './components/onepirate/Home'
import Home from './components/Home'
import RecipeCard from './components/RecipeCard'
import UserAccount from './components/UserHome/UserAccount'
import NotUserPage from './components/NotUserPage'
import Followers from './components/UserHome/Followers'
import Explore from './components/Explore'
import Feeds from './components/UserHome/Feeds'
import UserSearch from './components/UserHome/UserSearch'










function App() {
  const APP_ID = process.env.REACT_APP_RECIPE_ID
  const APP_KEY = process.env.REACT_APP_RECIPE_API

  
  
  
  const initialState = {username: "", password: "", password_confirmation: "", avatar: {}}
  const [entry, setEntry] = useState(initialState)
  const [recipe, setRecipe] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState('chicken')
  const [userRecipes, setUserRecipes] = useState([])
  // const [users, setUsers] = useState([])



  // const getUsers = () => {
  //   fetch("http://localhost:3000/users")
  //     .then(res => res.json())
  //     .then(data => setUsers(data.user))
  // }

  // useEffect(() => {
  //   getUsers()
  // }, [])


  const [comments, setComments] = useState([])

  const API = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`


  


  const getRecipes =  () => {
    fetch(API)
      .then(res => res.json())
      
      .then(data => setRecipe(data.hits))
  }


 const getUserRecipes =  () => {
  fetch("http://localhost:3000/recipes")
    .then(res => res.json())
    
    .then(data => setUserRecipes(data.recipes))
}

useEffect(() => {
  getUserRecipes()
}, [])

useEffect(() => {
  getRecipes();
 
}, [query])



 

 



 

  



 



  

  const handleChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value.trim().toLowerCase()
    })
  }

    

   
  


  return (
   
    <Router>
    <div className="App">
      
    
      <Switch>

        <Route exact path="/"  render={() => localStorage.getItem("token") ? <Home recipe={recipe} search={search} setSearch={setSearch} setQuery={setQuery}/> : <SignIn entry={entry} setEntry={setEntry} handleChange={handleChange}/> }/>
        <Route path="/recipecard/:id" render={() => localStorage.getItem("token") ? <RecipeCard comments={comments} setComments={setComments}/> : <SignIn entry={entry} setEntry={setEntry} handleChange={handleChange}/>  }/>
        <Route path="/userhome" render={() => localStorage.getItem("token") ? <UserAccount   entry={entry} setEntry={setEntry} handleChange={handleChange} userRecipes={userRecipes} setUserRecipes={setUserRecipes} />:<SignIn entry={entry} setEntry={setEntry} handleChange={handleChange}/>}/>
        <Route path="/signup" render={() => <Signup entry={entry} setEntry={setEntry} handleChange={handleChange} /> }/>
      <Route path="/signin" render={()=> <SignIn entry={entry} setEntry={setEntry} handleChange={handleChange}/>}/>
      <Route path="/notuserpage/:id" render={()=> localStorage.getItem("token") ? <NotUserPage  />: <SignIn entry={entry} setEntry={setEntry} handleChange={handleChange}/> }/>
    <Route path="/followings" render= {() => <Followers/>}/>
    <Route path="/explore" render= {() => <Explore/>}/>
    <Route path="/feeds" render= {() => <Feeds/>}/>
    <Route path="/userSearch" render= {() => <UserSearch/>}/>

      </Switch>
    </div>
    </Router>
  );
}

export default App;
