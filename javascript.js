$(function(){
    var paint=false;
    var erasing=false;//if it is erasing or not
    var mouse={x:0,y:0};
    var background=$("#win");
    var canvas=document.getElementById("win");
    var ctx=canvas.getContext("2d");
    //set initial value of the context
    ctx.lineCap="round";
    $("#erase").click(function(){
        erasing=true;

    });
    $("#slider").slider({
        min:4,
        max:40,
        slide:function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth=ui.value;
        }
    });
    if(localStorage.getItem("Theimage")!=null){
        var img=new Image();
        img.onload=function(){
            ctx.drawImage(img,0,0);
        }
        img.src=localStorage.getItem("Theimage");
    }
    background.mousedown(function(e){
        paint=true;
        ctx.beginPath();
        mouse.x=e.pageX-this.offsetLeft;
        mouse.y=e.pageY-this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
        
    });
    /*in here, e means the current event. */
    background.mouseup(function(e){
        paint=false;  
    });
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint=false;

    });
    $("#paintcolor").change(function(){
        $("#circle").css("background-color",$(this).val());
    });
    /*in here, this means the argument on the funciton */
    $("#save").click(function(){
        localStorage.setItem("Theimage",canvas.toDataURL());
        if(localStorage.getItem("Theimage")==null){
            window.alert("Your browser doesn't support local storage");
        }
    });
    //we clear up the drawing by the clearRect
    /*we start the drawing in this way and e means the event */
    background.mousemove(function(e){
        mouse.x=e.pageX-this.offsetLeft;
        mouse.y=e.pageY-this.offsetTop;
        ctx.lineTo(mouse.x,mouse.y);
        if(paint){
            if(erasing==false)
            {
                ctx.strokeStyle=document.getElementById("paintcolor").value;
            }
            else{
                ctx.strokeStyle="white";
            }
            ctx.stroke();
        }
       
    });
    /*the distance of the (x,y) is recorded by its length minus a new one */
   


});