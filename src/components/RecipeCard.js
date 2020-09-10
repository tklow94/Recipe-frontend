import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import decode from 'jwt-decode'
//onClick post to db to change like count by 1 using prevState. Make sure can only like once. Set true false statement such that when true is liked, when false is not liked

function RecipeCard() {
 const {id} = useParams()
 const [recipe, setRecipe] = useState({ingredients: "there, ingreidnest"})
const token = localStorage.getItem('token')
 const loggedUser = decode(localStorage.getItem("token"))
const username = loggedUser.username
const userId = loggedUser.user_id 
const [userRecipes, setUserRecipes] = useState([])
const [comments, setComments] = useState([])
const [avatar, setAvatar] = useState("")


const [search, setSearch] = useState("")

const updateSearch = (e) => {
  setSearch(e.target.value)
}


const [reply, setReply] = useState("")

const updateReply = (e) => {
  // setReply(e.target.value)
  console.log(e.target.value)
}













const fetchComments = () => {
  fetch(`http://localhost:3000/recipes/${id}/comments`)
  .then(res => res.json())
  .then(data => setComments(data.comments))
}
useEffect(() => {
fetchComments()
},[comments])


const handleSubmit = (e) => {
  e.preventDefault()
  fetch(`http://localhost:3000/recipes/${id}/comments`,{
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        content: search,
        recipe_id: id,
        commentable_id: id,
        commentable_type: "Recipe",
        user_id: userId
      })
  })
  .then(res => res.json())
  .then(data => console.log(data))

}
const handleReply = (commentId) => {
  // e.preventDefault()
  fetch(`http://localhost:3000/recipes/${id}/comments`,{
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        content: search,
        recipe_id: id,
        commentable_id: commentId,
        commentable_type: "Comment",
        user_id: userId
      })
  })
  .then(res => res.json())
  .then(data => console.log(data))

}

const getRecipe = () => {
  fetch(`http://localhost:3000/recipes/${id}`)
    .then(res => res.json())
    .then(data => setRecipe(data))
  }
  
 
 useEffect(() => {
  getRecipe()
 },[])



const getComments = () => {
  fetch(`http://localhost:3000/recipes/${id}/comments`)
  .then(res => res.json())
  .then(data => setComments(data.comments))

  }  
  useEffect(() => {
    getComments()
   },[])



   const CommentBox = ({ comment, allComments }) => {
    const children = allComments.filter(
      (c) => c.commentable_type === "Comment" && c.commentable_id === comment.id
    );
  
    return (
      <li>
        {comment.content}
        {children ? <CommentBoxes comments={children} allComments={allComments} /> : null}
        <input type="text" value={reply} onChange={updateReply}></input> <button>Reply</button>
      </li>
      
    );
  };

  
 
  
  const CommentBoxes = ({ comments, allComments }) => (
    <ul>
      {comments.map((c) => (
        
        <CommentBox comment={c} allComments={allComments} key={c.id}/>
        
      ))}
      
    </ul>
    
  );
  
  const App = () => {
    const rootComments = comments.filter((c) => c.commentable_type === "Recipe");
    return <CommentBoxes comments={rootComments} allComments={comments} />;
  };
  
  
   const fetchUserRecipes = () => {
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      setUserRecipes(data);
      setAvatar(data.user.avatar)
 
    })
  }
  
  useEffect(() => {
    fetchUserRecipes()
    
  }, [])


   const deleteRecipe = (id) => {

    fetch(`http://localhost:3000/recipes/${id}`,{
      method: "DELETE",
      headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
    })
      .then(res => fetchUserRecipes() )
      alert('Recipe Has been Deleted')
  }

    return (
      
      
      <div id="card-container">
        
    <div id="card-title">{recipe.name}<Link to="/userHome">
          {recipe.user_id=== userId ? <button onClick={() => deleteRecipe(recipe.id)} className="astext" style={{ fontSize: "20px"}}><FaTrashAlt/></button> : null}

        </Link>
        {userRecipes.user_id !== userId ? <Link to={`/notuserpage/${userRecipes.user_id}`}><img style={{borderRadius: "50%", width: "50px",
    height: "50px", float: "right", objectFit: "cover", position:"relative", top: "-8px"}} src={avatar}></img></Link> : <Link to={`/userhome`}><img style={{borderRadius: "50%", width: "50px",
    height: "50px", float: "right", objectFit: "cover", position:"relative", top: "-8px"}} src={avatar}></img></Link>}
       
        </div>
       <div id="recipe-image"><img id="recipe-image" src={recipe.img}></img></div>
    <div id="details">Calories: <span class="detail-value">{recipe.calories}</span> | Cook time: <span class="detail-value">55 minutes</span> | Servings: <span class="detail-value">{recipe.servings}</span></div>
      <div id="card-items">
        <span class="card-item-title">Ingredients</span>
        <ul class="checkmark">
    
         {recipe.ingredients.replace(/[^a-zA-Z ][,]+/g, "").split(",").map(i => <li>{i}</li>)}
        </ul>
      </div>
      
      <div id="method">
      <span class="card-item-title">Method</span>
        <ol>
    <li>{recipe.source}</li>
    </ol>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <textarea value={search} onChange={updateSearch} style={{width:"100%"}} placeholder="Comments"></textarea>
          <button type="submit" >Comment</button>
        </form>
      </div>
      <App/>
      <Link to="/userhome">
<button className="active-recipe__button">
                      GO BACK 
                    </button>
                    </Link>
    </div>
      // onSubmit post <div> with reply button. On reply, post  another <div> with reply



//         <div className="containers">
//           <div className="cards">
// <div className="card">
//     <img className="active-recipe__img" src={recipe.img} alt="No Content Found" />
//     <h3 className="active-recipe__title">{recipe.name}</h3>
//     <h4 className="active-active-recipe__publisher">{recipe.source}</h4>
//     <p className="active-recipe__website">Recipe:</p>

//     <table >
//   <tr>
//     <th>Nutritient</th>
//     <th>Percent </th> 
//     <th>Daily Value</th>
//   </tr>
//   <tr>
//     <td>Jill</td>
//     <td>Smith</td>
//     <td>50</td>
//   </tr>
//   <tr>
//     <td>Eve</td>
//     <td>Jackson</td>
//     <td>94</td>
//   </tr>
//   <tr>
//     <td>John</td>
//     <td>Doe</td>
//     <td>80</td>
//   </tr>
// </table>
//     </div>
// <br/><br/>
// </div>
/* <Link to="/userhome">
<button className="active-recipe__button">
                      GO BACK 
                    </button>
                    </Link> */
            
//             <br/><br/>
//         <button onClick={handleClick}Submit Comment></button>
      
      
//         </div>
    )
}

export default RecipeCard
