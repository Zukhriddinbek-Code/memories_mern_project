/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

import Icon from "./icon";
import useStyles from "./styles";
import Input from "./Input";
import axios from "axios";

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      let res;
      try {
        res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response?.access_token}`,
          },
        });
        dispatch({ type: "AUTH", data: { res } });
      } catch (error) {
        console.log(error);
      }
      const profObj = res;
      console.log(profObj);
    },
    onError: (error) => console.log(error),
  });

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    handleShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {};

  // const googleSuccess = async (res) => {
  //   console.log(res);
  // };

  // const googleFailure = (err) => {
  //   console.log(err);
  //   console.log("Google Sign in cannot proceed! Try again later");
  // };
  // "You have created a new client application that uses libraries for user authentication or authorization that are deprecated.
  // New clients must use the new libraries instead.
  // See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">{isSignup ? "Sing Up" : "Sign In"}</Typography>

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
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {/* <GoogleLogin
            clientId="300549585207-6hmb0epksgmfr7l2qe1g8mq40bi8vsmh.apps.googleusercontent.com"
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
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          {/* <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            text="continue_with"
            logo_alignment="center"
            size="large"
            width={"365"}
          /> */}
          <Button
            className={classes.googleButton}
            color="primary"
            fullWidth
            onClick={() => login()}
            // disabled={renderProps.disabled}
            startIcon={<Icon />}
            variant="contained"
          >
            Google Sign In
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Not a member yet? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
