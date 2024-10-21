var typed = new Typed(".typing", {
  strings: ["python", "java", "html", "css", "javascript", "R"],
  typeSpeed: 40,
  backSpeed: 40,
  loop: true, // Optional: To loop the typing effect
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwQxbaiv-SB506TK0mxzVHaDHCX_h_2rEVg8fFHkG8Wpp7smPv2LTSvr83dQZPkIJwu6g/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show loader and hide the form

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      alert("Message Successfully Sent");
    })
    .catch((error) => {
      console.error("Error!", error.message);

      // Hide loader and show form in case of error
      loader.style.display = "none";
      feedbackForm.style.display = "block";
    });

  form.reset();
});

function tryYourself() {
  const code = document.querySelector(
    ".pythoncompiler .compliersection pre code"
  ).innerText;
  localStorage.setItem("pythonCode", code); // Store the code in local storage
  window.location.href = "python"; // Redirect to python.html
}
function tryYourselfjavscript() {
  const code = document.querySelector(
    ".jscompiler .compliersection pre code"
  ).innerText;
  localStorage.setItem("javascriptCode", code); // Store the code in local storage
  window.location.href = "javascript"; // Redirect to python.html
}
function tryYourselfhtml() {
  const code = document.querySelector(
    ".htmlcompiler .compliersection pre code"
  ).innerText;
  localStorage.setItem("htmlCode", code); // Store the code in local storage
  window.location.href = "html"; // Redirect to python.html
}
function tryYourselfr() {
  const code = document.querySelector(
    ".rcompiler .compliersection pre code"
  ).innerText;
  localStorage.setItem("rCode", code); // Store the code in local storage
  window.location.href = "r"; // Redirect to python.html
}

// Load code from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const codeTextarea = document.getElementById("code");
  const savedCode = localStorage.getItem("htmlCode");
  if (savedCode) {
    codeTextarea.value = savedCode; // Set the textarea content to the saved code
    localStorage.removeItem("htmlCode"); // Clear the stored code
  }
});

function runHtmlCode(code) {
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = ""; // Clear previous output
  const iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();
  outputElement.innerHTML = ""; // Clear previous output
}
// ===============gsap=========================================

// GSAP Animation for the compilers section
// ====================R============================rcompiler
