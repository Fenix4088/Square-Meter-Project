# Square Meter Project

## Technology
- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap
- WebPack
- Babel

## Description
Square Meter Project is a SPA for an online real estate agency.:house:    

All changes take place on a single page.


The SPA has a total of 18 different apartments from five different construction companies.  
At the start of the page, the filter is loaded and all apartments available on the server are displayed.


Square Meter Project consists of a main filter, object display fields, an ascending:small_red_triangle: /descending :small_red_triangle_down: filter by the real eatate price and area. There are two possible types of displaying objects.    
By clicking on the link "Favorites" in the header of the page, all objects that have been added to the favorites are displayed.  
The link "Orders" downloads and displayes all orders that have arrived on the server.
By clicking on the apartment card, the user will be able to familiarize himself with the characteristics of this product in detail, as well as apply for its purchase.

###### :large_blue_diamond: Filters
The main filter that we see when loading the page allows the user to formulate a more detailed request.  
The user is enabled to filter the objects by the folowing features:
  1. Name of a construction company
  2. Number of rooms in an apartment
  3. Living space
  4. Price
  
  
After setting up the filter, the user should click on the button to display objects. After that only those objects that fall under the filter settings will be displayed.  
By the way, the button for data displaying will show the user how many objects were found and whether they were found at all. :sunglasses:

The filter, wich appears in the form of a drop-down menu below the display button, allows the user to sort out the displayed objects by price and area.    
The filter in the form of two icons gives the user a choice of displaying objects either as cards or a table.   
If the user chooses a table display, another filter will sort :thumbsup: the objects by certain features. The table uses an ascending and descending type of filter.    
All filter settings are saved. It means that after restarting the page, the user will see all previous filter settings, if any. :sunglasses:

###### :large_blue_diamond: Item page
If you click on the card with a product, detailed data for this product will be displayed:
  1. Name of a construction company
  2. Living space
  3. Number of rooms in an apartment
  4. Floor
  5. Price
  6. Price per square meter
  7. Apartment number  
  
  
On the product page, the user can apply for the purchase of an apartment by clicking on the "Book now" button. When you click, a modal window will appear that allows you to enter your name and phone number :phone:. Now the administration is able to get in touch with the customer.  


###### :large_blue_diamond: Favorites
With the help of the link  "Favorites" :sparkling_heart:, located in the header of the page, the user can see all the products added to "Favorites" by marking the desired product with a heart.

###### :large_blue_diamond: Orders
This link is in the header of the page and is intended only for administration:exclamation: All the orders wich were received from the customers are displayed on the Product Page.  

## Technical description

A router was created for SPA application in order to display its particular component depending on hash. 
The project is built with a the help of Webpack, babel polifil is applied to create polyfills for ES6 + syntax.  
:file_folder: The dist folder contains the project ready for hosting.  
:file_folder: The src folder contains separate modules that are responsible for each component of the application.  
:file_folder: The template folder contains page markup.  
Almost all markup is loaded using JavaScript. 

## :warning:Important:warning:
The project is executed in English, some of the inscriptions you can find in Russian, this is due to the fact that the API of the Russian server was used.    
The project is compatible with all types of browsers.  
No RWD support.  
There is no way to post work on GitHubPages due to the fact that the project's API works over the HTTP protocol.:cold_sweat:

## Links

[API Documentation](http://jsproject.webcademy.ru/#items):point_left:  
[Webcite Link]():point_left:
