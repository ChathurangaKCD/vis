## Starting the Mock API Server

1. `npm install`
2. `npm start`

## Sample API spec

`GET /api/service`
Lists all services

`GET /api/service/{id}`
Retrieves a service with the given ID

`POST /api/service`
Creates a new Service. Example request Body:

```  
{
  "id": 7,
  "type": "HTTP",
  "dependsOn": [2, 1, 3]
}
```

`DELETE /api/service/{id}`
Deletes a service with the given ID

## Mock Database

The mock database is created using _node-json-db_.
To reset the DB simply delete the `mock-db.json` file and restart the server.
