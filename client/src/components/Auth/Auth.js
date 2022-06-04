import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Snackbar,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import FileBase from 'react-file-base64'

import Icon from './icon'
import { signin, signup } from '../../actions/auth'
import { AUTH } from '../../constants/actionTypes'
import useStyles from './styles'
import Input from './Input'
import { useEffect } from 'react'


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const initialState = {
  firstName: '',
  lastName: '',
  imageUrl: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUp = () => {
  const [form, setForm] = useState(initialState)
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  const message = useSelector((state) => state.errorMessage)

  const switchMode = () => {
    setForm(initialState)
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup) {
      dispatch(signup(form, history))
    } else {
      dispatch(signin(form, history))
    }
  }

  useEffect(() => {
    if (message?.emessage === null || message?.emessage === undefined) {
      setError(false)
      console.log(error)
    } else {
      setError(true)
      console.log(error)
    }
  })

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({ type: AUTH, data: { result, token } })

      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleError = () =>
    setError(true)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <>
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
                <div className={classes.fileInput}>
                  <label>Upload a profile picture</label> <br />
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => {
                      setForm({ ...form, imageUrl: base64 })
                    }}
                  />
                </div>
              </>
            )}
          </Grid>
          <Snackbar open={error}>
            <Alert severity="error">Invalid Credentials!</Alert>
          </Snackbar>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId="580296629960-h4c2ugd9rsfk7kfluv44t60gt9dj9dst.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default SignUp
