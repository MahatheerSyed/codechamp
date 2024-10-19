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
gsap.from(".compiers a", {
  duration: 1,
  opacity: 0,
  y: -20,
  stagger: 0.2,
  ease: "power1.out",
});

// GSAP Animation for the main title and quote
gsap.from(".container h1, .container h2", {
  duration: 1,
  opacity: 0,
  y: -50,
  ease: "power2.out",
  delay: 0.5,
});

// GSAP Animation for the blockquote
gsap.from("blockquote", {
  duration: 1,
  opacity: 0,
  scale: 0.5,
  ease: "back.out(1.7)",
  delay: 1,
});

// GSAP Animation for the footer
gsap.from(".footer", {
  duration: 1,
  opacity: 0,
  y: 50,
  ease: "power1.out",
  delay: 1.5,
});

// GSAP Animation for buttons on hover
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
    });
  });
});
// Ensure you import the ScrollTrigger plugin first
gsap.registerPlugin(ScrollTrigger);

gsap.from(".pythoncompiler .textpart", {
  x: 150, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duration
  scrollTrigger: {
    trigger: ".pythoncompiler", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
gsap.from(".pythoncompiler .codepart", {
  x: -150, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duration
  scrollTrigger: {
    trigger: ".pythoncompiler", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
// ====================js============================jscompiler
gsap.from(".jscompiler .textpart", {
  x: 150, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duration
  scrollTrigger: {
    trigger: ".jscompiler", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
gsap.from(".jscompiler .codepart", {
  x: -150, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duration
  scrollTrigger: {
    trigger: ".jscompiler", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
// ====================html============================rcompiler
gsap.from(".htmlcompiler .textpart", {
  x: 150, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duration
  scrollTrigger: {
    trigger: ".htmlcompiler", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
gsap.from(".htmlcompiler .codepart", {
  x: -150, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duration
  scrollTrigger: {
    trigger: ".htmlcompiler", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
// ====================R============================rcompiler
gsap.from(".rcompiler .textpart", {
  x: 150, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duration
  scrollTrigger: {
    trigger: ".rcompiler", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
gsap.from(".rcompiler .codepart", {
  x: -150, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duration
  scrollTrigger: {
    trigger: ".rcompiler", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
// ====================R============================rcompiler
gsap.from(".footer .foot", {
  x: -10, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duratio
  scrollTrigger: {
    trigger: ".footer", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
gsap.from(".footer .feed", {
  x: 150, // Move from the right
  opacity: 0, // Start fully transparent
  duration: 0.3, // Animation duration
  scrollTrigger: {
    trigger: ".footer", // The element that triggers the animation
    start: "top 80%", // Start the animation when the top of the trigger hits 80% of the viewport height
    end: "bottom 30%", // End the animation when the bottom of the trigger hits 30% of the viewport height
    toggleActions: "play none none reverse", // Play on enter, do nothing on leave, reverse on leave
    scrub: true, // Smoothly animate as the user scrolls
  },
});
