import React, {useState, useEffect} from 'react';
import './App.css'
import Signup from './components/Signup'
import SignIn from './components/Signin'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import Home from './components/onepirate/Home'
import Home from './components/Home'
import RecipeCard from './components/RecipeCard'
import UserAccount from './components/UserAccount'
import SearchUserContent from './components/SearchUserContent'








function App() {
  const APP_ID = "688af3ce"
  const APP_KEY = "2d13f387380e2ed037495f84be46e8d8"

  
  
  const initialState = {username: "", password: "", password_confirmation: ""}
  const [entry, setEntry] = useState(initialState)
  const [recipe, setRecipe] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState('chicken')
  const [userRecipes, setUserRecipes] = useState([])


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

    const protect = () => {
      if(localStorage.token !== undefined){
        return <Home recipe={recipe} search={search} setSearch={setSearch} setQuery={setQuery}/>
      }else{
        return <SignIn entry={entry} setEntry={setEntry} handleChange={handleChange}/>
      }
    }
    




  return (
   
    <Router>
    <div className="App">
      
    
      <Switch>

        <Route exact path="/"  render={protect }/>
        <Route path="/recipecard" render={() => <RecipeCard comments={comments} setComments={setComments}/> }/>
        <Route path="/userhome" render={() => <UserAccount  entry={entry} setEntry={setEntry} handleChange={handleChange} userRecipes={userRecipes} setUserRecipes={setUserRecipes} />}/>
        <Route path="/signup" render={() => <Signup entry={entry} setEntry={setEntry} handleChange={handleChange} /> }/>
      <Route path="/signin" render={()=> <SignIn entry={entry} setEntry={setEntry} handleChange={handleChange}/>}/>
      <Route path="/userrecipe" render={()=> <SearchUserContent userRecipes={userRecipes} />}/>
      
      </Switch>
    </div>
    </Router>
  );
}

export default App;
