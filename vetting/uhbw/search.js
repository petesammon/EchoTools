const searchInput = document.getElementById('searchInput');
const searchInput2 = document.getElementById('searchInput2');
const resultsDiv = document.getElementById('resultsContainer');

// Create autocomplete datalist for first search box
function initializeAutocomplete() {
    // Get unique attribute1 values
    const uniqueAttributes = [...new Set(dataStore.map(entry => entry.attribute1))].sort();
    
    // Create datalist element
    const datalist = document.createElement('datalist');
    datalist.id = 'attributeList';
    
    // Add options
    uniqueAttributes.forEach(attr => {
        const option = document.createElement('option');
        option.value = attr;
        datalist.appendChild(option);
    });
    
    // Add datalist to document and link to input
    document.body.appendChild(datalist);
    searchInput.setAttribute('list', 'attributeList');
}

function performSearch() {
    const searchTerm1 = searchInput.value.toLowerCase().trim();
    const searchTerm2 = searchInput2.value.toLowerCase().trim();
    
    if (searchTerm1 === '' && searchTerm2 === '') {
        resultsDiv.innerHTML = '<div class="no-results">Please enter a search term...</div>';
        return;
    }

    // Start with all entries
    let matches = dataStore;

    // Filter by first search box (attribute1 only)
    if (searchTerm1 !== '') {
        matches = matches.filter(entry => 
            entry.attribute1.toLowerCase().includes(searchTerm1)
        );
    }

    // Filter by second search box (attribute1 OR attribute2)
    if (searchTerm2 !== '') {
        matches = matches.filter(entry => 
            entry.attribute1.toLowerCase().includes(searchTerm2) ||
            entry.attribute2.toLowerCase().includes(searchTerm2)
        );
    }

    displayResults(matches, searchTerm1, searchTerm2);
}

function displayResults(matches, searchTerm1, searchTerm2) {
    const searchTerms = [searchTerm1, searchTerm2].filter(t => t !== '').join('" and "');
    
    if (matches.length === 0) {
        resultsDiv.innerHTML = `<div class="no-results">No results found for "${searchTerms}"</div>`;
        return;
    }

    let html = `
        <div class="result-header">
            <div class="header-cell">Presentation</div>
            <div class="header-cell">Clinical Details</div>
            <div class="header-cell">Action</div>
            <div class="header-cell">Detail</div>
            <div class="header-cell">BHI</div>
            <div class="header-cell">WGH</div>
            <div class="header-cell">Reference</div>
            <div class="header-cell">Updated</div>
        </div>
    `;
    
    matches.forEach((entry, index) => {
        // Use custom color if specified, otherwise use default
        const bgColor = entry.color || 'var(--bg-block)';
        const styleAttr = entry.color ? `style="background-color: ${bgColor};"` : '';
        
        html += `
            <div class="result-item" ${styleAttr} data-index="${index}">
                <div class="attribute-left">${entry.attribute1}</div>
                <div class="attribute-left">${entry.attribute2}</div>
                <div class="attribute-left">${entry.attribute3}</div>
                <div class="attribute-left">${entry.attribute4}</div>
                <div class="attribute">${entry.attribute5}</div>
                <div class="attribute">${entry.attribute6}</div>
                <div class="attribute-left"><a href="${entry.attribute7_link}" target="_blank">${entry.attribute7}</a></div>
                <div class="attribute">${entry.attribute8}</div>
                <div class="result-details">
                    <div class="detail-row">
                        <span class="detail-label">Action</span>
                        <span class="detail-value">${entry.attribute3}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Detail</span>
                        <span class="detail-value">${entry.attribute4}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">BHI</span>
                        <span class="detail-value">${entry.attribute5}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">WGH</span>
                        <span class="detail-value">${entry.attribute6}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Reference</span>
                        <span class="detail-value"><a href="${entry.attribute7_link}" target="_blank">${entry.attribute7}</a></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Updated</span>
                        <span class="detail-value">${entry.attribute8}</span>
                    </div>
                </div>
            </div>
        `;
    });

    resultsDiv.innerHTML = html;
    
    // Add click handlers for mobile expansion
    addMobileClickHandlers();
}

function addMobileClickHandlers() {
    const resultItems = document.querySelectorAll('.result-item');
    
    resultItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't expand if clicking on a link
            if (e.target.tagName === 'A') {
                return;
            }
            
            // Only on mobile (check window width)
            if (window.innerWidth <= 768) {
                const details = this.querySelector('.result-details');
                details.classList.toggle('expanded');
                this.classList.toggle('expanded');
            }
        });
    });
}

searchInput.addEventListener('input', () => {
    performSearch();
});

searchInput2.addEventListener('input', () => {
    performSearch();
});

// Initialize autocomplete when page loads (only for first search box)
initializeAutocomplete();