document.getElementById("searchbar_UL").style.display = "none";

function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchbar_Input");
  filter = input.value.toUpperCase();
  ul = document.getElementById("searchbar_UL");
  li = ul.getElementsByClassName("searchlist");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }

    if (filter.length > 0) {
      document.getElementById("searchbar_UL").style.display = "block";
    } else {
      document.getElementById("searchbar_UL").style.display = "none";
    }
  }
}
