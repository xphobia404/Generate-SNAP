# Generate Access Token or Signature SNAP

- npm install dotenv express
- run 'node generateSNAP.js'
- test response with Postman hit this API: http://127.0.0.1:8070/test-res

If get a response "200 Connect" it successfully connect

## Get Acess Token
Input to your request body to generate a signature access token

### Format Input For API Signature Access Token
```
{
    "clientId": "",       // Your client ID
    "clientSecret": "",   // Your client secret
    "publicKey": "",      // Your public key
    "privateKey": "",     // Your private key (base64 encoded)
    "accessToken": ""     // Access token, if available
}
```

Hit with Postman to your localhost IP http://127.0.0.1:8070/access-token

## Get Signature
Input to your request body to generate a signature
URI and body is mandatory

### Format Input For API Generate Signature
```
{
    "clientId": "",       // Your client ID
    "clientSecret": "",   // Your client secret
    "publicKey": "",      // Your public key
    "privateKey": "",     // Your private key (base64 encoded)
    "accessToken": "",    // Access token, if available
    "uri": "",            // Target URI for the request
    "body": {}            // Data to include in the request body
}
```

### Example Input
```
{
    "clientId": "your-client-id",
    "clientSecret": "your-client-secret",
    "publicKey": "your-public-key",
    "privateKey": "your-private-key",
    "accessToken": "your-access-token",
    "uri": "/v1/balance-inquiry", // example target
    "body": {
        "key1": "value1",
        "key2": "value2"
    }
}
```
Hit with Postman to your localhost IP http://127.0.0.1:8070/generate-sign
