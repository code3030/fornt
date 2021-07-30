(() => {
    let scrollOffset;


    function lineNav() {
        if (1167 > scrollOffset) {
            $('.navHover:nth-child(1)').addClass('on');
        }else{
            $('.navHover:nth-child(1)').removeClass('on');
        }
        if (1167 < scrollOffset) {
            $('.navHover:nth-child(2)').addClass('on');
        }else{
            $('.navHover:nth-child(2)').removeClass('on');
        }
        if (2250 < scrollOffset) {
            $('.navHover:nth-child(2)').removeClass('on');
            $('.navHover:nth-child(3)').addClass('on');
        }else{
            $('.navHover:nth-child(3)').removeClass('on');
        }
    }

    function titFixed() {
        if (129 < scrollOffset) {
            $('.page-title-box').addClass('fixed');
        }else{
            $('.page-title-box').removeClass('fixed');
        }

        if (1167 < scrollOffset) {
            $('.page-title-box').removeClass('show');
            $('.page-title-box').addClass('hide');
            $('.ceo-greeting').addClass('show');
            $('.img-ceo').addClass('show');
        }else{
            $('.page-title-box').addClass('show');
            $('.page-title-box').removeClass('hide');
            $('.ceo-greeting').removeClass('show');
            $('.img-ceo').removeClass('show');
        }

        if (1345 < scrollOffset) {
            $('.greeting-bottom').addClass('show');
        }else{
            $('.greeting-bottom').removeClass('show');
        }

        if (1710 < scrollOffset) {
            $('.img-ceo').removeClass('show');
        }

        if (2250 < scrollOffset) {
            $('.ceo-greeting').removeClass('show');
            $('#section03').addClass('show');
        }else{
            $('#section03').removeClass('show');
        }
        
        
    }
    
    


    window.addEventListener('load', function() {
        $('.page-title-box').addClass('show');
        $('.layout-grid-inner').addClass('show');

    });

    window.addEventListener('click', function() {
        $('.subdepth').toggleClass('opened');
    });

    window.addEventListener('scroll', function() {
        scrollOffset = $(document).scrollTop();
        console.log(scrollOffset);

        lineNav()
        titFixed()
    });

})();