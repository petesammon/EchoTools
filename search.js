const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('resultsContainer');

function performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
        resultsDiv.innerHTML = '<div class="no-results">Enter a search term to find matching entries</div>';
        return;
    }

    const matches = dataStore.filter(entry => 
        entry.attribute1.toLowerCase().includes(searchTerm)
    );

    displayResults(matches, searchTerm);
}

function displayResults(matches, searchTerm) {
    if (matches.length === 0) {
        resultsDiv.innerHTML = `<div class="no-results">No results found for "${searchTerm}"</div>`;
        return;
    }

    let html = `<div class="result-count">Found ${matches.length} result${matches.length !== 1 ? 's' : ''}</div>`;
    
    html += `
        <div class="result-header">
            <div class="header-cell-left">Presentation</div>
            <div class="header-cell-left">Clinical Details</div>
            <div class="header-cell-left">Action</div>
            <div class="header-cell-left">Detail</div>
            <div class="header-cell">BHI</div>
            <div class="header-cell">WGH</div>
            <div class="header-cell-left">Reference</div>
            <div class="header-cell">Updated</div>
        </div>
    `;
    
    matches.forEach(entry => {
        html += `
            <div class="result-item">
                <div class="attribute-left">${entry.attribute1}</div>
                <div class="attribute-left">${entry.attribute2}</div>
                <div class="attribute-left">${entry.attribute3}</div>
                <div class="attribute-left">${entry.attribute4}</div>
                <div class="attribute">${entry.attribute5}</div>
                <div class="attribute">${entry.attribute6}</div>
                <div class="attribute-left"><a href="${entry.attribute7_link}" target="_blank">${entry.attribute7}</a></div>
                <div class="attribute">${entry.attribute8}</div>
            </div>
        `;
    });

    resultsDiv.innerHTML = html;
}

searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
});