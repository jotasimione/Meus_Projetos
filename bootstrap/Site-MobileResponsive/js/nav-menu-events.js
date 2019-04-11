$("#nav-menu").on("show.bs.collapse",function(){
    $("#page-banner").css("transform","translate(-50%, 10%)");
});

$("#nav-menu").on("hide.bs.collapse",function(){
    $("#page-banner").css("transform","translate(-50%, -40%)");
});