(() => {
    const gnb = document.querySelector('.gnb');
    const hambug = document.querySelector('.hambugMenu');
    const closeBtn = document.querySelector('.btn-close');
    const menu_hover = document.querySelectorAll(".menu-category");
    const menu_hover_img = document.querySelectorAll(".bgImg .bg");

    // 클래스 캐치
    function _openCatch() {
        const openCatch = document.getElementById('hamBtn').classList.contains('opened');

        if (openCatch == true) {
            $(gnb).css('display', 'block');

            setTimeout(function() {
                $(gnb).addClass('show');
                $('body').css('overflow', 'hidden');
            }, 200);

            setTimeout(function() {
                $(closeBtn).addClass('open');
            }, 500);
            
        } else {
            $(gnb).removeClass('show');

            $('body').css('overflow', 'auto');

            $(closeBtn).removeClass('open');

            setTimeout(function() {
                $(gnb).css('display', 'none');
            }, 500);
        }
    }

    // hambugMenu 클릭 클래스 추가
    function _menuToggle() {
        $(hambug).on('click', function() {
            $(hambug).toggleClass('opened');
            _openCatch()
        });

        $(closeBtn).on('click', function() {
            $(hambug).removeClass('opened');
            _openCatch()
        });
        
    };
    
    // common
    function _common() {
        for ( let i=0; i<menu_hover.length; i++ ){
            menu_hover[i].addEventListener("mouseover",menuHoverImg);
            menu_hover[i].addEventListener("mouseleave",menuRemoveImg);
        }
        function menuHoverImg(){
            menu_hover_img[this.getAttribute("data-idx")-1].style.opacity = 1;
        }
        function menuRemoveImg(){
            menu_hover_img[this.getAttribute("data-idx")-1].style.opacity = 0;
        }
    }

    window.addEventListener('load', () => {
        _menuToggle();
        _common();
    });
    
})();

