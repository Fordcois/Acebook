import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './LoginForm.module.css'
import baseUrl from '../utility/baseURL';

// Login Page
const LogInForm = ({ navigate }) => {

  // =========== STATE VARIABLES ==========================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();

  // ============ FORM SUBMISSION FOR LOGIN ====================
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch( `${baseUrl}/tokens`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    // Checking the response status
    if(response.status === 401){ // wrong password
      console.log("wrong password")
      setError("Wrong password, try again")
    } else if (response.status !== 201) { // if error code is not 401 or 201, show server error
      setError("Server error, please try again later")
    } else { // login successful
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      
      // Check the current location and navigate accordingly
      if (location.pathname === '/') {
        navigate('/timeline');
      } else {
        // 
      }
      window.location.reload(); // Necessary addition so that page after successful login if logging in after timed out
    }
  }

  // ------------ SUPPORTIVE FUNCTIONS: ----------------
  // FUNCTIONS FOR CHANGING STATE VARIABLES 
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  // ========= JSX FOR THE UI OF THE COMPONENT =====================
    // currently shows two input fields and one button with no styling.
    return (
      <div className={styles.Middle}>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange}  className={styles.inputField}/><br/>
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} className={styles.inputField} /><br/>
        <input  id='submit' type="submit" value="Submit" className={styles.Button}/>
      </form>
      <br/>

<font color="#505050 ">Don't have an account?</font>
<br/>
<a href="/signup" font color="#003163" className={styles.link}> Register</a>

</div>
    );
}

export default LogInForm;
