# README 
PS: ignore client folder 
## online shopping
- [x] POST: new acc
- [x] PATCH: add new item to cart
- [x] GET: display carts item, and display all products
- [x] DELETE: delete my account
- ~~POST 2.1: unknown stocks - bulk add requestcheck if stocks have enough items - tell userwhether it's added or not enough stocks.~~
- [x] POST 2.2:
  - user wants to checkout/POST new order
  - check each item if it ships to user's location
  - display all items that cannot be shipped to user's location
  - and display checkout success message with items that can be shipped and total price

## DB schema
### Products
- product id: string
- not serving zipcode: integer
- product name: string
- product price: float
### Users
- user email: string
- password: string
- zipcode: integer
- cart: Array
  
### Orders
- user email: string
- product total price: float
- purchased items: Array of id



## Requirements
Using a backend or server framework of your choice, create a REST API and accompanying database with the following endpoints:
- generic POST endpoint where someone can write an item to the database through a request
- generic GET endpoint where someone can retrieve an item from the database in a response
- generic DELETE endpoint where someone can delete an item from the database 
- creative POST endpoint that, given an input, performs some operation on the input and writes the result to the database


As this is very open ended, you can be creative about the context for this API (e.g. online recipe tracker, library book returns, etc) and the structure of database items.

## Submission
Submit your code for the API and the database. Also include a short video demonstration where you invoke your API through requests using a tool like Postman (https://www.postman.com/downloads/) or Insomnia (https://insomnia.rest/)