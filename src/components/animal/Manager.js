import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserManager from "../../modules/UserManager";
import UserCard from "../user/UserCard";

class Manager extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    //getAll from UserManager, put it in state, display it as cards
    UserManager.getAll().then(users => {
      this.setState({
        users: users
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <h3>Manage Herd</h3>
          <Link to={`/animals/new`}>
            <button type="button">Add Animal</button>
          </Link>
        </section>
        <section>
          <h3>Manage User</h3>

            <div className="User-Cards">
            {this.state.users.map(user => (
              <UserCard 
              key={user.id} 
              user={user} 
              {...this.props} />
            ))}
          </div>

          <Link to={`/user/new`}>
            <button type="button">Add User</button>
          </Link>
        </section>

        <section>
          <h3>Return to Dashboard</h3>
          <Link to={`/dashboard`}>
            <button type="button" className="DashboardButton">
              Dashboard
            </button>
          </Link>
        </section>
      </React.Fragment>
    );
  }
}
export default Manager;
