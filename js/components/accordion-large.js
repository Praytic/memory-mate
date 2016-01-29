$(function () {
    var items = $(".accordion-items");
    items.on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).next().removeClass("open");
        } else {
            $(this).siblings().removeClass("active");
            $(this).next().siblings().removeClass("open");
            $(this).toggleClass("active");
            $(this).next().toggleClass("open");
        }
    });
});