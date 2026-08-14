const form = document.getElementById("feedbackForm");
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

// Get radio button value
function getRadioValue(name) {
    const selected = document.querySelector(
        `input[name="${name}"]:checked`
    );

    return selected ? selected.value : "";
}

// Get checkbox values
function getCheckboxValues(name) {
    const selected = document.querySelectorAll(
        `input[name="${name}"]:checked`
    );

    return Array.from(selected).map(item => item.value);
}

// Submit form
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const feedback = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        reason: getRadioValue("reason"),
        satisfaction: getRadioValue("satisfaction"),
        ease: getRadioValue("ease"),
        quality: getRadioValue("quality"),
        helpfulness: getRadioValue("helpfulness"),
        recommend: document.getElementById("recommend").value,
        improvements: getCheckboxValues("improve"),
        comments: document.getElementById("comments").value
    };

    // LOCAL STORAGE
    // Stores feedback permanently in browser
    localStorage.setItem(
        "customerFeedback",
        JSON.stringify(feedback)
    );

    // SESSION STORAGE
    // Stores feedback only for current browser session
    sessionStorage.setItem(
        "currentFeedback",
        JSON.stringify(feedback)
    );

    message.textContent = "Feedback submitted successfully!";
    message.style.color = "green";

    form.reset();
});


// Load saved data from Session Storage
window.addEventListener("load", function() {

    const savedData = sessionStorage.getItem("currentFeedback");

    if (savedData) {

        const feedback = JSON.parse(savedData);

        document.getElementById("fullName").value = feedback.fullName || "";
        document.getElementById("email").value = feedback.email || "";
        document.getElementById("recommend").value = feedback.recommend || "";
        document.getElementById("comments").value = feedback.comments || "";

        // Radio buttons
        document.querySelectorAll("input[type='radio']").forEach(radio => {

            if (
                radio.value === feedback.reason ||
                radio.value === feedback.satisfaction ||
                radio.value === feedback.ease ||
                radio.value === feedback.quality ||
                radio.value === feedback.helpfulness
            ) {
                radio.checked = true;
            }
        });

        // Checkboxes
        document.querySelectorAll("input[name='improve']").forEach(box => {

            if (feedback.improvements.includes(box.value)) {
                box.checked = true;
            }
        });
    }
});


// Clear Local Storage and Session Storage
clearBtn.addEventListener("click", function() {

    localStorage.removeItem("customerFeedback");
    sessionStorage.removeItem("currentFeedback");

    form.reset();

    message.textContent = "All saved data has been cleared.";
    message.style.color = "red";
});