import "./LoginStatus.css"
import { Link } from "react-router-dom"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { useState } from "react"
function LoginStatus(props) {

    console.log("status in loginstatsu: Ending here", props.status);

    const [getOption, setGetOption] = useState(true)
    window.addEventListener("click", () => {
        if (!getOption) {
            setGetOption(true)
        }
    })

    return (
        <div id="login-status">

            {props.status == 1 ? (
                <div id="after-login">
                    {getOption == true ?
                        <>
                            <span onClick={() => setGetOption(false)} id="account">&nbsp;S&nbsp;</span>&nbsp;
                            <span onClick={() => setGetOption(false)} >Sonu</span>
                            <MdOutlineKeyboardArrowDown onClick={(e) => {
                                e.stopPropagation()
                                setGetOption(false)
                                e.stopPropagation()
                            }} className="after-login-option" />
                        </>
                        :
                        <>
                            <span onClick={() => setGetOption(true)}
                                id="account">&nbsp;S&nbsp;</span>&nbsp;
                            <span onClick={() => setGetOption(true)}>Sonu</span>
                            <MdOutlineKeyboardArrowUp onClick={(e) => {
                                e.stopPropagation()
                                setGetOption(true)
                            }}
                                className="after-login-option" />
                            <div id="option">
                                <Link to={`/login/loggedin/profile/${props.status}`}>
                                    <button className="make-border-radius-8px-top">Profile</button>
                                </Link>
                                <button>Notifications</button>
                                <Link to={`/login/loggedin/bookmark/${props.status}`}>
                                    <button>Bookmark</button>
                                </Link>
                                <button>Reviews</button>
                                <button>Network</button>
                                <button>Find Friends</button>
                                <button>Setting</button>
                                <Link to={`/login/loggedin/${0}`}>
                                    <button className="make-border-radius-8px-bottom">Log out</button>
                                </Link>
                            </div>
                        </>
                    }
                </div>
            ) :
                (
                    <>
                        <Link to="/login" style={{ color: "grey", textDecoration: "none" }}>Log in
                        </Link>
                        <div style={{ color: "grey" }}>Sign up</div>
                    </>
                )
            }
        </div>
    )
}
export default LoginStatus