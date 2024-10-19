document.getElementById("run").addEventListener("click", function () {
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = "Processing Java code...";
  const code = document.getElementById("code").value;

  // Send Java code to the server-side compiler (this endpoint must be set up)
  fetch("/compile-java", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  })
    .then((response) => {
      // Check if the response is OK and if it contains JSON
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the response as JSON
    })
    .then((result) => {
      outputElement.innerHTML = result.output || "No output from server";
    })
    .catch((err) => {
      // Handle the error and display it in the output area
      outputElement.innerHTML = `Error: ${err.message}`;
      console.error("Error:", err); // Log the error for further debugging
    });
});
