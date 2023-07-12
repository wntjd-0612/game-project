// 클릭한 엘레먼트
clickElement = null;

mouseX = 0;
mouseY = 0;

originX = 0;
originY = 0;

speedX = 0;
speedY = 0;
// 미끄러운 정도
const SLIP = 10

document.onmouseup = () => {
    clickElement.setAttribute("speed", `${speedX} ${speedY}`)
    clickElement = null;
}
document.onmousemove = (e) => {mouseX = e.clientX, mouseY = e.clientY}
document.querySelectorAll("section").forEach(e => {
    e.onmousedown = (k) => {
        e.setAttribute("speed", `0 0`)
        clickElement = e;
        originX = k.offsetX;
        originY = k.offsetY;
    }
})

n = 0
nx = 0
ny = 0
oldClick = true;
loop = () => {
    document.querySelectorAll("section").forEach(e => {
        x = Number(e.getAttribute("speed").split(" ")[0])
        y = Number(e.getAttribute("speed").split(" ")[1])
        vx = x/SLIP;
        vy = y/SLIP;
        x -= vx;
        y -= vy;
        e.style.top = `${vy + Number(e.style.top.replace("px", ""))}px`;
        e.style.left = `${vx + Number(e.style.left.replace("px", ""))}px`;
        
        e.setAttribute("speed", `${x} ${y}`)
    })
    if (clickElement){
        n++
        // oldClick: 새로잡았는지 확인
        // n: 일정시간마다 리셋
        if (n > SLIP | !oldClick){
            nx = clickElement.style.left.replace("px", "");
            ny = clickElement.style.top.replace("px", "");
            n = 0
        }
        speedX = (Number(clickElement.style.left.replace("px", "")) - nx);
        speedY = (Number(clickElement.style.top.replace("px", "")) - ny);
        console.log(speedX, speedY)
        clickElement.style.top  = `${-originY + mouseY+50}px`
        clickElement.style.left = `${-originX + mouseX+50}px`
    }
    oldClick = clickElement
    requestAnimationFrame(loop)
}
loop()