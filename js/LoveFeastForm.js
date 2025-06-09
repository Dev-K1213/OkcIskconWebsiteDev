document.getElementById('sponsor-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Get the selected date from the hidden input
    const selectedDateValue = document.getElementById('selected-date').value;

    if (!selectedDateValue) {
        alert('Please select a Sunday for your Love Feast sponsorship');
        return; // Prevent form submission if no date is selected
    }

    // Add the date to the form data (it's already in selectedDateValue)
    formData.append('feast-date', selectedDateValue);

    // Submit form data to Formspree
    fetch('https://formspree.io/f/manjqrzw', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
    }).then(response => {
        if (response.ok) {
            // Clear the date inputs
            document.getElementById('feast-date').value = '';
            document.getElementById('selected-date').value = '';
            
            // Redirect to PayPal donation page
            window.location.href = 'https://www.paypal.com/ncp/payment/LDAP6JXD6GZUG';
            
        } else {
            alert("Oops! Something went wrong submitting the form.");
        }
    }).catch(error => {
        console.error("Formspree error:", error);
        alert("Submission failed. Please try again.");
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const feastDateInput = document.getElementById('feast-date');
    const selectedDateInput = document.getElementById('selected-date');
    
    // Set min date to today
    const today = new Date();
    // Ensure the min date is correctly formatted as YYYY-MM-DD
    feastDateInput.min = today.toISOString().split('T')[0];
    
    // Set max date to 1 year from today
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 1);
    // Ensure the max date is correctly formatted as YYYY-MM-DD
    feastDateInput.max = maxDate.toISOString().split('T')[0];
    
    // Function to check if a date is a Sunday
    function isSunday(date) {
        // getDay() returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        return date.getDay() === 0;
    }
    
    // Handle date selection
    feastDateInput.addEventListener('change', function(e) {
        const selectedDateString = e.target.value; // Get the date string in YYYY-MM-DD format
        
        if (selectedDateString) { // Only proceed if a date is actually selected
            const selectedDate = new Date(selectedDateString + 'T00:00:00'); // Parse as UTC to avoid timezone issues
            
            if (!isSunday(selectedDate)) {
                alert('Please select a Sunday for your Love Feast sponsorship');
                feastDateInput.value = ''; // Clear the input if not a Sunday
                selectedDateInput.value = ''; // Clear the hidden input
            } else {
                // If it IS a Sunday, set the hidden input
                selectedDateInput.value = selectedDateString;
            }
        } else {
            // If the input is cleared by the user, also clear the hidden input
            selectedDateInput.value = '';
        }
    });

});