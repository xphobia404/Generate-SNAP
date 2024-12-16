# Generate Access Token or Signature SNAP

- npm install dotenv express
- run 'node generateSNAP.js'

## Acess Token
- http://127.0.0.1:8070/accessToken

## Acess Token
- http://127.0.0.1:8070/genSign

Input To Your Body to generate a signature or to get an access token

```
{
    "clientId": "your-client-id",
    "clientSecret": "your-client-secret",
    "publicKey": "your-public-key",
    "privateKey": "your-private-key",
    "accessToken": "your-access-token",
    "uri": "/v1/account-balance", //example uri
    "body": {
        "key1": "value1",
        "key2": "value2"
    }
}

```
