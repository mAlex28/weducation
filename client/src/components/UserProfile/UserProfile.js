import React, { useState } from "react"
import {
  Card,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Container,
} from "@material-ui/core"
import FileBase from "react-file-base64"

import useStyles from "./styles"
import Input from "./Input"

const initialState = {
  firstName: "",
  lastName: "",
  imageUrl: "",
  email: "",
  password: "",
}

const UserProfile = () => {
  const [form, setForm] = useState(initialState)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleChange = () => {}

  const handleSubmit = () => {}

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
          <Typography component="h1" variant="h5">
            2 Posts
          </Typography>
          <Typography component="h1" variant="h5">
            5 Comments
          </Typography>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="name"
              label="Name"
              value={user?.result.name}
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
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
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
        </form>
      </Paper>
    </Container>
  )
}

export default UserProfile
