window.addEventListener("load", () => {

    const hero = document.querySelector(".hero");

    hero.style.opacity = "0";

    setTimeout(() => {

        hero.style.transition = "1s";
        hero.style.opacity = "1";

    }, 200);

    // CAMISETA FLUTUANDO

    const camiseta =
    document.querySelector(".camiseta");

    let position = 0;
    let direction = 1;

    setInterval(() => {

        position += direction * 0.5;

        camiseta.style.transform =
        `translateY(${position}px)`;

        if(position > 10){
            direction = -1;
        }

        if(position < -10){
            direction = 1;
        }

    }, 30);

});
