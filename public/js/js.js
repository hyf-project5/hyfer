

$(document).ready(function(){
$("#mytable #checkall").click(function () {
        if ($("#mytable #checkall").is(':checked')) {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });

        } else {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
    });
    
    $("[data-toggle=tooltip]").tooltip();

         $("#hideShow").val("Show")
            $("#hideShow").on("click", function(){
              
              if($(this).val()=="Show"){
                  console.log('yes')
                  $(this).val("Hide")
              } 
//              else {
//                console.log('no')
//                  $(this).val("Show")
//              }
            })




});


/*CHECKBOX JS*/
$(document).ready(function(){
  
  $("input[name='frdsItem']").each(function() {
    $(this).attr('checked', true);
        $(this).parent().addClass('item-checked');
    });
  
  //Compatible with IE6
    $('.figure').click(function(){
        var flag = $(this).parent().find('.checked-flag'),
            input = $(this).parent().find('input');
            
        if(input.attr('checked') == 'checked'){
            input.attr('checked', false);
            flag.removeClass('item-checked');
        } else {
            input.attr('checked', true);
            flag.addClass('item-checked');  
        };
        return false;
    }); 
});

/*ANOTHER CHECKBOX JS*/
$(document).ready(function(e){
            $(".img-check").click(function(){
            $(this).toggleClass("check");
            });
    });

/*Announcement box*/
$(document).on('click','.close_box',function(){
    $(".att_cont").animate({ height: '0px'}, "200").fadeOut(300);
});




