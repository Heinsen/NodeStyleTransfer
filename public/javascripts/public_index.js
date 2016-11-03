$('.styleimagebox').click(function(){
    
    manipulateStyleImageBoxes();

    $(this).addClass('selectedstyleimagebox');
    $(this).addClass('z-depth-5');
});


function manipulateStyleImageBoxes()
{

    $(document.body).find('.styleimagebox').each(function (i) {
        $(this).removeClass('selectedstyleimagebox');
        $(this).removeClass('z-depth-5');
        $(this).addClass('z-depth-1');
    });
}