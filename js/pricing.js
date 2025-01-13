function selectPlan(plan) {
    // Store the selected plan in localStorage
    localStorage.setItem('selectedPlan', plan);

    // Navigate to the contact page
    window.location.href = 'contact.html';
}