require('dotenv').config()
const createServer = require('./Infrastructures/http/CreateServer').default;
const container = require('./Infrastructures/container');
(async () => {
    const app = await createServer(container);
    
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
})();
