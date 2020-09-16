import React, {useEffect, useState} from 'react'
import decode from 'jwt-decode'
import {Link} from 'react-router-dom'
import './follower.css'
import Modal from 'react-modal';

function Followings({showFollowing}) {
const loggedUser = decode(localStorage.getItem("token"))
const username = loggedUser.username
const userId = loggedUser.user_id 
const [follows, setFollows] = useState([])



    const getUserData = () => {
        fetch(`http://localhost:3000/users/${userId}`)
        .then(res => res.json())
        .then(data => setFollows(data.followers))
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
          <Link style={{textDecoration: "none"}} to={`/notuserpage/${user.id}`} >
    <img src={user.avatar}/>
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
  
<Modal isOpen={true} onRequestClose={() => showFollowing(false)} style={customStyles}>
  
       
            
  {fUsername} 
  

  </Modal>
    
    )
}

export default Followings
