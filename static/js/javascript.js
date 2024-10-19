// Load code from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const codeTextarea = document.getElementById("code");
  const savedCode = localStorage.getItem("javascriptCode");
  if (savedCode) {
    codeTextarea.value = savedCode; // Set the textarea content to the saved code
    localStorage.removeItem("javascriptCode"); // Clear the stored code
  }
});

function runJavaScriptCode(code) {
  const outputElement = document.getElementById("output");
  outputElement.innerText = "Executing code...";

  fetch("/run-javascript", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  })
    .then((response) => {
      if (!response.ok) {
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

// Function to display the output in the output div
function customLog(message) {
  const outputElement = document.getElementById("output");
  const p = document.createElement("p");
  p.textContent = message;
  outputElement.appendChild(p);
}

// Redirect console.log to customLog
console.log = function (...args) {
  customLog(args.join(" "));
};

// Run code when button is clicked
document.getElementById("run").addEventListener("click", function () {
  const code = document.getElementById("code").value;
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = ""; // Clear previous output
  try {
    eval(code); // Execute the JavaScript code
  } catch (e) {
    customLog("Error: " + e.message);
  }
});
