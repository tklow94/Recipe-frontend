import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import decode from 'jwt-decode'
import 'semantic-ui-css/semantic.min.css'
import {  Header } from 'semantic-ui-react'
import 'react-slidedown/lib/slidedown.css'

function RecipeCard() {
  const [rc, setRc] = useState(true)
 const {id} = useParams()
 const [recipe, setRecipe] = useState({ingredients: "there, ingreidnest", source: "things. here."})
const token = localStorage.getItem('token')
 const loggedUser = decode(localStorage.getItem("token"))
const username = loggedUser.username
const userId = loggedUser.user_id 
const [reply, setReply] = useState("")
const [comments, setComments] = useState([])
const [userRecipes, setUserRecipes] = useState([])


const [avatar, setAvatar] = useState("")

const [search, setSearch] = useState("")

const updateSearch = (e) => {
  setSearch(e.target.value)
}
const getRecipe = () => {
  fetch(`http://localhost:3000/recipes/${id}`)
    .then(res => res.json())
    .then(data => setRecipe(data))
  }
  
 
 useEffect(() => {
  getRecipe()
 },[])

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
    // .then(res => fetchUserRecipes() )
    // alert('Recipe Has been Deleted')
}



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
  .then(data => getComments())

}


const getComments = () => {
  fetch(`http://localhost:3000/recipes/${id}/comments`)
  .then(res => res.json())
  .then(data => setComments(data.comments))

  }  
  useEffect(() => {
    
    getComments()
   },[])

const updateReply = (e) => {
  console.log(e.target.name)
  setReply(e.target.value)

}
const handleReply = (cId) => e => {
  e.preventDefault()
  fetch(`http://localhost:3000/recipes/${id}/comments`,{
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        content: reply,
        recipe_id: id,
        commentable_id: cId,
        commentable_type: "Comment",
        user_id: userId
      })
  })
  .then(res => res.json())
  .then(data => getComments())

}


  const commentOrReply = () => {

    return rc ?  <form onSubmit={handleSubmit}>
    <textarea value={search} onChange={updateSearch} style={{width:"100%"}} placeholder="Comments"></textarea>
      <button type="submit" >Comment</button>
    </form> : <form onSubmit={handleSubmit}>
    <textarea value={search} onChange={updateSearch} style={{width:"100%"}} placeholder="Comments"></textarea>
      <button type="submit" >Reply</button>
    </form> 
  }


    return (
      
      
      <div id="card-container">
        
    <div id="card-title">{recipe.name}<Link to="/userHome">
          {recipe.user_id=== userId ? <button onClick={() => deleteRecipe(recipe.id)} className="astext" style={{ fontSize: "20px"}}><FaTrashAlt/></button> : null}

        </Link>
        
        {userRecipes.user_id !== userId ? <Link to={`/notuserpage/${userRecipes.user_id}`}><img style={{borderRadius: "50%", width: "50px",
    height: "50px", float: "right", objectFit: "cover",  position:"relative", top: "-12px"}} src={avatar}></img></Link> : <Link to={`/userhome`}><img style={{borderRadius: "50%", width: "50px",
    height: "50px", float: "right", objectFit: "cover", position:"relative", top: "-12px"}} src={avatar}></img></Link>}
       
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
    {recipe.source.split(".").map(i => <li>{i}</li>)}
    </ol>
      </div>
      <Header as='h3' dividing>
      Comments
    </Header>
      <App comments={comments} reply={reply} handleReply={handleReply} updateReply={updateReply}/>
      <div>
       {commentOrReply()}
      </div>
      <Link to="/userhome">
<button className="active-recipe__button">
                      GO BACK 
                    </button>
                    </Link>
    </div>
     
    )
}
const CommentBox = ({  cId, reply, updateReply, handleReply, comment, allComments }) => {
  const children = allComments.filter(
    (c) => c.commentable_type === "Comment" && c.commentable_id === comment.id
  );

  return (
    <div className="commentDiv">
    <img className="commentImage" src={comment.avatar} alt="no Image"></img>
  <h6>{comment.username}</h6>
    <li style={{listStyleType: 'none', position:"relative", top:"5px"}}>    
        {comment.content}
        <form onSubmit={handleReply(cId)}>
        {/* <input name={cId} type="text" value={reply} onChange={updateReply}></input> */}
        <button className="replyButton">Reply</button>
       </form>
      {children ? <CommentBoxes  reply={reply} handleReply={handleReply} updateReply={updateReply} comments={children} allComments={allComments} /> : null}
    </li>
    </div>
  );
};

const CommentBoxes = ({  reply, handleReply, updateReply, comments, allComments }) => (
 <ul>
    {comments.map((c) => (
      <CommentBox reply={reply} handleReply={handleReply} updateReply={updateReply} comment={c} allComments={allComments} cId={c.id}/>
    ))}
  </ul>
);

const App = ({  reply, updateReply, handleReply, comments}) => {
  const rootComments = comments.filter((c) => c.commentable_type === "Recipe");
  return ( <div><CommentBoxes  reply={reply} handleReply={handleReply} updateReply={updateReply}  comments={rootComments} allComments={comments} />
 </div>)
};

export default RecipeCard
