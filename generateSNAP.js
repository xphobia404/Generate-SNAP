const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const { log } = require('console');
require('dotenv').config();

const app = express();
const port = 8070;

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Function to format the timestamp
function formatTimestamp() {
    const date = new Date();
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const pad = (num) => String(num).padStart(2, '0');
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T` +
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
        `${sign}${pad(hours)}${pad(minutes)}`;
}

// Function to generate access token
function generateAccess(requestBody) {
    const snapMap = {
        ClientId: requestBody.clientId,
        ClientSecret: requestBody.clientSecret,
        PublicKey: requestBody.publicKey,
        PrivateKey: requestBody.privateKey,
        TimeStamp: formatTimestamp()
    };

    const stringToSign = `${snapMap.ClientId}|${snapMap.TimeStamp}`;

    try {
        const privateKey = crypto.createPrivateKey({
            key: Buffer.from(snapMap.PrivateKey, 'base64'),
            format: 'der',
            type: 'pkcs8'
        });

        const sign = crypto.createSign('SHA256');
        sign.update(stringToSign);
        sign.end();

        const signature = sign.sign(privateKey, 'base64');
        snapMap.Signature = signature;

        console.debug("TimeStamp:", snapMap.TimeStamp);
        console.debug("Signature:", signature);

        return {
            clientId: snapMap.ClientId,
            timestamp: snapMap.TimeStamp,
            signature: snapMap.Signature
        };
    } catch (error) {
        console.error("Exception:", error);
        throw new Error('Failed to generate access token.');
    }
}

// Function to generate signature
function generateSign(requestBody) {
    const snapMap = {
        ClientId: requestBody.clientId,
        ClientSecret: requestBody.clientSecret,
        PublicKey: requestBody.publicKey,
        PrivateKey: requestBody.privateKey,
        TimeStamp: formatTimestamp(),
        accessToken: `Bearer ${requestBody.accessToken}`
    };

    const uri = requestBody.uri;

    let body = requestBody.body;

    try {

    // Stringify the body to handle JSON format and minify
    try {
        body = JSON.stringify(body);
    } catch (error) {
        throw new Error(`Error parsing body: ${error.message}`);
    }

    // Create SHA256 hash of the body and convert to lowercase
    const bodyHash = crypto.createHash('sha256').update(body).digest('hex').toLowerCase();

    // Construct the string to sign
    const stringToSign = `POST:${uri}:${snapMap.accessToken}:${bodyHash}:${snapMap.TimeStamp}`;

    // Generate HMAC SHA512 signature
    const genSig = crypto.createHmac('sha512', snapMap.ClientSecret).update(stringToSign).digest('base64');

    console.log("=======================================================");


    console.debug("StringToSign:", stringToSign);
    console.debug("Authorization:", snapMap.accessToken);
    console.debug("X-TIMESTAMP:", snapMap.TimeStamp);
    console.debug("X-PARTNER-ID:", snapMap.ClientId);
    console.debug("X-SIGNATURE:", genSig);
    console.debug("Signature:", snapMap);

    return {
        CLIENTID: snapMap.ClientId,
        Authorization: snapMap.accessToken,
        TIMESTAMP: snapMap.TimeStamp,
        SIGANTURE: genSig
    };

    } catch (e) {
        console.error("Exception:", e);
        throw new Error('Failed to generate Signature');
    }
}

// Endpoint to generate access token
app.post('/accessToken', (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const accessData = generateAccess(req.body);
        res.status(200).json(accessData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to generate signature
app.post('/genSign', (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const genSign = generateSign(req.body);
        res.status(200).json(genSign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});