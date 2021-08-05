(() => {
    const card = $('.card-list > li');

    function init() {
        anime({
            targets: '.card-list li',
            opacity: [0,1],
            translateY: [50,0],
            easing: "easeOutExpo",
            duration: 1500,
            delay: anime.stagger(100)
        }); 
    }

    card.mouseenter(function(e) {
        let mX = e.pageX;
        let mY = e.pageY;
        let obj = this;

        mouseUpdateIn(obj, mX, mY);
    });
    card.mouseleave(function(e) {
        let mX = e.pageX;
        let mY = e.pageY;
        let obj = this;

        mouseUpdateOut(obj, mX, mY);
    });

    // in
    function mouseUpdateIn(obj, mX, mY) {
        let objHeight = obj.clientHeight + 2;
        let objWidth = obj.clientWidth;
        let objOffsetTop = $(obj).offset().top;
        let objOffsetLeft = $(obj).offset().left;
        let objHeightStart = mY - (objOffsetTop - 3);
        let objHeightEnd = objOffsetTop + objHeight - 25;
        let objWidthStart = mX - objOffsetLeft +1.5;
        let objWidthEnd = objOffsetLeft + objWidth - 25;

        resetOutClass(obj);

        if (20 > objHeightStart) {
            obj.classList.add('in-top');
        } else if (objHeightEnd < mY) {
            obj.classList.add('in-bottom');
        } else if (20 > objWidthStart) {
            obj.classList.add('in-left');
        } else if (objWidthEnd < mX) {
            obj.classList.add('in-right');
        }
    }

    // out
    function mouseUpdateOut(obj, mX, mY) {
        let objHeight = obj.clientHeight + 2;
        let objWidth = obj.clientWidth;
        let objOffsetTop = $(obj).offset().top;
        let objOffsetLeft = $(obj).offset().left;
        let objHeightStart = mY - (objOffsetTop - 3);
        let objHeightEnd = objOffsetTop + objHeight - 15;
        let objWidthStart = mX - objOffsetLeft +1.5;
        let objWidthEnd = objOffsetLeft + objWidth - 15;

        resetInClass(obj);
        
        if (10 > objHeightStart) {
            obj.classList.add('out-top');
        } else if (objHeightEnd < mY) {
            obj.classList.add('out-bottom');
        } else if (10 > objWidthStart) {
            obj.classList.add('out-left');
        } else if (objWidthEnd < mX) {
            obj.classList.add('out-right');
        }
    }
    
    function resetInClass(obj) {
        $(obj).removeClass('in-top');
        $(obj).removeClass('in-right');
        $(obj).removeClass('in-bottom');
        $(obj).removeClass('in-left');
        console.log('out')
    }

    function resetOutClass(obj) {
        $(obj).removeClass('out-top');
        $(obj).removeClass('out-right');
        $(obj).removeClass('out-bottom');
        $(obj).removeClass('out-left');
    }

    window.addEventListener('load', function() {
        init() 
    })
})();
