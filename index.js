const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.body.style.overflow = "auto";
}

window.onload = function () {
  const popup = document.getElementById("popup");
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";
};