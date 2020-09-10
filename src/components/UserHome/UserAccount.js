import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './user.css'
import Modal from 'react-modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {Img} from 'react-image'
import { FaHome, FaSignOutAlt, FaSearch, FaPlusCircle, FaRssSquare, FaComment, FaHeart } from 'react-icons/fa'


import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import decode from 'jwt-decode'
import FollowersFollowing from './Followers'
import Followings from './Followings'

Modal.setAppElement('#root')
function UserAccount() {
  



const [recipe, setRecipe] = useState({})
const [userRecipes, setUserRecipes] = useState([])
const loggedUser = decode(localStorage.getItem("token"))
const username = loggedUser.username
const userId = loggedUser.user_id 
const [showForm, setShowForm] = useState("false")
const [followForm, setFollowForm] = useState("false")
const [followsForm, setFollowsForm] = useState("false")
const [userData, setUserData] = useState({})
const [usersData, setUsersData] = useState({})
const [avatar, setAvatar] = useState({})
const [open, setOpen] = useState(false)
const [searchOpen, setSearchOpen] = useState(false)
const [avatarData, setAvatarData] = useState({})





const showFollowsForm = () => {
  setFollowsForm(!followsForm)
}

const showFollowForm = () => {
  setFollowForm(!followForm)
}

const showFollowing = () => {
  showFollowForm()
}
const showFollowings = () => {
  showFollowsForm()
}


const fetchFollowers = () => {
  fetch(`http://localhost:3000/users/${userId}`)
  .then(res => res.json())
  .then(data => setUserData(data.followers))
}
const fetchUserData = () => {
  fetch(`http://localhost:3000/users/${userId}`)
  .then(res => res.json())
  .then(data => setAvatarData(data.avatar))
}


useEffect(() => {
  fetchUserData()
},[])
useEffect(() => {
  fetchFollowers()
},[])

const fetchFollowees = () => {
  fetch(`http://localhost:3000/users/${userId}`)
  .then(res => res.json())
  .then(data => setUsersData(data.followees))
}


useEffect(() => {
  fetchFollowees()
},[])










const handleShowForm = () => {
  
  setShowForm(!showForm)
 
  
}





const fetchUserRecipes = () => {
  fetch("http://localhost:3000/recipes/", {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then(res => res.json())
  .then(data => {
    const filterRecipes = data.recipes.filter(user_id => user_id.user_id === userId)
    setUserRecipes(filterRecipes.reverse())
  })
}








const userRecipesMap = 

userRecipes.map(recipe => {return (
  

<Link to={`recipecard/${recipe.id}`}>

<div  className="gallery-item" >

  <img className="gallery-image" src={recipe.img} alt="not available" ></img>
  <div className="gallery-item-info">

<ul>
  <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><FaComment/> 2</li>
  <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><FaHeart/> 2</li>
</ul>

</div>

	




    </div>
   
 
 
  </Link>

  
  
 
 

 


)})

console.log(recipe)

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

const inputAvatar = (e) => {
  e.persist()
  setAvatar({
    
      [e.target.name]: e.target.files[0]
  
  })
  console.log(e.target.files[0])
}
const editAvatar = (e) => {
  e.preventDefault()

  const form = new FormData()
 
  form.append("avatar", avatar.img)
  fetch(`http://localhost:3000/users/${userId}`,{
    method: 'POST',
body: form,
headers: {
"Authorization": `bearer ${localStorage.getItem('token')}`
}
  })
  .then(res => console.log(res))
}


const openSesame = () => {
  setOpen(!open)
}
const openSearch = () => {
  setSearchOpen(!searchOpen)
}

const onSubmit = (e) => {
  e.preventDefault()
  openSesame()
  const form = new FormData()
  form.append("name", recipe.name )
  form.append("url", recipe.url)
  form.append("ingredients", recipe.ingredients)
  form.append("calories", recipe.calories)
  form.append("daily_value", recipe.daily_value)
  form.append("servings", recipe.servings)
  form.append("img", recipe.img)
  form.append("source", username)
  fetch("http://localhost:3000/recipes",{
    method: "POST",
   headers: {
     "Authorization": `bearer ${localStorage.getItem("token")} `
   },
    body: form
  })

  .then(res => fetchUserRecipes())
 
}


useEffect(() => {
  fetchUserRecipes()
}, [])






const customStyles = {
  overlay : {
    backgroundColor: 'grey'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const handleToken = () => {
  localStorage.removeItem("token")
}


// console.log(recp.filter(r => r.name.toLowerCase() === "chicken"))


// console.log(recp.filter(r=> r.name.includes('chicken')))
// console.log(set)
// console.log(recp)
// console.log(change.value)


  return (
    
  <div>


    <header>
      <Link to="/">
    <button className="asIcon"><FaHome/></button>
    </Link>
  
 
    <button name="search" className="asIcon"> <Link to= './usersearch' style={{color:"black"}}><FaSearch/></Link></button>
    
    <button className="asIcon"onClick={openSesame}><FaPlusCircle/>
    </button>  
    <button className="asIcon"><Link to="./feeds" style={{color:"black"}}><FaRssSquare/></Link>
    </button>  

    <Link onClick={handleToken} to="/signin">
    <button className="asIcon"><FaSignOutAlt/></button>
    </Link>
  
    
    
    </header>
    {/* <header> */}
    
    <div className="container">

<div className="profile">

  <div className="profile-image">

            <Img src={[avatarData,"https://ramcotubular.com/wp-content/uploads/default-avatar.jpg" ]} />
  </div>

  <div className="profile-user-settings">

  <h1 className="profile-user-name">{username.charAt(0).toUpperCase() + username.slice(1)}</h1>

    <button onClick={handleShowForm} className="btn profile-edit-btn">Edit Profile</button>
    <i className="icon"  > 
  
    </i>
    

 
    <Modal isOpen={open}  onRequestClose={() => openSesame(false)} style={customStyles}>
         <React.Fragment>
           <form  onSubmit={onSubmit}>
      <Typography variant="h2" gutterBottom>
        Create Recipe
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="name"
            label="Recipe Name"
            fullWidth
            autoComplete="given-name"
            onChange={onChange}
            color='secondary'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="lastName"
            name="url"
            label="Link to Source"
            fullWidth
            autoComplete="family-name"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
       
            id="address1"
            name="ingredients"
            label="Ingredients"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="address2"
            name="calories"
            label="Calories"
            fullWidth
            autoComplete="shipping address-line2"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
          
            id="city"
            name="daily_value"
            label="Daily Value"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField id="state" name="servings" label="Servings" fullWidth onChange={onChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
           
            id="zip"
            name="source"
            label="Instructions"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={onChange}
          />
        </Grid>
      
        <Grid item xs={12}>
          <Input required type="file" name='img' onChange={onImage}></Input>
        </Grid>

        <Grid    container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '10vh' }}>
     <Grid item xs={6}>
     <Button  
     type="submit"
            fullWidth
            variant="contained"
            color= "primary"
        
            // onClick={openSesame}
            >Submit</Button>
            </Grid>
        </Grid>
        
      
       
      </Grid>
      </form>
    </React.Fragment>
 


</Modal>
  
 

    <SlideDown>
    {showForm ? 
   
     null: <div className="edit-form">
     <form className={"edit-profile"}>
       <input onChange={inputAvatar}type="file" name="avatar"></input><br></br>
       <button  onSubmit={editAvatar} >Submit</button>

     </form>
   </div>
  }
  
  </SlideDown>
   
 </div>

  <div className="profile-stats" style={{position: "relative", right: "4rem"}}>

    <ul >
<li><span className="profile-stat-count">{userRecipes.length}</span> posts</li>
<li><span className="profile-stat-count">{userData.length}</span> <button onClick={showFollowing}className="astext">followers</button></li>
<li ><span className="profile-stat-count">{usersData.length}</span> <button onClick={showFollowings} className="astext">following</button></li>
    </ul>

  </div>

  <div className="profile-bio">

    <p><span className="profile-real-name">PlaceHolder </span> PlaceHolder</p>

  </div>

</div>

    </div>
    {/* </header> */}
    <div className="container">
      <div className="gallery">
     
      

    {userRecipesMap}
     


    </div>
    </div>
   
      {followsForm ? null :  <FollowersFollowing showFollowings={showFollowings}  /> }
     
      {followForm ? null :  <Followings showFollowing={showFollowing}  /> }
     
     
     </div>
    
  
  )
}

export default UserAccount
