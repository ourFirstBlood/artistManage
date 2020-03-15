import React, { Component } from "react";
import Route from "./route/Route.jsx";
import { hot } from "react-hot-loader/root";

import { connect } from "react-redux";
import { setUserInfo } from "./store/action";
import ajaxReq from "./common/ajaxReq";

import "./App.scss";

class App extends Component {
  async componentWillMount() {
    if (window.location.pathname === "/login") {
      return;
    }

    if (!this.props.userInfo.id) {
      let res;
      try {
        res = await ajaxReq.call(this, {
          url: "/user/get_user_info"
        });
        this.props.setUserInfo(res.data);
      } catch (e) {
        if (e.code === 996) {
          window.location = "/login";
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Route />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUserInfo: info => {
      dispatch(setUserInfo(info));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(App));
