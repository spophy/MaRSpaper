# MaRSpaper
# Random Paper Fetcher
# Overview
The Random Paper Fetcher is a JavaScript-based web application that allows users to fetch a random research paper based on keywords. The application utilizes the National Center for Biotechnology Information (NCBI) Entrez API to search for papers in the PubMed Central (PMC) database.

# Features
Users can enter a keyword in the provided input field to search for papers related to the keyword.
Clicking the "Save" button or pressing the "Enter" key triggers the search process.
The application sends a request to the NCBI Entrez API and fetches a random paper based on the entered keyword.
If a paper is found, the application displays its title and link on the page.
Users can click the provided link to open the paper in a new tab for further reading.
If no papers are found for the given keyword, an error message is displayed.

# Code Structure
The codebase consists of the following main files:

index.html: The HTML file that contains the user interface elements, such as the input field, buttons, and placeholders for paper information.

style.css: The CSS file that defines the styles for the user interface components, including the loading indicator.

index.js: The JavaScript file responsible for handling user interactions, making API calls, and displaying fetched paper information.

# Functionality
The core functionality of the application is implemented in the getRandomPaperByKeyword(keyword) function, which fetches a random paper based on the provided keyword. The function performs the following steps:

Constructs the search endpoint URL for the NCBI Entrez API using the provided keyword.
Sends a fetch request to the search endpoint to get a list of paper IDs that match the keyword.
Randomly selects a paper ID from the list and constructs the summary endpoint URL for that paper.
Sends another fetch request to the summary endpoint to get detailed information about the selected paper.
Extracts the title and link of the paper from the summary response and returns the paper information.
The main user interface interactions are handled in the fetchAndDisplayPaper() function. It reads the keyword entered by the user, calls the getRandomPaperByKeyword() function, and displays the fetched paper's title and link on the page.

# Error Handling
The application includes error handling to deal with potential issues during the fetch process. If an error occurs while fetching papers, the application logs the error details, such as the error message, response status (if available), and response text (if available), to the browser console. An error message is also displayed on the page, informing the user that the fetch process failed.

# Note
It is important to ensure a stable internet connection and verify the correctness of the API endpoints for successful fetch operations.
