import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import User from "./containers/User/User";
import Search from "./containers/Search/Search";
import Auth from "./containers/Auth/Auth";
import Add from "./containers/Add/Add";
import Layout from "./containers/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Logout from "./containers/Auth/Logout/Logout";
import Aux from "./hoc/Auxilliary";

class App extends React.Component {
  componentDidMount() {
    this.props.onInitAuthCheck();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/search" component={Search} />

          {this.props.authenticated ? (
            <Aux>
              <Route path="/user" component={User} />
              <Route path="/add" component={Add} />
              <Route path="/logout" component={Logout} />
            </Aux>
          ) : null}
          <Redirect to="/auth" />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitAuthCheck: () => dispatch(actions.initAuthCheck()),
  };
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
