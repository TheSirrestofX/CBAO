document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const table = document.getElementById('reportsTable');
  const rows = table.getElementsByTagName('tr');
  
  // Search function
  function searchReports() {
    const filter = searchInput.value.toUpperCase();
    
    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header
      const cells = rows[i].getElementsByTagName('td');
      let found = false;
      
      for (let j = 0; j < cells.length - 1; j++) { // Skip last cell (actions)
        const cell = cells[j];
        if (cell) {
          const textValue = cell.textContent || cell.innerText;
          if (textValue.toUpperCase().indexOf(filter) > -1) {
            found = true;
            break;
          }
        }
      }
      
      rows[i].style.display = found ? "" : "none";
    }
  }
  
  // Event listeners
  searchBtn.addEventListener('click', searchReports);
  searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      searchReports();
    }
  });
});