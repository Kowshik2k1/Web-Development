const submit = document.getElementById("submit");
const form1 = document.getElementById("basic-validation");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;
const fname = document.getElementById("name");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const conf_pass = document.getElementById("conf_password");
const phone = document.getElementById("phone");
const dob = document.getElementById("dob");

const fname_label = document.getElementById("name_label");
const email_label = document.getElementById("email_label");
const pass_label = document.getElementById("password_label");
const conf_pass_label = document.getElementById("conf_password_label");
const phone_label = document.getElementById("phone_label");
const dob_label = document.getElementById("dob_label");

// DOB validation 
function DateValidate(dob) {
  let today = new Date();
  let given_dob = new Date(dob);
  let yearDiff = today.getFullYear() - given_dob.getFullYear();
  let monthDiff = today.getMonth() - given_dob.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < given_dob.getDate())
  ) {
    yearDiff--;
  }

  return yearDiff;
}

// To add validation onChange of the input
form1.addEventListener("submit", (e) => {
  e.preventDefault();
  const fname_value = document.getElementById("name").value.trim();
  const email_value = document.getElementById("email").value.trim();
  const pass_value = document.getElementById("password").value.trim();
  const conf_pass_value = document.getElementById("conf_password").value.trim();
  const phone_value = document.getElementById("phone").value.trim();
  const dob_value = document.getElementById("dob").value;
  const conf_pass_error = document.getElementById("conf_pass_error");
  const phone_error = document.getElementById("phone_error");
  const dob_error = document.getElementById("dob_error");

  let valid = true;

  if (fname_value === "") {
    valid = false;
    fname.classList.add("danger");
    fname_label.classList.add("danger");
  }

  if (pass_value.length < 8) {
    valid = false;
    pass.classList.add("danger");
    pass_label.classList.add("danger");
  }

  if (!emailPattern.test(email_value)) {
    valid = false;
    email.classList.add("danger");
    email_label.classList.add("danger");
  }

  if (conf_pass_value !== pass_value) {
    valid = false;
    conf_pass.classList.add("danger");
    conf_pass_label.classList.add("danger");
    conf_pass_error.innerText = "Password is not matching!";
  }

  if (!phonePattern.test(phone_value)) {
    valid = false;
    phone.classList.add("danger");
    phone_label.classList.add("danger");
    phone_error.innerText = "Invalid Mobile number!";
  }

  if (dob_value === "" || DateValidate(dob_value) < 18) {
    valid = false;
    dob.classList.add("danger");
    dob_label.classList.add("danger");
    dob_error.innerText = "Age must be above 18!";
  }

  if (valid) {
    submit.disabled = false;
    alert("Form submitted!");
    conf_pass_error.innerText = "";
    phone_error.innerText = "";
    dob_error.innerText = "";
    form1.reset();
  }
});

// To disable the button if there is any error in form 
function checkFormValidity() {
  submit.disabled = !(
    fname.value.trim() !== "" &&
    emailPattern.test(email.value.trim()) &&
    pass.value.trim().length >= 8 &&
    conf_pass.value.trim() === pass.value.trim() &&
    phonePattern.test(phone.value.trim()) &&
    dob.value !== "" &&
    DateValidate(dob.value) >= 18
  );
}

fname.addEventListener("input", () => {
  if (fname.value.trim() !== "") {
    fname.classList.remove("danger");
    fname_label.classList.remove("danger");
  }
  checkFormValidity();
});

email.addEventListener("input", () => {
  if (emailPattern.test(email.value.trim())) {
    email.classList.remove("danger");
    email_label.classList.remove("danger");
  }
  checkFormValidity();
});

pass.addEventListener("input", () => {
  if (pass.value.trim().length >= 8) {
    pass.classList.remove("danger");
    pass_label.classList.remove("danger");
  }
  checkFormValidity();
});

conf_pass.addEventListener("input", () => {
  const conf_pass_error = document.getElementById("conf_pass_error");

  if (pass.value.trim() === conf_pass.value.trim()) {
    conf_pass_error.innerText = "";
    conf_pass.classList.remove("danger");
    conf_pass_label.classList.remove("danger");
  }
  checkFormValidity();
});

phone.addEventListener("input", () => {
  const phone_error = document.getElementById("phone_error");

  if (phonePattern.test(phone.value.trim())) {
    phone_error.innerText = "";
    phone.classList.remove("danger");
    phone_label.classList.remove("danger");
  }
  checkFormValidity();
});

dob.addEventListener("input", () => {
  const dob_error = document.getElementById("dob_error");

  if (dob.value !== "" || DateValidate(dob.value) > 18) {
    dob_error.innerText = "";
    dob.classList.remove("danger");
    dob_label.classList.remove("danger");
  }
  checkFormValidity();
});


// Question - 4

const form2 = document.getElementById("custom-validation");
let textarea = document.getElementById("textarea");

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm2();
});

function validateForm2() {
  let form2success = document.getElementById("form2-success");
  let error = document.getElementById("error");

  if (textarea.value.length < 50) {
    error.style.display = 'block';
  } else {
    error.style.display = 'none';
    form2success.style.display = 'block';
    form2success.classList.add("show");

    setTimeout(() => {
      form2.reset();
      form2success.style.display = 'none';
      form2success.classList.remove("show");
    }, 3000);
  }
};

textarea.addEventListener("input", () => {
  const error = document.getElementById("error");

  if (textarea.value.length < 50) {
    error.style.display = 'block';
  } else {
    error.style.display = 'none';
    form2success.style.display = 'block';
  }

  validateForm2();
});