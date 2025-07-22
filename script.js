document.addEventListener("DOMContentLoaded", function () {
  const resultDiv = document.getElementById("result");
  const button = document.getElementById("searchButton");

  button.addEventListener("click", async () => {
    const name = document.getElementById("guestName").value.trim();

    if (!name) {
      resultDiv.innerHTML = "Please enter a name.";
      return;
    }

    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbydqHDgOoL2iPHu0sbEBeR7gdK_bq9pAuWWQbRSGx4s1kfEtZ-CbJX68-lAU7usHLon/exec?name=${encodeURIComponent(name)}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const rawText = await response.text();
      const htmlText = rawText.replace(/\\n/g, "<br>").replace(/\n/g, "<br>");
      resultDiv.innerHTML = htmlText;
    } catch (error) {
      resultDiv.innerHTML = "An error occurred. Please try again.";
      console.error(error);
    }
  });
});
