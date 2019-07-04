import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ALL_USER } from "./ReadUser";
import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation createUser($name: String!, $age: Int!, $gender: String!) {
    createUser(input: { name: $name, age: $age, gender: $gender }) {
      _id
      name
      age
      gender
    }
  }
`;

export class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: 0,
      gender: ""
    };
  }
  render() {
    return (
      <Mutation
        mutation={CREATE_USER}
        update={(cache, { data }) => {
          // 캐시 업데이트를 해서 글 목록이 바로 보이게 하기
          const { allUser } = cache.readQuery({ query: ALL_USER });
          cache.writeQuery({
            query: ALL_USER,
            data: { allUser: allUser.concat([data.createUser]) }
          });
        }}
      >
        {(createUser, { data, loading, error }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>error...</p>;

          return (
            <div>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  const { name, age, gender } = this.state;
                  await createUser({
                    variables: { name, age, gender }
                  });
                  this.setState({ name: "", age: 0, gender: "" });
                }}
              >
                <h1> CreateUser </h1>
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
                  disabled={
                    !this.state.name || !this.state.age || !this.state.gender
                  }
                  type="submit"
                  value="Create"
                />
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateUser;
