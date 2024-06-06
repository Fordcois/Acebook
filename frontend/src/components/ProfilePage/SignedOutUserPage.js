import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import styles from './ProfilePage.css'
import defaultProfilePic from './profilePic/defaultProfilePic.png'
import CustomFeed from '../feed/customFeed';
import LoginPopup from "../auth/LoginPopup";
import useTokenValidityCheck from '../loggedin/useTokenValidityCheck';
import getSessionUserID from '../utility/getSessionUserID';
import FriendRequestButton from '../friends/SendOrCancelFriendRequest';
import useFetchUserDataByID from '../utility/getselectuserinfo';
import FriendRequestAcceptOrDenyButtons from '../friends/AcceptOrDenyFriendRequest';
import UnfriendButton from '../friends/UnfriendButton';
import baseUrl from '../utility/baseURL';

import { TbFriends, TbFriendsOff } from "react-icons/tb";


const SignedOutUserPage = ({navigate}) => {

  // =========== STATE VARIABLES ==========================
  // PROFILE PAGE OWNER:
  const { userId } = useParams(); //ID of the profile page owner
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState(null); // State to hold user data
  const [profilePicture, setProfilePicture] = useState(null)

  // SESSION USER:
  let sessionUserID = getSessionUserID(token);
  const sessionUser = useFetchUserDataByID(sessionUserID);

  // FRIEND REQUEST / UNFRIEND / ACCEPT or DENY FRIENDS BUTTONS ================
  // not using useState as the page will just reload after accept/deny/unfriend
  // If the profile owner and user are friends (they will be mutually friends): Unfriend Button & Message Button
  const areFriends = sessionUser && sessionUser.friends.some(user => user._id === userId);
  // Else if the profile owner HAS sent the user a friend request: 
  const requestRecieved = sessionUser && sessionUser.requests.some(user => user._id === userId);
  // Else neither user has sent a friend request: Friend Request / Cancel Friend Request Button



  // ===== LOGIN POPUP & TIMEOUT CHECKER: COPY TO EVERY AUTHENTICATED PAGE: ========== 
  let showLoginPopup = !useTokenValidityCheck(); // checks every 5 seconds if token is valid and changes true/false
  const closeLoginPopup = () => {
    navigate('/');
  }


  // ========= COMPONENT MOUNT ===============
  useEffect(() => {
    if (token) {

      if (sessionUserID === userId) {
        navigate('/profile');
      }
    
      // This ensures the user's ID is fetched dynamically from the URL
      fetch(`${baseUrl}/userData/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async userData => {
        window.localStorage.setItem("token", userData.token);
        setToken(window.localStorage.getItem("token"));
        console.log(userData.firstName)

        // Set user data obtained from the API response to the state
        setUser(userData.user);

        setProfilePicture(user.profilePictureURL) //TODO take out line, use .avatar

      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle errors, e.g., set an error state or display a message
      });
    }
  }, []); 


  // ============ JSX UI ========================
  return (
    <div>
      <Navbar/>

       {user && (
            <>
              <div className="wrap">
  
                {/* PROFILE PICTURE */}
                <div className="floatleft">
                  <div style={{ '--spacer-height': '60px' }} className="spacer"></div>
  
                  {/* TODO change to .avatar */}
                  {/* <img className="profilepic" src={user.avatar}></img> */}
                  {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className='profilepic' />
                    ) : (
                      <img src={`https://picsum.photos/seed/${userId}/300`} alt="Profile" className='profilepic'/>
                    )}
                </div>


              {/* USER INFO */}
              <div className="floatright">
                <div style={{ '--spacer-height': '60px' }} className="spacer"></div>

                <h1 className='name'>{user.firstName} {user.lastName}</h1>
                <p><span style={{color:'#5B7EC2'}}><b>Email:</b></span><br/><span className='bio'>{user.email}</span></p>
                <p><span style={{color:'#5B7EC2'}}><b>Bio:</b></span><br/><span id="bio" className='bio'>{user.bio}</span></p>
                
              
              {/* FRIENDS BUTTONS */}
                {(!areFriends && requestRecieved) && <FriendRequestAcceptOrDenyButtons user={user}/>}
                {(!areFriends && !requestRecieved) && <FriendRequestButton user={user}/>}
                {areFriends && <UnfriendButton user={user}/>}
              </div>
              <div style={{ clear: 'both' }}></div>
            

              
              {/* USER POSTS */}

              <CustomFeed userId={user._id} firstName={user.firstName} lastName={user.lastName}/>

            </div>
        </>
        )}
        {/* LOGIN POPUP -- COPY TO EVERY AUTHENTICATED PAGE */}
        {showLoginPopup && 
            <LoginPopup 
              navigate={navigate} 
              onClose={closeLoginPopup} 
            />
          }
    </div>
  );
};

export default SignedOutUserPage;
