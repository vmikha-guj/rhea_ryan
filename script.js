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
    resultDiv.style.color = "red";
    highlight.style.display = "none";
    return;
  }

  resultDiv.innerHTML = "Searching...";
  resultDiv.style.color = "#333";

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbydqHDgOoL2iPHu0sbEBeR7gdK_bq9pAuWWQbRSGx4s1kfEtZ-CbJX68-lAU7usHLon/exec?name=' + encodeURIComponent(name));
    const text = await response.text();
    resultDiv.innerHTML = text.replace(/\r?\n/g, "<br>");


    const lines = text.split(/\r?\n/);
    const foundTables = new Set();

    for (const line of lines) {
      const match = line.match(/Table (\d+)/);
      if (match) {
        foundTables.add(parseInt(match[1]));
      }
    }

    if (foundTables.size === 1) {
      const tableNum = [...foundTables][0];
      const table = tablePositions.find(t => t.table === tableNum);
      if (table) {
        const rect = layout.getBoundingClientRect();
        const x = (table.x / 100) * rect.width;
        const y = (table.y / 100) * rect.height;
        highlight.style.left = x + 'px';
        highlight.style.top = y + 'px';
        highlight.style.display = "block";
      }
    } else {
      highlight.style.display = "none";
    }
  } catch (error) {
    resultDiv.innerHTML = "Error occurred.";
    resultDiv.style.color = "red";
    highlight.style.display = "none";
  }
}
