# Handlebars

Author Information
Name: Jaimaica Daisy Eugenio

## Description
This code demonstrates the use of Express.js and Handlebars to create a web application that handles routes and renders dynamic views based on JSON data. The application allows users to search for books using various criteria, such as ISBN and title.

## Prerequisites
Before running the application, make sure you have the following dependencies installed:

Node.js
Express
Express Handlebars
Handlebars
Body Parser
Installation
Clone the repository:
git clone <repository-url>
Change into the project directory:
cd <project-directory>
Install the dependencies:
npm install

  ## Usage
To start the application, run the following command:
node app.js
The application will be accessible at http://localhost:3000.

## Routes
/: Renders the main page of the application.
/data: Renders the data page, displaying the JSON data.
/show: Renders the show page with a message confirming that the JSON data is loaded and ready.
/data/isbn/{index}: Renders the ISBN page with the book information based on the provided index from the JSON data.
/data/search/isbn: Renders the search page for searching books by ISBN.
/data/search/isbn (POST): Handles the search request for books by ISBN and renders the search result page.
/data/search/title: Renders the search page for searching books by title.
/data/search/title (POST): Handles the search request for books by title and renders the search result page.
/allData: Renders the allData page, displaying all the books from the JSON data.

  ## Directory Structure
- README.md
- app.js
- data.json
- package.json
- views/
  - layouts/
    - index.hbs
  - partials/
    - data.hbs
    - main.hbs
    - isbn.hbs
    - search.hbs
    - searchResult.hbs
    - searchTitle.hbs
    - searchTitleResult.hbs
    - show.hbs
    - allData.hbs
- public/
  - styles/
    - main.css
  
