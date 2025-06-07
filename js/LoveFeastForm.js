document.getElementById('sponsor-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Get amount from form (optional)
    const amount = document.getElementById('donation-amount')?.value || '';
    const paypalUrl = `https://www.paypal.com/donate/?hosted_button_id=552L99DYHA7VG${amount ? '&amount=' + encodeURIComponent(amount) : ''}`;

    fetch('https://formspree.io/f/xwpbejrz', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
    }).then(response => {
        if (response.ok) {
            alert("Thank you! Redirecting to PayPal...");

            
                window.open(paypalUrl, '_blank');
        
        } else {
            alert("Oops! Something went wrong submitting the form.");
        }
    }).catch(error => {
        console.error("Formspree error:", error);
        alert("Submission failed. Please try again.");
    });
});