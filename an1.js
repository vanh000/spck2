// chọn nút
const btn = document.querySelectorAll(".cart-button")

// lấy tt
btn.forEach(function(button, index) {
    button.addEventListener("click", function(event) {
        var btnItem = event.target
        var product = btnItem.parentElement.parentElement.parentElement.parentElement
        var productImg = product.querySelector("img").src
        var productName = product.querySelector(".card-title").innerText
        var productPrice = product.querySelector(".price span").innerText
        addcart(productImg, productName, productPrice)
    })
})

// thêm vào cart
function addcart(productImg, productName, productPrice) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    var productExists = false

    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === productName) {
            cartItems[i].quantity += 1
            productExists = true
            break
        }
    }

    if (!productExists) {
        var newItem = {
            img: productImg,
            name: productName,
            price: productPrice,
            quantity: 1
        }
        cartItems.push(newItem)
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    renderCart()
}

// render cart
function renderCart() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    var cartTable = document.querySelector("tbody")
    cartTable.innerHTML = ''
    cartItems.forEach(function(item) {
        var addtr = document.createElement("tr")
        var trcontent = '<tr><td style="display: flex; align-items: center;"><img src="' + item.img + '" class="imgff"><span class="titlef">' + item.name + '</span></td><td><input class="quantity" type="number" value="' + item.quantity + '" min="1" max="99" style="width: 40px; outline: none;"><!--quantity--></td><td><span class="prices">' + item.price + '</span><sup>đ</sup></td><td style="cursor: pointer; "><span class="del">Xóa</span><!--delete--></td></tr>'
        addtr.innerHTML = trcontent
        cartTable.append(addtr)
    })
    carttotal()
    deleteCart()
}

// tính tiền
function carttotal() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    var total = 0
    cartItems.forEach(function(item) {
        total += item.quantity * parseFloat(item.price.replace(/,/g, '')) * 1000
    })
    var cartTotal = document.querySelector(".price-total span")
    var cartPrice = document.querySelector(".show span")
    cartPrice.innerHTML = total.toLocaleString('de-DE')
    cartTotal.innerHTML = total.toLocaleString('de-DE')
    inputchange()
}

function inputchange() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    var cartItemElements = document.querySelectorAll("tbody tr")
    cartItemElements.forEach(function(row, index) {
        var inputValue = row.querySelector(".quantity")
        inputValue.addEventListener("change", function() {
            cartItems[index].quantity = parseInt(inputValue.value)
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            carttotal()
        })
    })
}

// del
function deleteCart() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    var cartItemElements = document.querySelectorAll("tbody tr")
    cartItemElements.forEach(function(row, index) {
        var deleteButton = row.querySelector(".del")
        deleteButton.addEventListener("click", function() {
            cartItems.splice(index, 1)
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            renderCart()
        })
    })
}

// đặt lại giỏ hàng
const resetCartButton = document.querySelector(".cartf-button")
resetCartButton.addEventListener("click", function() {
    localStorage.removeItem('cartItems')
    renderCart()
    alert("Đã mua giỏ hàng")
})

const cartbtn = document.querySelector(".x")
const cartshow = document.querySelector(".show")
cartshow.addEventListener("click", function() {
    document.querySelector(".cartf").style.right = "0"
})
cartbtn.addEventListener("click", function() {
    document.querySelector(".cartf").style.right = "-100%"
})

// Render cart on page load
document.addEventListener("DOMContentLoaded", function() {
    renderCart()
})


