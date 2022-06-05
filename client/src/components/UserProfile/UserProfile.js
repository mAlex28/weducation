import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Container,
} from "@material-ui/core"
import FileBase from "react-file-base64"
import { useHistory } from 'react-router-dom'

import useStyles from "./styles"
import Input from "./Input"
import { deleteUser, updateUser } from "../../actions/users"

const userd = JSON.parse(localStorage.getItem("profile"))

// get values from the local storage and set as initials
const initialState = {
  name: userd?.result.name,
  imageUrl: userd?.result.imageUrl,
  email: userd?.result.email,
  password: userd?.result.password,
}

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"))
  const [form, setForm] = useState(initialState)
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(user?.result._id, form))
  }

  const deleteAccount = () => {
    dispatch(deleteUser(user?.result._id, history))
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar
          className={classes.avatar}
          alt={user?.result.name}
          src={user?.result.imageUrl}
        >
          {user?.result.name.charAt(0)}
        </Avatar>
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <div>
          <Typography component="p">
            2 Posts
          </Typography>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="name"
              label="Name"
              value={user?.result?.name}
              handleChange={handleChange}
              autoFocus
            />
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              value={user?.result.email}
              type="email"
            />
            <div className={classes.fileInput}>
              <label>Upload a new profile picture</label> <br />
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setForm({ ...form, imageUrl: base64 })
                }}
              />
            </div>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Account
          </Button>
          <Button variant="text" size="small" onClick={deleteAccount} fullWidth style={{ color: 'red' }}>
            Delete account
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default UserProfile
