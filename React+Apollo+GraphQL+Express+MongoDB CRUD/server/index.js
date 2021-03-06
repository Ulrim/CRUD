import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

// mongodb 설정
const dbName = "test";
const uri = `DB입력`;
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true });

const app = express();
const port = 8080;
const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.applyMiddleware({ app });

app.use(express.json()); // body parser
app.use(cors()); // 필수

app.listen(port, () => {
  console.log(
    `서버 실행!! 포트는? http://localhost:${port}${server.graphqlPath}`
  );
});
