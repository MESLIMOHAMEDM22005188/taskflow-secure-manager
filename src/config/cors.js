const cors = require("cors");

/*
|--------------------------------------------------------------------------
| CORS CONFIGURATION
|--------------------------------------------------------------------------
| This configuration allows the frontend application to communicate
| with the backend API while controlling which origins, methods,
| and headers are accepted.
|
| It prevents browsers from blocking requests due to the Same-Origin Policy.
*/

const corsOptions = {

  /*
  |--------------------------------------------------------------------------
  | Allowed Origin
  |--------------------------------------------------------------------------
  | Defines which frontend is allowed to call the API.
  | If FRONTEND_URL is defined in environment variables, it will be used.
  | Otherwise "*" allows requests from any origin (useful in development).
  */
  origin: process.env.FRONTEND_URL || "*",

  /*
  |--------------------------------------------------------------------------
  | Allowed HTTP Methods
  |--------------------------------------------------------------------------
  | Defines which HTTP methods the API accepts from the frontend.
  | This must include all methods used by the application.
  */
  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  ],

  /*
  |--------------------------------------------------------------------------
  | Allowed Headers
  |--------------------------------------------------------------------------
  | Specifies which headers the frontend can send.
  | Important for authentication tokens and JSON requests.
  */
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With"
  ],

  /*
  |--------------------------------------------------------------------------
  | Exposed Headers
  |--------------------------------------------------------------------------
  | Allows the browser to access certain response headers.
  | Useful for debugging and advanced API responses.
  */
  exposedHeaders: [
    "Content-Length",
    "Content-Type"
  ],

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  | Enables cookies and authentication headers in cross-origin requests.
  | Required if sessions or tokens are used.
  */
  credentials: true,

  /*
  |--------------------------------------------------------------------------
  | Preflight Success Status
  |--------------------------------------------------------------------------
  | Some browsers expect a 200 status for OPTIONS requests.
  | This avoids issues with legacy clients.
  */
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);