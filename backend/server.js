//const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000; 

app.set('port', process.env.PORT || 4000);

//lancer le serveur
app.listen(port, () => {
    console.log(`server on port ${port}`);
});