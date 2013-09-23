$(function(){
	// $('.video-mask').hover(function(){
	// 	$(this).css('opacity','0');
	// },function(){
	// 	$(this).css('opacity','0.3');
	// })
	// 
	// $('.dropdown').hoverIntent({
 //        over: function() {
 //            $(this).children(".mega-wrap").fadeIn(200);
 //            $(this).find('a').eq(0).addClass('bg');
 //        },
 //        out: function() {
 //            $(this).children(".mega-wrap").hide();
 //            $(this).find('a').eq(0).removeClass('bg');
 //        },
 //        timeout: 150
	// });
        var megamenu = $(".nav-menu");
        $(document).bind("mousemove.megamenu", function(e){
            var sensitivity = 5;
            var x = e.pageX;
            var y = e.pageY;
            var dx = 0;
            var dy = 0;
            
            if( megamenu.data("mousex") )
            {
                dx = Math.abs( x - megamenu.data("mousex") );
                dy = Math.abs( y - megamenu.data("mousey") );
            }
            
            megamenu.data("mousex",x);
            megamenu.data("mousey",y);              
            
            if(dx > sensitivity || dy > sensitivity )
            {
                $(document).unbind("mousemove.megamenu");

                $(".nav-menu li").hoverIntent({
                    over: function() {
                        $(this).find('a').eq(0).addClass('bg');
                        $(this).children(".mega-wrap").fadeIn(200);
                    },
                    out: function() {
                        $(this).find('a').eq(0).removeClass('bg');
                        $(this).css('background','#013A89').children(".mega-wrap").hide();              
                    },
                    timeout: 150
                });             
            }
        }); 

// // alert($(".nav-menu li.index").html());
//     if (window.location.pathname.indexOf("/index") != 0) {$(".nav-menu li a").removeClass("selected");$(".nav-menu li.index a").eq(0).addClass("selected"); }
//     else if (window.location.pathname.indexOf("/xygk") != 0) {alert();$(".nav-menu li a").removeClass("selected"); $(".nav-menu li.xygk a").eq(0).addClass("selected"); }
//     else if (window.location.pathname.indexOf("/jyjx") != 0) {$(".nav-menu li a").removeClass("selected"); $(".nav-menu li.jyjx a").eq(0).addClass("selected"); }
//     else if (window.location.pathname.indexOf("/kxyj") != 0) {$(".nav-menu li a").removeClass("selected"); $(".nav-menu li.kxyj a").eq(0).addClass("selected"); }
//     else if (window.location.pathname.indexOf("/xsfc") != 0) {$(".nav-menu li a").removeClass("selected"); $(".nav-menu li.xsfc a").eq(0).addClass("selected"); }
//     else if (window.location.pathname.indexOf("/zsjy") != 0) {$(".nav-menu li a").removeClass("selected"); $(".nav-menu li.zsjy a").eq(0).addClass("selected"); }
//     else if (window.location.pathname.indexOf("/irs") != 0) {$(".nav-menu li a").removeClass("selected"); $(".nav-menu li.irs a").eq(0).addClass("selected");}
var urlstr = location.href;
  var urlstatus=false;
   // console.log($(".nav-menu li").children('a'));
  $(".nav-menu li").children('a').each(function () {
    console.log($(this).html());
    if ((urlstr + '/').indexOf($(this).attr('rel')) > -1&&$(this).attr('rel')!='') {
      $(this).addClass('selected'); urlstatus = true;
    } else {
      $(this).removeClass('selected');
    }
  });
  if (!urlstatus) {$(".nav-menu li").children('a').eq(0).addClass('selected'); }


  $('.dropdown').hover(function(){
    $(this).find('.child-item').stop().show();
  },function(){
    $(this).find('.child-item').stop().hide();
  });


});