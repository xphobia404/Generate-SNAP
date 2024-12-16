# Generate Access Token or Signature SNAP

- npm install dotenv express
- run 'node generateSNAP.js'

Input to your request body to generate a signature or to get an access token

### Format Input
```
{
    "clientId": "",       // Your client ID
    "clientSecret": "",   // Your client secret
    "publicKey": "",      // Your public key
    "privateKey": "",     // Your private key (base64 encoded)
    "accessToken": "",    // Access token, if available
    "uri": "",            // Target URI for the request
    "body": {}            // Additional data to include in the request body
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
    "uri": "v1/balance-inquiry",
    "body": {
        "key1": "value1",
        "key2": "value2"
    }
}
```

## Get Acess Token
Hit to your localhost IP http://127.0.0.1:8070/accessToken

## Get Signature
Hit to your localhost IP http://127.0.0.1:8070/genSign
