function validateForm() {
    let x = document.forms["myForm"]["name"].value;
    let y = document.forms["myForm"]["password"].value;
    let z = document.forms["myForm"]["email"].value;
    if (x == "" || y == "") {
      alert("Name must be filled out");
      return false;
    }
    // Validar email con regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(z)) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
}