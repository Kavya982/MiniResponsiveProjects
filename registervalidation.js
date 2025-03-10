async function validateForm(event) {
    event.preventDefault();

    let name = document.forms.form.name.value
    let email = document.forms.form.email.value;
    let password = document.forms.form.password.value;
    let phone = document.forms.form.phno.value;

    let emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;

    if (!emailPattern.test(email)) {
        alert("Email must be a valid Gmail address.");
        return;
    }

    let isValid = validatePassword(password);
    let flag = validatePhoneNumber();

    if (!isValid || !flag) {
        return; 
    }

    let userData = {
        name: name,
        email: email,
        password: password,
        phone: phone
    };

    let success = await postUserData(userData);
    
    

    if (success) {
        
        document.forms.form.submit().reset(); 
    }

}

async function postUserData(userData) {
    
        let response = await axios.post("http://localhost:5000/students", userData);
        console.log("User registered:", response.data);
        alert("Registration successful!");
        document.getElementById("form").reset(); 
        return true; 
    
}

function validatePhoneNumber() {
    let phoneInput = document.getElementById("ph").value.trim();
    let phonePattern = /^[6-9]\d{9}$/;
    let flag = phonePattern.test(phoneInput);

    if (!flag) {
        alert("Invalid phone number!");
    }
    return flag;
}

function validatePassword(password) {
    let isValid = true;

    function updateColor(elementId, condition) {
        document.getElementById(elementId).style.color = condition ? "green" : "red";
    }

    updateColor("span1", password.length >= 8);
    updateColor("span2", /[a-z]/.test(password));
    updateColor("span3", /[A-Z]/.test(password));
    updateColor("span4", /[@$!%*?&]/.test(password));
    updateColor("span5", /\d/.test(password));

    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) ||
        !/[@$!%*?&]/.test(password) || !/\d/.test(password)) {
        isValid = false;
    }

    return isValid;
}

document.getElementById("pass").addEventListener("input", function () {
    validatePassword(this.value);
});

async function loginvalidate() {
    

    let emailInput = document.getElementById("email").value.trim();
    let passwordInput = document.getElementById("pass").value;

    
        let response = await axios.get("http://localhost:5000/students");
        let users = response.data;

        let user = users.find(u => u.email === emailInput && u.password === passwordInput);

        if (user) {
            alert("Login successful! Welcome, " + user.name);
            window.location.href = "index.html"; 
        } else {
            alert("Invalid email or password. Please try again.");
        }
    
}

