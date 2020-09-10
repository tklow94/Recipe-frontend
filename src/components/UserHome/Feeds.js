import React, {useState, useEffect} from 'react'
import decode from 'jwt-decode'
import {Link} from 'react-router-dom'

function Feeds() {
const loggedUser = decode(localStorage.getItem("token"))
const username = loggedUser.username
const userId = loggedUser.user_id 
const [recipe, setRecipe] = useState([])
const [followed, setFollowed] = useState([])

const fetchRecipes = () => {
    fetch('http://localhost:3000/recipes')
    .then(res => res.json())
    .then(data => setRecipe(data.recipes))
}
useEffect(() => {
    fetchRecipes()
},[])

const fetchFollowed = () => {
    fetch(`http://localhost:3000/users/${userId}`)
        .then(res => res.json())
        .then(data => setFollowed(data.followees.map(user => user.id)))
}

useEffect(() => {
    fetchFollowed()
},[])



const filtered = recipe.filter(function(item){
    return followed.indexOf(item.user_id) !== -1;
})
const feed = filtered.map(r => {return (
 

    <div id="card-container">
        
    <div id="card-title">{r.name}
    </div>
       <div id="recipe-image"><Link to={`/recipecard/${r.id}`}><img id="recipe-image" src={r.img}></img>  </Link></div>
            
        </div>  
        
)})
    return (
        <div>
            {feed}
        </div>
    )
}

export default Feeds
