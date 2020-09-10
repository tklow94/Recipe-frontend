import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import decode from 'jwt-decode'
import {Img} from 'react-image'
import { FaHome, FaSignOutAlt, FaSearch, FaComment, FaHeart} from 'react-icons/fa'

function NotUserPage() {
    const {id} = useParams()
    const [user, setUser] = useState({username: "", avatar: "", recipes: [], followees: [], followers: []})
    const loggedUser = decode(localStorage.getItem("token"))
    const username = loggedUser.username
    const userId = loggedUser.user_id 
    const [ids, setIds] = useState([])


const fetchFollowData = () => {
    fetch(`http://localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(data => setIds(data.followed_users.filter(user => user.followee_id === parseInt(id))))
    
}




// if includes followee_id set unfollow  else follow

useEffect(() => {
   
    fetchFollowData()
},[])
let trevor = ids.map(user => user.followee_id).includes(parseInt(id))


const [followUnFollow, setFollowUnFollow] =  useState()
useEffect(() => {
    if(ids)
    setFollowUnFollow(trevor)
},[ids])
console.log([trevor, followUnFollow])









    const fetchUserData = () => {
        fetch(`http://localhost:3000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }

    useEffect(() => {
        fetchUserData()
    }, [])


const history = useHistory()
    const userRecipesMap = 

    user.recipes.map(recipe => {return (
      
    
    // <Link to={`recipecard/${recipe.id}`}>
    
    <div onClick={() => {history.push(`/recipeCard/${recipe.id}`) }} className="gallery-item" >
    
      <img className="gallery-image" src={recipe.img} alt="not available" ></img>
    
      <div className="gallery-item-info">

<ul>
  <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><FaComment/> 2</li>
  <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><FaHeart/> 2</li>
</ul>

</div>
    
    
            
       
      {/* <button onClick={() => deleteRecipe(recipe.id)}>Delete</button> */}
      </div>
    //   </Link>
    
    )})

    const handleToken = () => {
        localStorage.removeItem("token")
      }
  
    const toggleFollowUnFollow = () => {
        setFollowUnFollow(!followUnFollow)
    }
    

   


    const unFollow = () => {
        fetch(`http://localhost:3000/users/${id}/unfollow`, {
            method: "POST",
            body:  JSON.stringify({
                follower_id: userId,
                followee_id: id,
                boolean: false
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("token")}`,
              },
            
            })
            .then(res => res.json())
            .then(data => setFollowUnFollow(false))
                
    }
 


    const handleFollow = () => {
        fetch(`http://localhost:3000/users/${id}/follow`, {
            method: "POST",
            body:  JSON.stringify({
                follower_id: userId,
                followee_id: id,
                boolean: true
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("token")}`,
              },
            
            })
            .then(res => res.json())
            .then(data => setFollowUnFollow(true))
                
    }

    useEffect(() => {
   
        if (followUnFollow)
            followUnFollow ? handleFollow(): unFollow()
        }, [followUnFollow])
  
    const fButton = () => {
    
        followUnFollow ? unFollow() : handleFollow()   

    }

    const followOrNot = () => {
       return followUnFollow ? <button onClick={fButton}  className="btn profile-edit-btn">UnFollow</button>: <button onClick={fButton}  className="btn profile-edit-btn">Follow</button>
    }

    return (
        <div>
    <header>
      <Link to="/">
    <button className="asIcons"><FaHome/></button>
    </Link>
    <button className="asIcons"><Link style={{textDecoration: "none", color: 'black'}} to='/usersearch'><FaSearch/></Link></button>
    {/* <button className="asIcon"><FaPlusCircle/>
    </button>   */}
    <Link onClick={handleToken} to="/signin">
    <button className="asIcons"><FaSignOutAlt/></button>
    </Link>
    </header>
    <div className="container">

<div className="profile">

  <div className="profile-image">

            <Img src={[user.avatar,"https://ramcotubular.com/wp-content/uploads/default-avatar.jpg" ]} />
    {/* <img src= {avatarData} alt= "https://ramcotubular.com/wp-content/uploads/default-avatar.jpg" /> */}

  </div>

  <div className="profile-user-settings">

  <h1 className="profile-user-name">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>

{/* <button onClick={fButton}  className="btn profile-edit-btn">Follow</button> */}
{followOrNot()}
    <i className="icon"  > 
  
    </i>
    </div>
    
    <div className="profile-stats" style={{position: "relative", right: "4rem"}}>

    <ul >
<li><span className="profile-stat-count"></span> {user.recipes.length} posts</li>
<li><span className="profile-stat-count"></span> <button className="astext"> {user.followers.length} followers</button></li>
<li ><span className="profile-stat-count"></span> <button  className="astext">{user.followees.length} following</button></li>
    </ul>

  </div>

  <div className="profile-bio">

    <p><span className="profile-real-name">Trevor Low</span> Fan Page 📷✈️🏕️</p>

  </div>

</div>

    </div>
    <div className="container">
      <div className="gallery">
     
      

    {userRecipesMap}
     


    </div>
    </div>
 
        </div>
    )
}

export default NotUserPage