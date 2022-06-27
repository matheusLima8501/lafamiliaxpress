window.onload = function(){
    document.getElementById('nome').addEventListener('click', cor)
    document.getElementById('email').addEventListener('click', cor)
    document.getElementById('assunto').addEventListener('click', cor)
    document.getElementById('mensagem').addEventListener('click', cor)
    const menuItems = document.querySelectorAll('.menu a[href^="#"]');
    const titulo = document.getElementById("bemVindo")
        typeWrite(titulo)
        typeWriter(document.getElementById('apresentacao'))

        function typeWrite(elemento){
            const textArray = elemento.innerHTML.split('')
            elemento.innerHTML = ''
            textArray.forEach((letra, i) => {
               setTimeout(function(){
                elemento.innerHTML += letra
               }, 100 * i) 
            })
        }

        function typeWriter(elemento){
            const textArray = elemento.innerHTML.split('')
            elemento.innerHTML = ''
            textArray.forEach((letra, i) => {
               setTimeout(function(){
                elemento.innerHTML += letra
               }, 75 * i) 
            })
        }

        const debounce = function(func, wait, immediate) {
            let timeout;
            return function(...args) {
              const context = this;
              const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
              };
              const callNow = immediate && !timeout;
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
              if (callNow) func.apply(context, args);
            };
          };
          
          const target = document.querySelectorAll('[data-anime]');
          const animationClass = 'animate';
          
          function animeScroll() {
            const windowTop = window.pageYOffset + (window.innerHeight * 0.75);
            target.forEach((element) => {
              console.log('i')
              if(windowTop > element.offsetTop) {
                element.classList.add(animationClass);
              } else {
                element.classList.remove(animationClass);
              }
            })
          }
          
          animeScroll();
          
          const handleScroll = debounce(animeScroll, 200);
          
          if(target.length) {
            window.addEventListener('scroll', handleScroll);
          }

    function cor(){
       document.getElementById('nome').style.background = 'rgba(255,255,255,0)'
       document.getElementById('email').style.background = 'rgba(255,255,255,0)'
       document.getElementById('assunto').style.background = 'rgba(255,255,255,0)'
       document.getElementById('mensagem').style.background = 'rgba(255,255,255,0)'
    }

    function getScrollTopByHref(element) {
	    const id = element.getAttribute('href');
	    return document.querySelector(id).offsetTop;
    }

    function scrollToPosition(to) {
        smoothScrollTo(0, to);
    }

    function scrollToIdOnClick(event) {
	    event.preventDefault();
	    const to = getScrollTopByHref(event.currentTarget)- 80;
	    scrollToPosition(to);
    }

    menuItems.forEach(item => {
	    item.addEventListener('click', scrollToIdOnClick);
    });
 
    function smoothScrollTo(endX, endY, duration) {
        const startX = window.scrollX || window.pageXOffset;
        const startY = window.scrollY || window.pageYOffset;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();

        duration = typeof duration !== 'undefined' ? duration : 400;

        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
            return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime;
            const newX = easeInOutQuart(time, startX, distanceX, duration);
            const newY = easeInOutQuart(time, startY, distanceY, duration);
            if (time >= duration) {
                clearInterval(timer);
            }
            window.scroll(newX, newY);
        }, 1000 / 60); // 60 fps
    };
}

