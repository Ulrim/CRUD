import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
      name
      age
      gender
    }
  }
`;

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: ""
    };
  }

  componentDidMount() {
    const id = window.location.pathname.split("/")[1];
    this.setState({ _id: id });
  }
  render() {
    return (
      <Mutation mutation={DELETE_USER}>
        {(deleteUser, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>error...</p>;

          return (
            <div>
              <h1>DeleteUser</h1>
              _id: {this.state._id}
              <button
                onClick={async e => {
                  e.preventDefault();
                  const { _id } = this.state;
                  await deleteUser({
                    variables: { _id }
                  });
                  window.location.pathname = "/";
                }}
              >
                삭제
              </button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteUser;
