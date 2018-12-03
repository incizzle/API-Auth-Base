# API AUTH BASE
API Base using express with JWT token intergration. Uses Bcrypt to salt users passwords. MongoDB Database

## Setup
1. Rename ```config_example.json``` to ```config.json```
2. Edit params in ```config.json```
3. Install dependancies with ```npm install```
4. Start api server with ```npm start``` or ```npm run servers.js```
5. Build upon it!!!

## Endpoints

|Name|Method|Endpoint | Headers | Params | Body |
| -- |  --  |   --    |   --    |   --   |  --  |
|User Signup|POST|/user/signup| ```Content-Type= application/json``` |N/A|```{"firstname": "String", "lastname": "String", "email": "String@FQDN", "password": "String"}``` |
|User Login|POST|/user/login|```Content-Type= application/json```|N/A|```{"email": "String", "password": "String"```|
|User Info|GET|/user/me|```Authorization= "Bearer JWT_TOKEN"```|N/A|N/A|
|User Edit|PUT|/user/me|```Content-Type= application/json, Authorization= "Bearer JWT_TOKEN"```|N/A|```{"ItemToEdit": "Value"}```|
|Admin User List|GET|/admin/userlist|```Authorization= "Bearer JWT_TOKEN"```|N/A|N/A|
|Admin User Edit|PUT|/admin/:userId|```Content-Type= application/json, Authorization= "Bearer JWT_TOKEN"```|N/A|```{{"ItemToEdit": "Value"}}```|
|Admin User Delete|DELETE|/admin/:userId|```Authorization= "Bearer JWT_TOKEN"```|N/A|N/A|

Enjoy :smile: