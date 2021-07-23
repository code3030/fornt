( () => {
    let yOffset = 0;
    let currentScene = 0;
    let enterNewScene = false;
    let deleayedYOffset = 0;
    let acc = 0.1;
    let rafId;
    let moveTo = 0;

    const sceneInfo = [
        {
            type: 'normal',
            heightNum: 1,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('.main-section01') 
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('.main-section02'),
                scrollBarCon: document.querySelector('.horizontal-scrollBar'),
                scrollBar: document.querySelector('.main-section02 .scrollBar-thumb'),
                mainScrollCon: document.querySelector('.main-hscroll'),

                mainSliderBox_A: document.querySelector('.item01'),
                mainSliderBox_B: document.querySelector('.item02'),
                mainSliderBox_C: document.querySelector('.item03'),
                mainSliderBox_D: document.querySelector('.item04'),
                mainSliderBox_E: document.querySelector('.item05'),
                mainSliderBox_F: document.querySelector('.item06'),

                mainScrollTit_A: document.querySelector('.item01 .tit'),
                mainScrollTit_B: document.querySelector('.item02 .tit'),
                mainScrollTit_C: document.querySelector('.item03 .tit'),
                mainScrollTit_D: document.querySelector('.item04 .tit'),
                mainScrollTit_E: document.querySelector('.item05 .tit'),
                mainScrollTit_F: document.querySelector('.item06 .tit'),
            },
            values: {

                
            }
        }
    ]

    // 섹션 높이 설정
    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;

        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        } 
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function playAnimation() {
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight; 
        const scrollRatio = currentYOffset / scrollHeight;
        
        // console.log(scrollRatio)

        switch (currentScene) {
            case 0:
                break;

            case 1:
                scrollBar(scrollRatio);
                mainSlider(scrollRatio);
                drag(scrollHeight);
                break;
        }
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        deleayedYOffset = deleayedYOffset + (yOffset - deleayedYOffset);
        
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (deleayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene ++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (deleayedYOffset < prevScrollHeight) {
            if (currentScene === 0) return;
            enterNewScene = true;
            currentScene --;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        } 

        if (enterNewScene) return;

        playAnimation();
    }

    function mainSlider(scrollRatio) {
        const sliderWrap = sceneInfo[currentScene].objs;
        const sliderWrapWidth = $(sliderWrap.mainScrollCon).width();
        const sliderPx = (2850 / 0.8) * -scrollRatio;
        const sliderTxtPx = (80 / 0.8) * -scrollRatio;
        const sliderBoxPy = (100 / 0.8) * -scrollRatio;
        const sliderBoxPyB = (100 / 0.8) * scrollRatio;

        sliderWrap.mainScrollCon.style.transform = `translate3d(${sliderPx}px, 0, 0)`;

        sliderWrap.mainSliderBox_A.style.transform = `translate3d(0, ${sliderBoxPy}%, 0)`;
        sliderWrap.mainSliderBox_B.style.transform = `translate3d(0, ${sliderBoxPyB}%, 0)`;
        sliderWrap.mainSliderBox_C.style.transform = `translate3d(0, ${sliderBoxPy}%, 0)`;
        sliderWrap.mainSliderBox_D.style.transform = `translate3d(0, ${sliderBoxPyB}%, 0)`;
        sliderWrap.mainSliderBox_E.style.transform = `translate3d(0, ${sliderBoxPy}%, 0)`;
        sliderWrap.mainSliderBox_F.style.transform = `translate3d(0, ${sliderBoxPyB}%, 0)`;
        console.log(scrollRatio)

        if (scrollRatio >= 0.22) {
            
        }

        sliderWrap.mainScrollTit_A.style.transform = `translate3d(${sliderTxtPx}px, 0, 0)`;
        sliderWrap.mainScrollTit_B.style.transform = `translate3d(${sliderTxtPx}px, 0, 0)`;
        sliderWrap.mainScrollTit_C.style.transform = `translate3d(${sliderTxtPx}px, 0, 0)`;
        sliderWrap.mainScrollTit_D.style.transform = `translate3d(${sliderTxtPx}px, 0, 0)`;
        sliderWrap.mainScrollTit_E.style.transform = `translate3d(${sliderTxtPx}px, 0, 0)`;
        sliderWrap.mainScrollTit_F.style.transform = `translate3d(${sliderTxtPx}px, 0, 0)`;
    }

    function scrollBar(scrollRatio) {
        const scrollObj = sceneInfo[currentScene].objs.scrollBar;
        const percent = (scrollRatio * 100) * 0.75;
        
        scrollObj.style.left = `${percent}%`;
    }
    
    function drag(scrollHeight) {
        let currentS = sceneInfo[currentScene].objs;
        let scrollBarCon = currentS.scrollBarCon;
        let scrollBarWidth = $(scrollBarCon).width();

        $('.ui-draggable').draggable({
            axis: 'x',
            containment: 'parent',
            drag: function (event, ui) {
                scrollbar_percent =  ui.position.left * ((prevScrollHeight - scrollHeight) / (scrollBarWidth * 0.4 - scrollBarWidth)) + prevScrollHeight
                $(window).scrollTop(scrollbar_percent);
            }
        })
    }

    

    window.addEventListener('resize', setLayout);

    window.addEventListener('load', () => {
        setLayout();
    });

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

})();