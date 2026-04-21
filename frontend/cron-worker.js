/**
 * cron-worker.js
 * A simple background daemon to ping the NextJS cron API every minute.
 * Run via: node cron-worker.js &
 */
const http = require('http');

console.log("[CRON-DAEMON] Background worker started. Pinging internal API every minute.");

setInterval(() => {
    // 3001 is the internal port of our Next.js frontend in Docker
    const req = http.request(
        {
            hostname: '127.0.0.1',
            port: 3001,
            path: '/api/satusehat/cron',
            method: 'GET',
            timeout: 10000
        },
        (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`[CRON-DAEMON] Ping Success: ${data.substring(0, 100)}`);
                } else {
                    console.log(`[CRON-DAEMON] Ping Failed (${res.statusCode}): ${data}`);
                }
            });
        }
    );

    req.on('error', (e) => {
        console.log(`[CRON-DAEMON] Waiting for app to be ready: ${e.message}`);
    });

    req.end();

}, 60000); // 60,000ms = 1 minute
