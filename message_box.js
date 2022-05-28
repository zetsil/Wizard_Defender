export default class MessageBox{

    constructor(message)
    {
     this.type = "message";
     this.message = message;
     this.show = true;
    }


    startMessage()
    {
      var g = document.createElement('div');
      g.setAttribute("id", "myPopup");
      var popup = document.getElementById("myPopup");
      popup.style.animation = 'none';
      popup.innerHTML = String(this.message);
      popup.classList.toggle("show");
     // popup.style.opacity = (popup.style.opacity == 1) ? 0 : 1;   
      setTimeout(function(){
        popup.style.animation = '';
        popup.classList.toggle("hide");
    },7000);
    }


}