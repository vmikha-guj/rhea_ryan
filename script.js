const layout = document.getElementById('layout');
const highlight = document.getElementById('highlight');
let tablePositions = [];

fetch('table_positions.json')
  .then(res => res.json())
  .then(data => tablePositions = data);

async function findTable() {
  const name = document.getElementById('guestName').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');
  if (!name) {
    resultDiv.innerHTML = "Please enter your name.";
    return;
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbydqHDgOoL2iPHu0sbEBeR7gdK_bq9pAuWWQbRSGx4s1kfEtZ-CbJX68-lAU7usHLon/exec?name=' + encodeURIComponent(name));
    const text = await response.text();
   // resultDiv.innerHTML = text.replace(/\n/g, "<br>").replace(/\r/g, "<br>").replace(/\r\n/g, "<br>");
    resultDiv.innerHTML = text.replace(/\\n|\\r\\n|\r\n|\r|\n/g, "<br><br>");

    // extract first table number to highlight
    const match = text.match(/Table (\d+)/);
    if (match) {
      const tableNum = parseInt(match[1]);
      const table = tablePositions.find(t => t.table === tableNum);
      if (table) {
        const rect = layout.getBoundingClientRect();
        const x = (table.x / 100) * rect.width;
        const y = (table.y / 100) * rect.height;
        highlight.style.left = `${x}px`;
        highlight.style.top = `${y}px`;
        highlight.style.display = "block";
        return;
      }
    }
    highlight.style.display = "none";
  } catch (e) {
    resultDiv.innerHTML = "Error loading data.";
    console.error(e);
  }
}
