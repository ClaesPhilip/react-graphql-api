const axios = require("axios");
const { ApolloServer, gql } = require("apollo-server");


// TYPE DEFINITIONS
const typeDefs  = gql`
  type Team {
    team: [String]
  }

  type Query {
    getTeam(team: [String!]): Team
  }
`
//API KEY
const NAMES_API = "https://run.mocky.io/v3/9118e647-e131-43c7-8668-d99af1abb5a6";


// RESOLVER
const resolvers = {
  Query: {
    getTeam: async (_obj, _args) => {
      let url = NAMES_API;
      const { data } = await axios.get(url);
 
      return {
        team: data.team,
      };
    }
  }
}

module.exports = {
  resolvers,
  typeDefs
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => console.log(`server running at ${url}`));
