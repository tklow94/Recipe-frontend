import React, {useState, useEffect} from 'react'
import decode from 'jwt-decode'
import {Link} from 'react-router-dom'
// import Masonry from 'react-masonry-css'
// import Gallery from "react-photo-gallery";


function Explore() {
const loggedUser = decode(localStorage.getItem("token"))
const username = loggedUser.username
const userId = loggedUser.user_id 
const [recipe, setRecipe] = useState([])

const fetchRecipes = () => {
    fetch('http://localhost:3000/recipes')
    .then(res => res.json())
    .then(data => setRecipe(data.recipes))
}
useEffect(() => {
    fetchRecipes()
},[])
const shuffleArray = (array) => {
    // let i = array.length -1
   
    for (var i = array.length; i>1; i--){
        const r = Math.floor(Math.random()*(i))
        const temp = array[r]
        array[r] = array[i-1]
        array[i-1] = temp
    }
    return array
}
const recipeFeed = recipe.filter(r => r.user_id !== userId)

const shuffledPost = shuffleArray(recipeFeed)
console.log(shuffledPost)
const feed = shuffledPost.map(r => {return (
 

    <div className="grid-block">
      <div className="tile">
        <a className="tile-link" href={`/recipecard/${r.id}`}>
            
          <img className="tile-img tile-img1" src={r.img} alt="Image"/>
        </a>
      </div>
    </div>
 

   
)})

   
    return (
        <div className="grid image-grid">
            {feed}
        </div>
    )
}

export default Explore
