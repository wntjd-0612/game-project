clickElement = null;
mouseX = 0;
mouseY = 0;

originX = 0;
originY = 0;

document.onmouseup = () => {clickElement = null}
document.onmousemove = (e) => {mouseX = e.clientX, mouseY = e.clientY}
document.querySelectorAll("section").forEach(e => {
    e.onmousedown = (k) => {
        clickElement = e;
        originX = k.offsetX;
        originY = k.offsetY;
    }
})





loop = () => {
    if (clickElement){
        console.log(Math.abs(originX - mouseX), Math.abs(originY - mouseY));
        clickElement.style.top  = `${-originY + mouseY+50}px`
        clickElement.style.left = `${-originX + mouseX+50}px`
    }
    requestAnimationFrame(loop)
}
loop()