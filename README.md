# final_project

keurig site
Live Link: [Todo List App](http://in-info-web4.informatics.iupui.edu/~jrkrodel/n322/jrk-todolist-app)

## About

This project was made to mimic an e-commerce website for Keurig's and other items. It is fully responsive, uses a model view controller to control user inputs and data of the application and a firebase to create an account, log in, or log out. The page styling was done using Sass and media queries to make each page responsive in design for tablet and mobile. Modals are also used to provide user feedback.

Each page is dynamically loaded by injecting views using the URL of the page. The data of each coffeemaker is stored in a JSON file that is looped through to display the content onto the page as well.

To add items to the cart, a user can press the buy now button on any of the ten coffeemakers found on the site, which runs a function that adds that item to the user's cart by adding the item's data to an array found in model.js. The application also keeps track of the total items in a user's cart and their total using variables that are updated each time a user presses the buy now function.

The application also keeps track of whether a user is logged in or not by using a variable and prevents a user from accessing the cart page until they are logged in.

Once logged in, a user can add coffeemakers to their cart. On the user's cart page, a user can remove an item by pressing the "X" icon found on the top right of each item. This icon runs a function that splices that item from the cart array and then reloads the cart.

The user can also checkout by pressing the checkout button, which resets the array's length to 0, and runs a modal to confirm the checkout has been successful.
