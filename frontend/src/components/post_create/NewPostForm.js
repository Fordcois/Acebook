import React, { useState } from 'react';

// New Post Form:

const NewPostForm = ({navigate}) => {
    
    // =========== STATE VARIABLES ==========================
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));



    // ============ FORM SUBMISSION FOR NEW POST ==================
    const handleSubmit = async (event) => {

        if(token){ // if user is logged in

            event.preventDefault(); 
            // Send POST request to '/posts' endpoint
            fetch( '/posts', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // necessary for requests that need login auth
                },
                body: JSON.stringify({ message: message }) // <===== BODY OF REQUEST: message
                })
                .then(response => {
                    if(response.status === 201) {
                    console.log('successful')
                    navigate('/posts') // If successful, navigate to posts page
                    } else {
                    console.log('not successful')
                    navigate('/signup') // If unsuccessful, stay on the signup page
                    }
                })

        }

        }
    


    // ------------ SUPPORTIVE FUNCTIONS: ----------------
    // FUNCTIONS FOR CHANGING STATE VARIABLES 
    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const handleTokenChange = (event) => {
        setToken(event.target.value)
    }


    // ========= JSX FOR THE UI OF THE COMPONENT =====================
    // one input field and a submit button

    return (
        <form onSubmit={handleSubmit}>
            <input id="message" type='text' value={ message } onChange={handleMessageChange} />
            <input id='submit' type="submit" value="Submit" />
        </form>
    )

}

export default NewPostForm;