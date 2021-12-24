const express = require('express');
// Import Redis
const redis = require('redis');
const app = express();
// 'createClient()' usually takes an URL connection path, or the path of a host to connect to.
// In our case use the name of the service from 'docker-compose.yml', 'test-redis'.
// Redis server itself usually runs on Port '6379'
const redisClient = redis.createClient({
  host: 'test-redis',
  port: 6379
});

// redisClient.set('numVisits', 0);

// GET route
app.get('/', function(req, res) {
    redisClient.get('numVisits', function(err, numVisits) {
        numVisitsToDisplay = parseInt(numVisits) + 1;
        if (isNaN(numVisitsToDisplay)) {
            numVisitsToDisplay = 1;
        }
        res.send('test-webapp-1: Number of visits is: ' + numVisitsToDisplay);
        numVisits++;
        redisClient.set('numVisits', numVisits);
    });
});

// Listen on Port 5000 in Docker Container (mapped to Local Machine Port 3008)
app.listen(5000, function() {
    console.log('Web app is listening on port 5000');
});
