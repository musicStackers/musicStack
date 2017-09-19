import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, RaisedButton, FlatButton } from 'material-ui';
import Divider from 'material-ui/Divider';
import ActionGoogle from 'material-ui/svg-icons/action/android';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { auth } from '../store/reducers/user';
import { AuthH2 } from './reusableStyles';

// Styles
const styles = {
  paper: {
    height: 450,
    width: 500,
    margin: '100px auto',
    textAlign: 'center',
    display: 'block',
    overflow: 'hidden',
  },
  divider: {
    marginLeft: '40px',
    marginRight: '40px',
  },
  raisedButton: {
    width: 180,
    height: 40,
    margin: '60px 0 30px 0',
  },
  flatButton: {
    margin: '30px 0 30px 0',
  },
  input: {
    width: 300,
    margin: 0,
  },
};


/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const googleLabel = `${displayName} with Google`;
  return (
    <MuiThemeProvider>
      <Paper style={styles.paper} zDepth={2}>
        <AuthH2>{displayName}</AuthH2>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <TextField
              name="email"
              hintText="forte@forte.com"
              floatingLabelText="Email"
              style={styles.input}
            />
            <br />
            <TextField
              name="password"
              hintText="must be at least 8 characters"
              floatingLabelText="Password"
              type="password"
              style={styles.input}
            />
            <br />
            <RaisedButton
              label={displayName}
              type="submit"
              style={styles.raisedButton}
            />
            <br />
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        </form>
        <Divider style={styles.divider} />
        <FlatButton
          href="/auth/google"
          label={googleLabel}
          primary={true}
          icon={<ActionGoogle />}
          style={styles.flatButton}
        />
      </Paper>
    </MuiThemeProvider>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state => (
  {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
));

const mapSignup = (state => (
  {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
));

const mapDispatch = (dispatch => (
  {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  }
));

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
