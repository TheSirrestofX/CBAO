document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const projectSearch = document.getElementById('projectSearch');
    const searchBtn = document.getElementById('searchBtn');
    const statusFilter = document.getElementById('statusFilter');
    const projectsTable = document.getElementById('projectsTable');
    const rows = projectsTable.getElementsByTagName('tr');
    
    function filterProjects() {
        const searchTerm = projectSearch.value.toUpperCase();
        const statusValue = statusFilter.value;
        
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const statusCell = cells[7]; // Status is in the 8th column
            const statusClass = statusCell.querySelector('.status').className;
            
            let shouldShow = true;
            
            // Apply search filter
            if (searchTerm) {
                let found = false;
                for (let j = 0; j < cells.length - 1; j++) {
                    const cell = cells[j];
                    if (cell) {
                        const textValue = cell.textContent || cell.innerText;
                        if (textValue.toUpperCase().indexOf(searchTerm) > -1) {
                            found = true;
                            break;
                        }
                    }
                }
                shouldShow = shouldShow && found;
            }
            
            // Apply status filter
            if (statusValue !== 'all') {
                shouldShow = shouldShow && statusClass.includes(statusValue);
            }
            
            rows[i].style.display = shouldShow ? '' : 'none';
        }
    }
    
    // Event listeners
    searchBtn.addEventListener('click', filterProjects);
    projectSearch.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterProjects();
        }
    });
    statusFilter.addEventListener('change', filterProjects);
});