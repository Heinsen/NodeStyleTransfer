var selectedStyleImagePath = 'art_the_great_wave_off_kanagawa.jpg';
var uploadedImgPath;

$('.styleimagebox').click(function(){

    manipulateStyleImageBoxes();

    $(this).addClass('selectedstyleimagebox');
    $(this).addClass('z-depth-5');

    selectedStyleImagePath = $(this).find('img').attr('src').split('/').pop();
});

$("img.contentimgsrc").on('load', function() {
    uploadedImgPath = $(this).attr('src').split('/').pop();

});

$('#startstyletransferbtn').click(function() {
    window.location.replace('/startstyletransfer/?content_image=' + uploadedImgPath + '&style_image=' + selectedStyleImagePath);
});

function manipulateStyleImageBoxes()
{
    $(document.body).find('.styleimagebox').each(function (i) {
        $(this).removeClass('selectedstyleimagebox');
        $(this).removeClass('z-depth-5');
        $(this).addClass('z-depth-1');
    });
}

