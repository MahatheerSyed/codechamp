document.getElementById("run").addEventListener("click", function () {
  const outputElement = document.getElementById("output");
  const code = document.getElementById("code").value;

  // Set the output HTML directly
  outputElement.innerHTML = code;
});
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
