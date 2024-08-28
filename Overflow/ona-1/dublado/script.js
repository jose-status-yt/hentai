function showPopup() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function loadPopupContent() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "popup-content.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("popup").innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}

window.onload = function () {
  loadPopupContent();
  showPopup();
};
