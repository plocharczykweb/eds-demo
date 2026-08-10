function slideBanner() {
  var container = document.querySelector(".banner > div");
  
  function slide() {
    var banners = container.querySelectorAll(":scope > div");
    var firstBanner = banners[0];

    // Animate first banner out to the left
    firstBanner.style.transition = "margin-left 300ms ease";
    firstBanner.style.marginLeft = "-100%";

    setTimeout(function () {
      // Move it to the end
      container.appendChild(firstBanner);

      // Reset it without animating
      firstBanner.style.transition = "none";
      firstBanner.style.marginLeft = "0";

      // Wait 2500ms before sliding again
      setTimeout(slide, 2500);
    }, 300);
  }

  setTimeout(slide, 2500);
}

document.addEventListener("DOMContentLoaded", function () {
  slideBanner();
});
