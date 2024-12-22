const emailInp = document.querySelector(".email")
const passInp = document.querySelector(".pass")
const repassInp = document.querySelector(".re-pass")

let vupE = false
let vupP = false
let vupRp = false
let userVl = JSON.parse(localStorage.getItem("user")) || null;
// btn
const btn = document.querySelector(".btn")
const emailEr = document.querySelector(".email-er")
const passEr = document.querySelector(".pass-er")
const repassEr = document.querySelector(".repass-er")
const passRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,})/
const emailRegex = /^\S+@\S+\.\S+$/
    // dang ky
btn.addEventListener("click", function(e) {
    e.preventDefault();
    // lay inp
    const emailVl = emailInp.value.trim();
    //pass
    const passVl = passInp.value.trim();
    const re_passVl = repassInp.value.trim()
    if (!passVl.match(passRegex)) {
        // textCtn
        passEr.textContent = "Pass khong hop le";
        passEr.classList.add("er");
        vupP = false

    } else {
        passEr.textContent = "";
        passEr.classList.remove("er");
        vupP = true

        if (passVl != re_passVl) {
            repassEr.textContent = "nhập lại pass sai"
            repassEr.classList.add("er")
            vupRp = false
        } else {
            repassEr.textContent = ""
            repassEr.classList.remove("er")
            vupRp = true
        }
    }

    if (!emailVl.match(emailRegex)) {
        emailEr.textContent = "email khong hop le";
        emailEr.classList.add("er")
        vupE = false


    } else {
        emailEr.textContent = "";
        emailEr.classList.remove("er")
        vupE = true


    }

    if (vupE == true && vupP == true && vupRp == true) {
        // email pass v
        let tt = JSON.stringify({
            email: emailVl,
            pass: passVl,
        });
        localStorage.setItem("user", tt);
        window.location.href = "./home.html";

    }
    console.log(vupP)
    console.log(vupE)
});