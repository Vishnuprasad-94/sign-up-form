
/*Input elements*/

const form = document.getElementById('form');

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const inputArray = [firstNameInput,lastNameInput,emailInput,passwordInput]

/*email and password regEx patterns*/

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$|^$/;


/*checking form submission*/

form.addEventListener('submit',handleSubmit);

function handleSubmit (e) {

    e.preventDefault();

    /*function for error styling*/

    function assignErrorStyle (input) {
            input.classList.add('error');
            input.parentElement.classList.add('error');
    }

    /*checking for empty inputs*/

    for (const input of inputArray) {
        if (input.value === "" || input.value === null) {
            assignErrorStyle(input);
            input.nextElementSibling.innerHTML = `${input.placeholder} cannot be empty`
        } 
    }

    /*checking validity of email*/

    if (!emailRegex.test(emailInput.value)) {
        assignErrorStyle(emailInput);
        
        if (!emailInput.value.includes("@")) {
          emailInput.nextElementSibling.innerHTML = "Email must contain @"
        } else if (!emailInput.value.includes(".")) {
          emailInput.nextElementSibling.innerHTML = "Email must contain ."
        } else {
          emailInput.nextElementSibling.innerHTML = "Looks like this is not an email"
        }
      }
      
      /*checking validity of password*/

      if (!passwordRegex.test(passwordInput.value)) {
        assignErrorStyle(passwordInput);
        
        if (passwordInput.value.length < 8) {
          passwordInput.nextElementSibling.innerHTML = "Password must be at least 8 characters long"
        } else if (!/[a-z]/.test(passwordInput.value)) {
          passwordInput.nextElementSibling.innerHTML = "Password must contain at least one lowercase letter"
        } else if (!/[A-Z]/.test(passwordInput.value)) {
          passwordInput.nextElementSibling.innerHTML = "Password must contain at least one uppercase letter"
        } else if (!/\d/.test(passwordInput.value)) {
          passwordInput.nextElementSibling.innerHTML = "Password must contain at least one digit"
        } else if (!/[@$!%#*?&]/.test(passwordInput.value)) {
          passwordInput.nextElementSibling.innerHTML = "Password must contain at least one special character"
        } else {
          passwordInput.nextElementSibling.innerHTML = "Password invalid"
        }
      }

      /*submitting form if all is good*/

      if (
        firstNameInput.value !== "" &&
        lastNameInput.value !== "" &&
        emailRegex.test(emailInput.value) &&
        passwordRegex.test(passwordInput.value)
      ) {
        form.submit();
      }
      

    }

/*removing error styling as input is entered*/

for (const input of inputArray) {
    input.addEventListener('input', () => {
        input.classList.remove('error');
        input.parentElement.classList.remove('error');
        input.nextElementSibling.innerHTML =  "";
    })
}


