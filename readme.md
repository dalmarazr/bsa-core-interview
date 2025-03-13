# Project Description

This project contains a CAR API built with Node.js and the Express.js library, utilizing an in-memory database. It was developed as a homework project for an interview assessment.
### Features

- **CRUD for Cars**: Create, read, update, and delete car records.
- **Search Functionality**: 
    - Query-based search using attributes like make, model, year, color, and VIN.
    - Parameter-based search using `/cars/{id}`.
- **In-Memory Database**: 
    - The `MOCK_DATA.csv` file is loaded into memory when the server starts.
    - All CRUD operations are performed in memory.
- **Testing**:
    - API endpoints are tested using Jest and Supertest.
    - Database operations are validated to ensure proper initialization with `MOCK_DATA.csv` and correct CRUD functionality.
- **Schema Validation**: 
    - Joi is used to validate request body and query parameters.
- **Logging**: 
    - Morgan library is used to log requests to the console.
- **Environment Configuration**: 
    - `.env` file is used to configure the port and log format (dev or combined).

    ### Setup

    To work with this repository, you need to either clone it or extract the content from a zip file.

    #### Clone the repository:

    ```sh
    git clone https://github.com/dalmarazr/bsa-core-interview
    ```

    #### Install dependencies:

    ```sh
    npm install
    ```

    #### Run the project:

    ```sh
    npm start
    ```
    #### Run in development mode with watch functionality and hot reload:

    ```sh
    npm run dev
    ```

    #### Execute test manually in console using curl (available in the terminal, linux based systems and modern powershell):

    ```sh
    # Get all cars
    curl -X GET "http://localhost:3000/cars"

    # Get cars with query parameters (expected 404)
    curl -X GET "http://localhost:3000/cars?make=Cadillac&color=Pink"

    # Get cars with an unknown property in the query (expected 400)
    curl -X GET "http://localhost:3000/cars?make=Cadillac&color=Pink&unknown=unknown"

    # Get a car by ID
    curl -X GET "http://localhost:3000/cars/1"

    # Create a new car and verify
    curl -X POST "http://localhost:3000/cars" -H "Content-Type: application/json" -d '{"make":"Car 2","model":"Model 2","year":2025,"color":"Blue","vin":"780"}'
    curl -X GET "http://localhost:3000/cars/1001"

    # Replace a car by ID and verify
    curl -X PUT "http://localhost:3000/cars/1" -H "Content-Type: application/json" -d '{"make":"Car 2","model":"Model 2","year":2025,"color":"Blue","vin":"780"}'
    curl -X GET "http://localhost:3000/cars/1"

    # Update a car by ID and verify
    curl -X PATCH "http://localhost:3000/cars/1" -H "Content-Type: application/json" -d '{"make":"Car 222","vin":"78000"}'
    curl -X GET "http://localhost:3000/cars/1"

    # Delete a car by ID and verify
    curl -X DELETE "http://localhost:3000/cars/1"
    curl -X GET "http://localhost:3000/cars/1"

    # Test endpoints for non-existing records (expected 404)
    curl -X PATCH "http://localhost:3000/cars/1500" -H "Content-Type: application/json" -d '{"make":"Car 2","vin":"780"}'
    curl -X PUT "http://localhost:3000/cars/1500" -H "Content-Type: application/json" -d '{"make":"Car 2","model":"Model 2","year":2025,"color":"Blue","vin":"780"}'
    curl -X DELETE "http://localhost:3000/cars/1500"
    curl -X GET "http://localhost:3000/cars/1500"
    ```


    #### Execute test cases:

    ```sh
    npm test
    ```




## Instructions of the lab

### Create a REST API with CRUD and Search Endpoints

### Endpoints

- `GET /cars`
- `GET /cars/{carId}`
- `POST /cars`
- `PUT /cars/{carId}`
- `DELETE /cars/{carId}`



### Considerations

- you can use any framework
- you can use any testing tool
