import React, {useState, useEffect} from 'react'
import decode from 'jwt-decode'

function UserAccount() {

const [recipe, setRecipe] = useState({})
const [userRecipes, setUserRecipes] = useState([])
const loggedUser = decode(localStorage.getItem("token"))
const username = loggedUser.username
const userId = loggedUser.user_id 


const fetchUserRecipes = () => {
  fetch("http://localhost:3000/recipes")
  .then(res => res.json())
  .then(data => {
    const filterRecipes = data.recipes.filter(user_id => user_id.user_id === userId)
    setUserRecipes(filterRecipes)
  })
}

useEffect(() => {
  fetchUserRecipes()
}, [])


const userRecipesMap =
userRecipes.map(recipe => {return (
<div>
  <li>{recipe.name}</li>
  <li>{recipe.url}</li>
  <li>{recipe.url}</li>
  <img width="300" height="250" src={recipe.img} alt="not available"></img>
  </div>

)})














const onImage = (e) => {
  e.persist()
  setRecipe({
    ...recipe,
    [e.target.name]: e.target.files[0]
  })
  console.log(e.target.files[0])
}

const onChange = (e) => {
  e.persist()
  setRecipe({
    ...recipe,
    [e.target.name]: e.target.value
  })
  console.log(e.target.name)
}

const onSubmit = (e) => {
  e.preventDefault()
  const form = new FormData()
  form.append("name", recipe.name )
  form.append("url", recipe.url)
  form.append("ingredients", recipe.ingredients)
  form.append("calories", recipe.calories)
  form.append("daily_value", recipe.daily_value)
  form.append("servings", recipe.servings)
  form.append("img", recipe.img)
  form.append("source", recipe.source)
  fetch("http://localhost:3000/recipes",{
    method: "POST",
    headers: {
      "Authorization": `bearer ${localStorage.getItem("token")}`,
    },
    body: form
  })
}


  

  return (
    <div>
      {userRecipesMap}
      <h1>Welcome {username.charAt(0).toUpperCase() + username.slice(1)}</h1>
      <form onSubmit={onSubmit}className="createRecipe">
        <input onChange={onChange}type="text" name="name"></input>
        <input onChange={onChange}type="text" name="url"></input>
        <input onChange={onChange}type="text" name="ingredients"></input>
        <input onChange={onChange}type="text" name="calories"></input>
        <input onChange={onChange}type="text" name="daily_value"></input>
        <input onChange={onChange}type="text" name="servings"></input>
        <input onChange={onChange}type="text" name="source"></input>
        
        <input onChange={onImage} type="file" name="img"></input>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  )
}

export default UserAccount
