import React from 'react'

const Signuppage = () => {
    return (
        <div>
            <div className="img">
             <img src="../assets/MediGuide.png" alt="" />
                image placeholder
            </div>
            <form action="submit">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr />
                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required></input>
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required></input>


                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" required></input>

                <label>
                    <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me </input>
                </label>
                <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                    <button type="submit" class="signup">Sign Up</button>
                </div>

            </form>
        </div>
    )
}

export default Signuppage