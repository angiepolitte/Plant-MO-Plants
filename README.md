The app is designed to help home gardeners create personalized garden plans for their local climate and soil conditions.  The app allows users to search for native plants, view plant information, and plan their gardens based on factors like soil conditions, light and water requirements, and plant type.  The goal is to promote sustainable gardening by encouraging the use of native plants that thrive in specific environments.

Tech Stack - Javascript, React, Material UI, OpenWeather API, Google Places API, CSV, Java, Spring Boot, MySQL

Project Features: 
-User Account Creation / User Account Management: New users will need to create an account in order to start searching and saving gardens. The account page will have the option to change settings (ie password), as well as manage their saved garden(s). User with accounts have different permissions than guests.
-Full CRUD Functionality: Users can create new gardens, update existing, and delete existing.
-Relational Database: User to Gardens, Plants to Gardens, Comments to Plants, Comments to Users, Ratings to Plants, Ratings to Users
-External API Usage: Open Weather API to display a 5 day forecast
-Implement O Auth to improve user experience 
-Light/Dark mode (using React): User can choose the screen in light/dark mode
-Users can manage plants: Users can filter plants on a search page and add them to their gardens. Users can remove the plants from their gardens on the garden detail page
-Users can rate plants on plant pages, there will be a visual star rating system and users will be able to see the average star rating of the plant
-Users can print their gardens: Clicking the "print garden" will create a PDF document that will organize the plants in your garden into a formatted list to take to your local nursery for assistance with purchasing
-Implement places.googleapis.com to connect users with their local nurseries: Create local nursery widget in React
-User can upload photos of their garden to their dashboard 
-Users can add/remove/edit comments on plant pages
