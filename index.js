
var popup = document.getElementById("popup");
var popupText = document.getElementById("text");
function openpopup(message){
  popupText.textContent = message;
  popup.classList.add("popup_show");
}
function closepopup(){
  popup.classList.remove("popup_show");
}

var users = [
    {
      email: "adil@example.com",
      password: "12345",
      amount: 10
    }
  ];
  
  var isLoggedIn = false;
  var currentUser = null;
  
  var loginDiv = document.querySelector(".login-container");
  var registerDiv = document.querySelector(".register-container");
  var dashboard = document.querySelector(".dashboard");
  var transferForm = document.querySelector("#transfer-form");
  var transferToInput = document.querySelector("#transfer-to");
  
  function show(element) {
    element.style.display = "block";
  }
  
  function hide(element) {
    element.style.display = "none";
  }
  
  function showLogin() {
    hide(registerDiv);
    hide(dashboard);
    show(loginDiv);
  }
  
  function showRegister() {
    hide(loginDiv);
    hide(dashboard);
    show(registerDiv);
  }
  
  function showDashboard() {
    hide(registerDiv);
    hide(loginDiv);
    show(dashboard);
  }
  
  function greetUser(user) {
    var greetingElement = document.getElementById("greeting");
    greetingElement.textContent = user.firstName + " " + user.lastName + "!";
    var amountDisplay = document.getElementById("amountDisplay");
    amountDisplay.textContent = "Rs"+" " + user.amount.toFixed(2);
  }
  
  function loginUser(email, password) {
    var user = users.find(function(user) {
      return user.email === email && user.password === password;
    });
    if (user) {
      isLoggedIn = true;
      currentUser = user;
      CurentUserTOlocalstorage(currentUser);
      showDashboard();
      greetUser(currentUser);
    } else {
      alert("Invalid email or password");
    }
  }
  function CurentUserTOlocalstorage(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  function CurrentUserFromLocalStroge(){
    var userjson = localStorage.getItem('currentUser');
    return userjson ? JSON.parse(userjson) : null;
  }

  function logout (){
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLogin();
  }
  document.getElementById("logout").addEventListener("click", function (event){
    event.preventDefault();
    logout()
  })

  
  loginDiv.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var email = formData.get("email");
    var password = formData.get("password");
    loginUser(email, password);
  });
  
  registerDiv.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var email = formData.get("email");
    var password = formData.get("password");
    var firstName = formData.get("firstName");
    var lastName = formData.get("lastName");
    var gender = formData.get("gender");
  
    if (!email || !password || !firstName || !lastName || !gender) {
      openpopup("All fields are required.");
      return;
    }
  
    if (!users.find(function(user) { return user.email === email; })) {
      users.push({ email: email, password: password, firstName: firstName, lastName: lastName, gender: gender, amount: 0 });
      openpopup("your account has  succesfully created. Thanks!");
      showLogin();
    } else {
      openpopup("User already exists");
    }
  });
  
  var navButtons = document.querySelectorAll(".nav button");
  navButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      var target = event.target.innerText.toLowerCase();
      if (target === "login") showLogin();
      else if (target === "register") showRegister();
    });
  });
  
  transferForm.addEventListener("submit", function(event) {
    event.preventDefault();
    transfer(currentUser);
  });
  
  document.querySelector("#transfer").addEventListener("click", function(event) {
    event.preventDefault();
    show(transferForm);
  });
  
  function transfer(currentUser) {
    var recipientEmail = transferToInput.value;
    var recipient = users.find(function(user) {
      return user.email === recipientEmail;
    });
    if (!recipient) {
      openpopup("Recipient not found.");
      return;
    }
    var amount = parseFloat(document.querySelector("#amount").value);
    console.log(typeof(amount))
    if (amount >= 1) {
      if (amount <= currentUser.amount) {
        currentUser.amount -= amount;
        recipient.amount += amount;
        openpopup("Transfer successful!");
      } else {
        openpopup("Amount is greater than your current balance.");
      }
    } else {
      openpopup("Please enter a valid amount.");
    }
  }
  
  document.querySelector("#wit").addEventListener("click", function(event) {
    event.preventDefault();
    withdraw(currentUser);
  });
  
  document.querySelector("#dep").addEventListener("click", function(event) {
    event.preventDefault();
    deposit(currentUser);
  });
  
  function withdraw(currentUser) {
    var amount = parseFloat(document.querySelector("#amount").value);
    if (amount >= 1) {
      if (amount <= currentUser.amount) {
        currentUser.amount -= amount;
        openpopup("Withdrawal of Rs" + amount.toFixed(2) + "has been made");
      } else {
        openpopup("Amount is greater than your current balance");
      }
    } else {
      openpopup("Please enter valid amount");
    }
    updateDisplay(currentUser);
  }
  
  function deposit(currentUser) {
    var amount = parseFloat(document.querySelector("#amount").value);
    if (amount >= 1) {
      currentUser.amount += amount;
      openpopup("Deposit of Rs" + amount.toFixed(2) + " has been made");
    } else {
      openpopup("Please enter valid amount");
    }
    updateDisplay(currentUser);
  }
  function updateDisplay(user){
    var amountDisplay = document.getElementById("amountDisplay");
    amountDisplay.textContent = "Rs" + user.amount.toFixed(2);

  }
  window.addEventListener('DOMContentLoaded', function(){
    currentUser = CurrentUserFromLocalStroge();
    if (currentUser) {
      isLoggedIn = true;
      showDashboard();
      greetUser(currentUser);
    }
  })
  