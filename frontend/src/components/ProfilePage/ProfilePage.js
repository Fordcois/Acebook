import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import styles from './ProfilePage.css'
import UpdatePage from './updatePage';
import getSessionUserID from '../utility/getSessionUserID';
import CustomFeed from '../feed/customFeed';
import UpdateProfilePopUp from './UpdateProfilePopUp';
import LoginPopup from "../auth/LoginPopup";
import useTokenValidityCheck from '../loggedin/useTokenValidityCheck';
import baseUrl from '../utility/baseURL';


const ProfilePage = ({navigate}) =>{
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userData, setUserData] = useState(null)
  const [update, setUpdate] = useState(null)

  const [profilePicture, setProfilePicture] = useState(null)
  
  const [myId, setMyId] = useState('')


  // ===== LOGIN POPUP & TIMEOUT CHECKER: COPY TO EVERY AUTHENTICATED PAGE: ========== 
  let showLoginPopup = !useTokenValidityCheck(); // checks every 5 seconds if token is valid and changes true/false
  const closeLoginPopup = () => {
    navigate('/');
  }



  // UPDATE PROFILE POPUP INFORMATION HERE ---------------------------------
   // State for controlling the visibility of login and sign-up success pop-ups
   const [isUpdatePopupVisible, setUpdatePopupVisible] = useState(false); // Login pop-up visibility
    // Function to handle click event for displaying the login pop-up
    const handleUpdateProfileClick = () => {
      setUpdatePopupVisible(false); // Close the successful signup popup if visible
      setUpdatePopupVisible(true); // Set login pop-up visibility to true
    }
  
    // Function to close the Update Profile Pic pop-up
    const closeUpdateProfilePopup = () => {
      setUpdatePopupVisible(false); // Set login pop-up visibility to false
    }
  

  // =============== COMPONENT MOUNT ========================
  // sends the fetch (get) request 
  useEffect(() => {
    // checks if signed in
    if (token) {
      const id = getSessionUserID(token)
      // get the userID
      setMyId(id)
      console.log(id)
      fetch(`${baseUrl}/userData/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      })
      // modified version of the feed code 
        .then((res) => res.json())
        .then( async data => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setUserData(data.user);
          setProfilePicture(userData.profilePictureURL)

        })
        .catch((error) => {
          // console.error works like console.log but displays it as and error message
          console.error('Error fetching user data:', error);
          
        });
    }
  }, []);
  

  

  // ============ JSX UI ========================
  return (
    <>
      <div>
        <Navbar />
    
        {/* Profile information */}
        {userData && (
          <>
  
            <div className="wrap">

              {/* PROFILE PICTURE */}
              <div className="floatleft">
              <div style={{ '--spacer-height': '60px' }} className="spacer"></div>
                <img src={userData.avatar} alt="Profile" className='profilepic' />
            </div>


            {/* USER INFO */}
            <div className="floatright">
              <div style={{ '--spacer-height': '60px' }} className="spacer"></div>

              <h1 className='name'>{userData.firstName} {userData.lastName}</h1>
              <p><span style={{color:'#5B7EC2'}}><b>Email:</b></span><br/><span className='bio'>{userData.email}</span></p>
              <p><span style={{color:'#5B7EC2'}}><b>Bio:</b></span><br/><span id="bio" className='bio'>{userData.bio}</span></p>

              <button className='UpdateButton' onClick={handleUpdateProfileClick}>Update Page</button>

            </div>

            <div style={{ clear: 'both' }}></div>

          </div>
          <div>

              {/* USER POSTS */}

              <CustomFeed userId={myId} firstName={"your Page"} />
          </div>
          </>
        )}
      </div>
          {/* POPUP */}
        {/* Render the LoginPopup coSmponent conditionally based on isUpdatePopupVisible */}
        {isUpdatePopupVisible && 
          <UpdateProfilePopUp onClose={closeUpdateProfilePopup} />
        }

        {/* LOGIN POPUP -- COPY TO EVERY AUTHENTICATED PAGE */}
        {showLoginPopup && 
            <LoginPopup 
              navigate={navigate} 
              onClose={closeLoginPopup} 
            />
          }
    </>
  );
        }  



export default ProfilePage


