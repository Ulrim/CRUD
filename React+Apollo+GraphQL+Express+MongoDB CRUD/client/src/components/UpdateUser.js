import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $name: String!, $age: Int!, $gender: String!) {
    updateUser(_id: $_id, input: { name: $name, age: $age, gender: $gender }) {
      _id
      name
      age
      gender
    }
  }
`;

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      age: 0,
      gender: ""
    };
  }

  componentDidMount() {
    const id = window.location.pathname.split("/")[1];
    this.setState({ _id: id });
  }

  render() {
    return (
      <Mutation mutation={UPDATE_USER}>
        {(updateUser, { data, loading, error }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>error...</p>;

          return (
            <div>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  const { _id, name, age, gender } = this.state;
                  await updateUser({
                    variables: { _id, name, age, gender }
                  });
                  this.setState({ _id: "", name: "", age: 0, gender: "" });
                  window.location.pathname = "/";
                }}
              >
                <h1> UpdateUser </h1>
                <h3>_id : {this.state._id}</h3>
                <input
                  onChange={e => this.setState({ name: e.target.value })}
                  placeholder="name"
                  type="text"
                  value={this.state.name}
                />
                <input
                  onChange={e =>
                    this.setState({ age: parseInt(e.target.value) })
                  }
                  placeholder="age"
                  type="number"
                  value={this.state.age}
                />
                <input
                  onChange={e => this.setState({ gender: e.target.value })}
                  placeholder="gender"
                  type="text"
                  value={this.state.gender}
                />
                <input
                  type="submit"
                  disabled={
                    !this.state.name || !this.state.age || !this.state.gender
                  }
                  value="Update"
                />
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default UpdateUser;
