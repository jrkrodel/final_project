# Keurig Site

keurig site
[Live Link](https://n315-jrk-final.web.app/)

## About

This project was made to mimic an e-commerce website for Keurig's and other items. It is fully responsive, uses a model view controller to control user inputs and data of the application and firebase to create an account, log in, or log out. The page styling was done using CSS/Sass and uses media queries to make each page fully responsive. Modals are also used to provide user feedback, such as when they log in or add an item to their cart.

Each page is dynamically loaded by injecting views using the URL of the page. The data of each coffeemaker is stored in a JSON file. This file is looped through to display each coffeemaker onto the page.

To add items to the cart, a user can press the buy now button on any of the ten coffeemakers found on the site, which runs a function that adds that item to the user's cart by adding its data to an array found in model.js. The application also keeps track of the number of items in a user's cart and their order total using variables. These variables are updated each time a user adds an item to their cart, removes an item, or checks out.

The application also keeps track of whether a user is logged in or not by using a variable and prevents a user from accessing the cart page until they are logged in.

Once logged in, a user can add coffeemakers to their cart. The array that holds the items added to the cart is looped through, loading each item dynamically onto the cart page. A user can remove an item by pressing the "X" icon found on the top right of each item. This icon runs a function that splices that item from the cart array and then reloads the cart.

The user can also checkout by pressing the checkout button, which resets the array's length to 0, and runs a modal to confirm the checkout has been successful.
