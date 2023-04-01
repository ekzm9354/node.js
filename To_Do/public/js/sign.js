function resetClass(element, classname){
    element.classList.remove(classname);
  }

  document.getElementsByClassName("show-signup")[0].addEventListener("click",function(){
    let form = document.getElementsByClassName("form")[0];
    resetClass(form, "signin");
    resetClass(form, "reset");
    form.classList.add("signup");
    document.getElementById("submit-btn").innerText = "회원가입";
  });
  document.getElementsByClassName("show-signin")[0].addEventListener("click",function(){
    let form = document.getElementsByClassName("form")[0];
    resetClass(form, "signup");
    resetClass(form, "reset");
    form.classList.add("signin");
    document.getElementById("submit-btn").innerText = "로그인";
  });
  document.getElementsByClassName("show-reset")[0].addEventListener("click",function(){
    let form = document.getElementsByClassName("form")[0];
    resetClass(form, "signup");
    resetClass(form, "signin");
    form.classList.add("reset");
    document.getElementById("submit-btn").innerText = "이용하기";
  });

  function connect(){
    var user = document.getElementsByName("Username")[0].value;
    location.href="/signin?user="+user;
  }