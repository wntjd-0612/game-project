// 클릭한 엘레먼트
clickElement = null;

mouseX = 0;
mouseY = 0;

originX = 0;
originY = 0;

speedX = 0;
speedY = 0;
// 미끄러운 정도
const SLIP = 20
// 튕기는 정도
const BOUNCE = 9.8
// 중력가속도
const GRA = 0.2
//저항
const R = 5


document.onmouseup = () => {
    if (speedY > 2) {
        speedY *= GRA*10;
    }
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
        gravity = Number(e.getAttribute("gravity"))
        vx = x/SLIP;
        vy = y/SLIP;
        gravity += GRA;
        x -= vx;
        y -= vy - gravity;

        e.style.top = `${vy + Number(e.style.top.replace("px", ""))}px`;
        e.style.left = `${vx + Number(e.style.left.replace("px", ""))}px`;
        
        if (Number(e.style.left.replace("px", "")) < 50){
            e.style.left = "50px";
            x = -x*BOUNCE
        }

        if (Number(e.style.left.replace("px", "")) > window.innerWidth-50){
            e.style.left = `${window.innerWidth-50}px`;
            x = -x*BOUNCE
        }

        if (Number(e.style.top.replace("px", "")) < 50){
            e.style.top = "50px";
            y = -y*BOUNCE
        }

        if (Number(e.style.top.replace("px", "")) > window.innerHeight-50){
            e.style.top = `${window.innerHeight-50}px`;
            gravity -= R;
            gravity = gravity < 10? 0: gravity;
            y = -y/R*BOUNCE;
            y = y > -25? 0: y;
            console.log(y)
        }
        e.setAttribute("speed", `${x} ${y}`)
        e.setAttribute("gravity", `${gravity}`)
    })
    if (clickElement){
        n++
        // oldClick: 새로잡았는지 확인
        // n: 일정시간마다 리셋
        if (!oldClick){
            clickElement.setAttribute("gravity", `0`)
        }
        if (n > SLIP | !oldClick){
            nx = clickElement.style.left.replace("px", "");
            ny = clickElement.style.top.replace("px", "");
            n = 0
        }
        speedX = (Number(clickElement.style.left.replace("px", "")) - nx);
        speedY = (Number(clickElement.style.top.replace("px", "")) - ny);
        clickElement.style.top  = `${-originY + mouseY+50}px`
        clickElement.style.left = `${-originX + mouseX+50}px`

        if (Number(clickElement.style.left.replace("px", "")) < 50){clickElement.style.left = "50px"; }
        if (Number(clickElement.style.left.replace("px", "")) > window.innerWidth-50){ clickElement.style.left = `${window.innerWidth-50}px`; }
        if (Number(clickElement.style.top.replace("px", "")) < 50){ clickElement.style.top = "50px"; }
        if (Number(clickElement.style.top.replace("px", "")) > window.innerHeight-50){ clickElement.style.top = `${window.innerHeight-50}px`; }
    }
    oldClick = clickElement
    requestAnimationFrame(loop)
}
loop()
