import logo from "../assets/sparrow-logo.svg"
import { signOutUser, removeUser } from "../config/googleSignIn"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import "./TopNavigationBar.css"
import { ThemeContext } from "../context.js"
import { useContext } from "react"
import UserLogo from "../assets/sparrow-user-profile.svg"
import useSound from "use-sound"
import toggleSound from "../sounds/stories_sounds_switch-off.mp3"

function TopNavigationBar({ currentUser }) {
  const { toggle } = useContext(ThemeContext)
  const [toggleSfx] = useSound(toggleSound)

  // When signing out removes user from 'users' collection and signs out user.
  const handleSignOutUser = () => {
    removeUser(currentUser)
    signOutUser()
  }

  return (
    <div>
      <Navbar bg='primary navbar-dark' className='pt-2' fixed='top'>
        <Container>
          <Navbar.Brand>
            <img
              src={logo}
              width='50'
              height='50'
              className='filter-yellow ms-4'
              alt='Sparrow Logo'
            />
            <p className='h6 text-warning ms-3'>sparrow</p>
          </Navbar.Brand>
          <span className='fs-5 text-white ms-auto me-2'>
            {currentUser ? currentUser.displayName : ""}
          </span>
          <Image
            // Conditional statement for profile image
            src={currentUser ? currentUser.photoURL : UserLogo}
            width='55'
            height='55'
            className='me-5 rounded-circle'
          />
          <Link to='/'>
            <Button
              variant='light'
              className='px-3 rounded bg-info'
              onClick={handleSignOutUser}
            >
              Sign Out
            </Button>
          </Link>

          <button
            onClick={() => {
              toggle()
              toggleSfx()
            }}
          >
            Theme
          </button>
        </Container>
      </Navbar>
    </div>
  )
}

export default TopNavigationBar
