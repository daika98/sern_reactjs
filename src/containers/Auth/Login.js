import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

//import * as actions from "../../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

import userService from "../../services/userService";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    username: "",
    password: "",
    isShowPassword: false,
    errMessage: "",
  };
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.code !== 3) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.code === 3) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="bg-login">
        <div id="loginform">
          <h2 id="headerTitle">Login</h2>
          <div id="form">
            <div className="row">
              <label>Username</label>
              <div className="input-box ml-4">
                <input
                  type="text"
                  placeholder="Enter your username"
                  onChange={(event) => this.handleOnChangeUsername(event)}
                />
              </div>
            </div>
            <div className="row">
              <label>Password</label>
              <div className="input-box ml-4">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(event) => this.handleOnChangPassword(event)}
                />
                <div
                  className="password-eye"
                  onClick={() => this.handleShowHidePassword()}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fa-solid fa-eye-slash fa-lg"
                        : "fa-solid fa-eye fa-lg"
                    }
                  ></i>
                </div>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>

            <div id="button" className="row">
              <button onClick={() => this.handleLogin()}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
