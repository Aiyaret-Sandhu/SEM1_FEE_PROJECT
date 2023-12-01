$(document).ready(function(){
    $(".box").each(function(index){
        var id = index + 1;
        var fullDescription = $("#description" + id).text();
        var shortDescription = fullDescription.substring(0, 100) + '...';

        $("#description" + id).text(shortDescription);

        $("#more" + id).click(function(){
            if($(this).text() === "read more"){
                $("#description" + id).text(fullDescription);
                $(".box").eq(index).addClass("expanded");
                $(this).text("read less");
            } else {
                $("#description" + id).text(shortDescription);
                $(".box").eq(index).removeClass("expanded");
                $(this).text("read more");
            }
        });
    });
});