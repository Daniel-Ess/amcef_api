# Simple HTTP server with REST API for managing of todo lists

Steps to run this project:

1. Run `npm i` command.
2. Create PostgreSQL database and user with all privileges. Set environment variables in `.env` file as described below.
3. Run `npm start` command.
4. Default user in `development` mode: `user`, password: `pass`, or with chosen creds in `.env`. Login endpoint: `POST:http://localhost:3000/api/v1/auth/login` body: `{user, password}`.
5. After login put recieved token into `Authorization` header as `Bearer ..token` 
6. To register a new user you need to use Bearer token of default or any registered user.
7. API documentation can be found in `doc` folders.

### ENV variables

#### NODE_ENV       			| Required    | development / test / production
#### JWT_SECRET       			| Required    | JWT secret key
#### DB_USER           			| Required    | PostgreSQL database username
#### DB_NAME           			| Required    | PostgreSQL database name
#### DB_PASS           			| Required    | PostgreSQL database password
#### DB_HOST           			| Optional    | PostgreSQL database host (default: localhost)
#### DB_PORT           			| Optional    | PostgreSQL database port (default: 5432)
#### DEFAULT_USER          		| Optional    | Initial user name (default: admin)
#### DEFAULT_PASS           	| Optional    | Initial user pass (default: adminPass)
#### DOMAIN           			| Optional    | Domain name for this application. (default: http://localhost:3000)
