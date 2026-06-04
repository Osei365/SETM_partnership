// Paste your unique Google Web App URL here
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7pVaM0kaBs0IjX8NrnGa3UXIJE3sgCpTtEvGVeBRD1q0Ozy67oL4zWi1WGTh7M5Rq9Q/exec";

document.getElementById('submissionForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page from doing a standard form reload

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    // Pull selected choice out of your section 2 radio button block
    const selectedRadio = document.querySelector('input[name="partnerWithSETM"]:checked').value;
    const selectedRadio2 = document.querySelector('input[name="partnerCategory"]:checked').value;
    const selectedRadio3 = document.querySelector('input[name="joinWhatsapp"]:checked').value;
    const selectedRadio4 = document.querySelector('input[name="QuarterlyReports"]:checked').value;
    const selectedRadio5 = document.querySelector('input[name="consent"]:checked').value;

    // Collect all data variables from your three layout sections
    const formData = {
        fullName: document.getElementById('name').value.trim(),
        emailAddress: document.getElementById('email').value.trim(),
        phoneNumber: document.getElementById('phone').value.trim(),
        cityState: document.getElementById('city').value.trim(),
        partnerWithSETM: selectedRadio,
        partnerCategory: selectedRadio2,
        joinWhatsapp: selectedRadio3,
        quarterlyReports: selectedRadio4,
        birthday: document.getElementById('birthday').value.trim(),
        prayerRequest: document.getElementById('prayerrequest').value.trim(),
        consent: selectedRadio5
    };

    // Send the structured object payload directly to Google Sheet
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Solves cross-origin hosting security policies
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        // Automatically forward users to your thank-you page on success
        window.location.href = "thankyou.html";
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Something went wrong. Please try again.");
        submitBtn.textContent = "Submit Form";
        submitBtn.disabled = false;
    });
});
