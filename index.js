const { ApolloServer } = require("apollo-server")
const { typeDefs, resolvers } = require("./src/graphql");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { formatError } = require("graphql");

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	formatError: (err) => {
		if(err.message.startsWith("Usuário Existente:")){
			return new Error(err.message);
		}
	},
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => console.log(url));