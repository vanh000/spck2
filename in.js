const emailInp = document.querySelector(".email");
const passInp = document.querySelector(".pass");
const btnInp = document.querySelector(".btn");
const eper = document.querySelector(".eper")

// chuyen doi json sang object
const emailIn4 = JSON.parse(localStorage.getItem("user"));
// luu ra bien
const email = emailIn4.email;
const pass = emailIn4.pass;
console.log(emailIn4, pass, email)
let ktr = false

// lay value
btnInp.addEventListener("click", (e) => {
    e.preventDefault();
    // lay value tu form
    const emailVl = emailInp.value;
    const passVl = passInp.value;
    // so sanh value tu form va localStorage
    if (emailVl == email && passVl == pass) {
        window.location = "./main.html";
        ktr = true
    } else {
        eper.textContent = "email hoặc pass sai";
        eper.classList.add("er");
        ktr = false
    }
    console.log(ktr, passVl)
});