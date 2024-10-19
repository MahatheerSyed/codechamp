function runPythonCode(code) {
  const outputElement = document.getElementById("output");
  outputElement.innerText = "Executing code..."; // Placeholder for execution logic

  fetch("/run-python", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  })
    .then((response) => {
      if (!response.ok) {
        // If the response is not okay, throw an error
        return response.json().then((err) => {
          throw new Error(err.output);
        });
      }
      return response.json();
    })
    .then((data) => {
      outputElement.innerText = data.output; // Update with actual output
    })
    .catch((error) => {
      outputElement.innerText = "Error: " + error.message; // Display error message
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const codeTextarea = document.getElementById("code");
  const savedCode = localStorage.getItem("pythonCode");
  if (savedCode) {
    codeTextarea.value = savedCode; // Set the textarea content to the saved code
    localStorage.removeItem("pythonCode"); // Clear the stored code
  }
});
