(function(){

    var $slider = $("#slider");
    var $item_width = $(".slider_item").width();
    var $control = $("#slider_control");
    var $left = $("#slider_control_left");
    var $right = $("#slider_control_right");
    var $size = $(".slider_item").size();
    var $dots = ( new Array($size + 1) ).join( "<i></i>" );         // dots to insert into $control
    var sliderRoll;
    var MAGINLEFT = "margin-left";

    var rollFunc = function(){
        var mgl = $slider.css("margin-left");
        mgl = parseInt( mgl, 10 );
        var num = - Math.round( mgl / $item_width );        // Math.abs

        if( (num+1) < $size  ){
            $slider.animate({"margin-left":"-=" + $item_width +"px"},500,allUpdate);
            //console.log( "width",$item_width,$slider.css("margin-left"),'num',num,mgl );
        } else {
            $slider.animate({"margin-left":"0px"},'fast',allUpdate);
        }
    };

    var sliderRoll = setInterval( rollFunc,2000 );

    var scrollto = function( direction ){       // scroll to direction
        var mgl = $slider.css("margin-left");
        mgl = parseInt( mgl, 10 );
        var num = - Math.round( mgl / $item_width );        // Math.abs

        if(direction == "left"){
            if( (num+1) < $size  ){
                $slider.animate({"margin-left":"-=" + $item_width +"px"},500,allUpdate);
                //console.log( "width",$item_width,$slider.css("margin-left"),'num',num,mgl );
            } else {
                $slider.animate({"margin-left":"0px"},'fast',allUpdate);
            }
        } else {
            if( num > 0 ){
                $slider.animate({"margin-left":"+=" + $item_width + "px"},500,allUpdate);
            } else {
                $slider.animate({"margin-left":-$item_width * ( $size - 1 ) + "px"},500,allUpdate);
            }
        }
    };

    var updateDots = function(){
        var mgl = $slider.css("margin-left");
        mgl = parseInt( mgl, 10 );
        var num = - Math.round( mgl / $item_width );        // Math.abs
        $control.find("i").removeClass("now");
        $control.find("i:nth("+( num )+")").addClass("now");
    };

    var showDesc = function(){
        var mgl = $slider.css("margin-left");
        mgl = parseInt( mgl, 10 );
        var num = - Math.round( mgl / $item_width );        // Math.abs
        $(".slider_item:not(nth("+num+")) p").each(function(){
            $(this).css({ "bottom":- $(this).height() + "px" });
        });
        $slider.find(".slider_item:nth("+num+") p").animate({"bottom":"0px"},function(){
        });
    }


    var start = function(){     // all initialize
        $control.html( $dots );             //  append dots
        $slider.width( $item_width * ( $size + 1 ) );        // set slider's with large enough to contain all sliders
        $(".slider_item p").css({"bottom":-$(".slider_item p").height()+"px"});
        allUpdate();
    }

    var allUpdate = function(){
        showDesc();
        updateDots();
    }

    start();

    $control.find("i").each(function(index){
        $(this).bind("click hover",function(){
            var mgl = index * $item_width;
            clearInterval( sliderRoll );
            $slider.stop().animate({'margin-left': -mgl+"px"},1000,allUpdate);
        });
    });

    $("#slider,#slider_control_left,#slider_control_right").hover(function(){
        clearInterval( sliderRoll );
    },function(){
        sliderRoll = setInterval( rollFunc,5000 );
    });


    $left.bind("click",function(){
        scrollto("right");
    });

    $right.bind("click",function(){
        scrollto("left");
    });

}()); // closure
