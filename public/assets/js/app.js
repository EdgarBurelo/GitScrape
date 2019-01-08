$(document).ready(()=>{
    console.log("hello World");
    $(".btn-comgo").click((ev) => {
        event.preventDefault();
        window.location.href = "/articles/" + ev.currentTarget.id;
    });

    $(".cmt-btn").click(ev => {
        event.preventDefault();
        console.log(ev.currentTarget.id);
        $.ajax({
            method: "POST",
            url: "/comment/"+ev.currentTarget.id,
            data: {
                title: $("#commentTitleH").val(),
                body: $("#commentTextH").val(),
                user: $("#commentAuthH").val()

            }
        }).then(data => {
            location.reload();
            console.log("algo");
        });
    });
});

