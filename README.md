# **CrediBuy**

# [Youtube Video Link](https://youtu.be/AjI37BvwhmQ)

### CrediBuy is an e-commerce web application designed to streamline the online product purchase process. It is deployed on an Amazon EC2 instance sitting inside Virtual Private Cloud. The backend is deployed on the private subnet, and the front end is on the public subnet.

### Here sellers can list various products for sale, and users can buy the selected products. Users can also search for their desired products directly. They can add products to a cart, change the quantity and choose a payment method, and cancel an order after placing it if they have changed their mind. Users will get notified after successful order placement.

### Admins can see the list of products listed for sale, delete or add new products, update product details, and see the list of orders placed on CrediBuy. Moreover, sellers can also reject orders for a specific reason, and the user will get notified via email about the cancelation.

# **User Interface**

### Application Home Page

## Admin Functions

### Product Management

### Create New Product

### Order Management

### User Management

## User Functions

### Product Details Page

### Cart

### Checkout

### Order History

### Profile Management

# **Getting Started**

### Prerequisites to run the application

Create `.env` file at the root level and create an environment variable. This file will look like this:

```
JWT_SECRET=<ENTER JWT SECRET>
REGION=<AWS REGION>
ACCESSKEYID=<AWS ACCESSKEY ID>
SECRETKEY=<AWS SECRET KEY>
SESSIONTOCKEN=<AWS SECRET TOCKEN>

```

- _Node and npm is the primary requirement_. Run the following command to check if node and npm is available in your system:

```
node -v
npm -v
```

- _Git cli:_ Download Git command line interface using this [link](https://git-scm.com/downloads). run the following command:

```
git -v
```

## How to run application

After Installing Git,

The first step is to clone the repo in your machine using the below command.

Next, Change the directory to the frontend side of the project using:

```
cd .\CrediBuy\frontend
```

Next step is, run the below command to instal all the packages and dependencies that is required to run the Assignment.

```
npm install
```

You are all set and now just run the client side using following command.

```
npm start
```

Now, To run the server side, open the cmd with the path of the project's repo.

Next, Change the directory to the backend side of the project using:

```
cd .\CrediBuy\backend
```

Next step is, run the below command to instal all the packages and dependencies that is required to run the Assignment.

```
npm install
```

You are all set and now just run the server side using following command.

```
npm start
```

Both theclient and server are now running.

# **Softwrae/Library/plug-in used**

- [VS Code](https://code.visualstudio.com/)
- [Node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Express.js](https://expressjs.com/)
- [Postman](https://www.postman.com/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [MongoDBCompass](https://www.mongodb.com/products/compass)
- [axios](https://www.npmjs.com/package/axios)
- [react](https://react.dev/)
- [react-dom](https://legacy.reactjs.org/docs/react-dom.html)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-redux](https://react-redux.js.org/)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-scripts](https://www.npmjs.com/package/react-scripts)
- [react-toastify](https://www.npmjs.com/package/react-toastify)
- [react-top-loading-bar](https://www.npmjs.com/package/react-top-loading-bar)
- [redux-logger](https://www.npmjs.com/package/redux-logger)
- [web-vitals](https://www.npmjs.com/package/web-vitals)
- [reduxjs-toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [multer](https://www.npmjs.com/package/multer)

### _Built With:_

- [ReactJS](https://react.dev/)
- [Express](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
