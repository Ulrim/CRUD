import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const ALL_USER = gql`
  query {
    allUser {
      _id
      name
      age
      gender
    }
  }
`;

const ReadUser = () => (
  <Query query={ALL_USER}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>error</p>;

      return data.allUser.map(({ _id, name, age, gender }) => (
        <div
          key={_id}
          onClick={e => {
            e.preventDefault();
            window.location.pathname = _id;
          }}
        >
          id: {_id} / name: {name} / age: {age} / gender: {gender}
        </div>
      ));
    }}
  </Query>
);

export default ReadUser;
