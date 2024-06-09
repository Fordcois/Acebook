import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import SignUpForm from '../components/user/SignUpForm';
import SignupSuccessPopup from '../components/user/SuccessfullySignedUpPopup';
import LoginPopup from '../components/auth/LoginPopup';
import '../pages/stylesheets/style.css';
import ApiWakeup from '../components/utility/API_Wakeup';
import HereFromMyPort from '../components/utility/HereFromMyPortfolio';


const Welcome = () => {
const navigate = useNavigate();
const [token, setToken] = useState(window.localStorage.getItem("token"));


  // === LOGIN POPUP =======
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);

  const handleLoginPopupClick = () => {
    setSignedUpPopupVisible(false); // close the successful signup popup if visible
    setIsLoginPopupVisible(true);
  }
  const closeLoginPopup = () => {
    setIsLoginPopupVisible(false);
  }

  // ==== SUCCESSFUL SIGNUP POPUP =====
  const [isSignedUpPopupVisible, setSignedUpPopupVisible] = useState(false);

  const handleSignupSuccessPopupClick = () => {
    setSignedUpPopupVisible(true);
  }
  const closeSignupSuccessPopup = () => {
    setSignedUpPopupVisible(false);
  }


  // ========= UI RENDERING =============
  return (
    <>
    <ApiWakeup/>
      <Navbar />
      <div className="wrap">
        <div className="floatleft">
          <p className='title'>WELCOME TO ACEBOOK</p>
          <p style={{'color': '#888'}}>Connecting Ace individuals from around the world since 2023...</p> 
          
          <HereFromMyPort/>


        </div>
        <div className="floatright">
          <div style={{ '--spacer-height': '80px' }} className="spacer"></div>
          <p className='subtitles'>Register an account to start connecting</p>

          <SignUpForm 
            navigate={navigate} 
            onSignupSuccess={handleSignupSuccessPopupClick} 
          />

          <p className='subtitles'>Already Registered?</p>
          <button className='Button' onClick={ handleLoginPopupClick }>Login</button>
        </div>

        {/* LOGIN POPUP */}
        {isLoginPopupVisible && 
          <LoginPopup 
            navigate={navigate} 
            onClose={closeLoginPopup} 
          />
        }

        {/* SIGNUP SUCCESS POPUP */}
        {isSignedUpPopupVisible && 
          <SignupSuccessPopup 
            // navigate={navigate} 
            onClose={closeSignupSuccessPopup} 
            onClick={handleLoginPopupClick}
          />
        }


        <div style={{ clear: 'both' }}></div>
      </div>
    </>
  );
};

export default Welcome;

