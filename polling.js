function checkTokenStatus(token) {
    fetch(`http://localhost:3000/verify-token?token=${token}`)
        .then(response => response.text())
        .then(data => {
            const statusElement = document.getElementById("loginStatus");
            if (data === "success") {
                statusElement.innerText = "Login successful!";
            } else if (data === "invalid") {
                statusElement.innerText = "Invalid token. Please try again.";
            }
        })
        .catch(error => console.error('Error:', error));
}
