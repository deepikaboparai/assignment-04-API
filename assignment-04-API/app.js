const Hapi = require('hapi')
const Inert = require('inert')
const server = new Hapi.Server()
server.register(Inert, function (err) {
        if (err) throw err;
  })
server.connection({
	host:'localhost',
	port:  Number(process.argv[2] || 8080)
})
server.route(require('./routes'))
server.start((err) => {
  if (err) {  console.log('error '+err)  }
  console.log(`server is listening on: ${server.info.uri}`);
})
