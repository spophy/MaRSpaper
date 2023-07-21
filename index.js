// Function to fetch a random paper title and link based on a keyword
async function getRandomPaperByKeyword(keyword) {
  try {
    // Display the loading indicator
    showLoadingIndicator();

    const searchEndpoint = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&retmax=1000&retmode=xml&term=${encodeURIComponent(keyword)}`;
    const searchResponse = await fetch(searchEndpoint);
    const searchXml = await searchResponse.text();

    // Parse the XML response
    const parser = new DOMParser();
    const searchDoc = parser.parseFromString(searchXml, 'text/xml');

    const count = searchDoc.querySelector('eSearchResult Count').textContent;
    if (count === '0') {
      throw new Error('No papers found for the given keyword.');
    }

    // Randomly select a paper ID from the list of IDs
    const idList = searchDoc.querySelectorAll('IdList Id');
    const randomIndex = Math.floor(Math.random() * idList.length);
    const paperId = idList[randomIndex].textContent;

    const summaryEndpoint = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=${paperId}`;
    const summaryResponse = await fetch(summaryEndpoint);
    const summaryXml = await summaryResponse.text();

    // Parse the summary XML response
    const summaryDoc = parser.parseFromString(summaryXml, 'text/xml');

    // Extract and return relevant paper information
    const title = summaryDoc.querySelector('eSummaryResult DocSum Item[Name="Title"]').textContent;
    const link = `https://www.ncbi.nlm.nih.gov/pmc/articles/PMC${paperId}/`;

    // Hide the loading indicator once the search results are available
    hideLoadingIndicator();

    return {
      title,
      link,
    };
  } catch (error) {
    // Hide the loading indicator in case of an error
    hideLoadingIndicator();

    console.error('Error fetching paper:', error.message);

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response text:', await error.response.text());
    } else {
      console.error('Failed to fetch papers. Response object not available.');
    }

    throw new Error('Failed to fetch papers. Please try again later.');
  }
}

// Function to display the paper information on the HTML page
function displayPaperInfo(paper) {
  if (paper) {
    document.getElementById('paperTitle').textContent = paper.title;
    document.getElementById('paperLink').textContent = paper.link;
    document.getElementById('paperLink').href = paper.link;
    document.getElementById('paperLink').target = '_blank';
    document.getElementById('paperInfo').style.display = 'block'; // Show the paper info
  } else {
    document.getElementById('paperInfo').style.display = 'none'; // Hide the paper info if no paper found
  }
}

// Function to show the loading indicator
function showLoadingIndicator() {
  document.getElementById('loadingIndicator').style.display = 'block';
}

// Function to hide the loading indicator
function hideLoadingIndicator() {
  document.getElementById('loadingIndicator').style.display = 'none';
}

// Function to fetch and display the paper information on the HTML page
async function fetchAndDisplayPapers() {
  const keywordsInput = document.getElementById('inputText').value;
  const trimmedKeywords = keywordsInput.trim(); // Trim leading and trailing spaces
  const keywords = trimmedKeywords.split(','); // Keep spaces between words

  for (const keyword of keywords) {
    const paper = await getRandomPaperByKeyword(keyword);
    displayPaperInfo(paper);
  }
}



// Add event listener to the "Save" button to trigger fetching and displaying the paper
document.getElementById('getRandomPaperButton').addEventListener('click', fetchAndDisplayPapers);

// Add event listener to the input field to detect "Enter" key press
document.getElementById('inputText').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    fetchAndDisplayPapers();
  }
});

