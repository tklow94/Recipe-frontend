import React, {useEffect, useState} from 'react'
import decode from 'jwt-decode'
import {Link, useParams} from 'react-router-dom'
import './follower.css'
import Modal from 'react-modal';


function FollowersFollowing({showFollowings}) {
const loggedUser = decode(localStorage.getItem("token"))
const username = loggedUser.username
const userId = loggedUser.user_id 
const [follows, setFollows] = useState([])


   

    const getUserData = () => {
        fetch(`http://localhost:3000/users/${userId}`)
        .then(res => res.json())
        .then(data => setFollows(data.followees) )
        
    }
   

    useEffect(() => {
        getUserData()
    }, [])

  
const fUsername = follows.map(user => {return (
    <div className="overlay" >
        
    
    <div className="right-body">
      <div className="scroll-cards">
        <div className="card">
          <div className="mails">
     
          <img src={user.avatar}/>
      
          <Link style={{textDecoration: "none"}} to={`/notuserpage/${user.id}`} >
    
    <div className="mail-names">{user.username}</div>
    </Link>
    </div>
            </div>
            </div>
            </div>
  
    </div>
    
    )})

  
  const customStyles = {
      overlay: {
        overflowY: "initial"
      },
    content : {
        height: "350px",
        overflowY: "auto",
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-150%',
        transform             : 'translate(-50%, -50%)'
      }
  }

  

    return (
   <Modal isOpen={true} onRequestClose={() => showFollowings(false)} style={customStyles}>
  
       
            
            {fUsername} 
            
          
            </Modal>
            
        
          
        
   
        
    )
}

export default FollowersFollowing
