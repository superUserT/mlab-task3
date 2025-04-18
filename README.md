# Task 1: Simple Mock Media Server


## Objectives

 
Your goal is to create a simple Node.js server that has three different endpoints. Make sure 
to handle and terminate all requests. 

 
## Instructions: 

1.  Create a Node.js server 
2.  Create objects with data below in the form of arrays and nested arrays. Fill the data 
as you see fit, but ensure the data contains more than  
a.  Movies 
b.  Series 
c.  Songs 
3.  Create endpoints for the three sets of data 
a.  /movies 
b.  /series 
c.  /songs 
d.  Any other route should trigger a 404 
4.  When the a GET request is triggered on the endpoints, return their respective data 
a.  /movies should return a list of the movies and their details 
b.  /series should return a list of the series and related details 
c.  /songs should return a list of songs and details 
d.  Any other route should return a 404 
5.  Make sure to include the other methods, POST, DELETE, and PUT 
a.  When adding an item, return the updated arrays as a result 
b.  When deleting items, return the updated arrays as a result 
c.  When updating, return the updated array as a result 
6.  Push to Github and submit the repo link on the form linked above 
