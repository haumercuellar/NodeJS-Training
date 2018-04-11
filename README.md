# Node Training App

Node app that implements endpoints for HTTP requests:
*	POST /api/v1/trainings (Saves a registry in training schema)
*	GET /api/v1/trainings (Retrieves all registries)
*	GET /api/v1/trainings/{{training_id}} (retrieves a registry by id)
*	PUT /api/v1/trainings/{{training_id}} (Updates a registry by id)
*	DELETE /api/v1/trainings/{{training_id}} (Deletes a registry by id)
*	GET /api/v1/trainings/by_product_code/{{product_code}} (Retrieves a registry by product code)
*	DELETE /api/v1/trainings/by_product_code/{{product_code}} (Deletes a registry by product code)

### Notes

* Case Insensitive validation for Product Codes
* product_code, saved_assets and failed_assets are required with POST and PUT requests
* Training corresponds to registry

#### Mongoose Training Schema:



    product_code: {
        type: String,
        required: true,
        unique: true
      },
    saved_assets: {
        type: Number
      },
    failed_assets: {
        type: Number
      },
    total_assets: {
        type: Number
      }



## Technologies
* Node.js
* Express
* Express-Validator
* MongoDB & Mongoose





### Version
1.0.0

## Requirements
Local Mongo Database named trainingdb


### Installation

Install the dependencies

```sh
$ npm install
```
Run app

```sh
$ npm start
```