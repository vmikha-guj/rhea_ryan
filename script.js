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
    const response = await fetch('https://script.google.com/macros/s/AKfycbydqHDgOoL2iPHu0sbEBeR7gdK_bq9pAuWWQbRSGx4s1kfEtZ-CbJX68-lAU7usHLon/exec?nam_
