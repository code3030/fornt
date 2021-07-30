(() => {
    let yOffset;
    let currentScene = 0;
    let prevScrollHeight = 0;

    const sceneInfo = [
        {
            // 0
            scrollHeightOffsetTop: 0,
            scrollHeight: 0,
            objs: {
                containerOffset: document.querySelector('#bread-nav'),
                container: document.querySelector('#section01'),
                pageTitBox: document.querySelector('.page-title-box'),
                navHover: document.querySelector('.navHover:nth-child(1)')
            }
        },
        {
            // 1
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#section02'),
                aboutSecTit: document.querySelector('#section02 .about-sec-tit'),
                navHover: document.querySelector('.navHover:nth-child(2)'),
                greetingInner: document.querySelector('.greeting-inner'),
                imgCeo: document.querySelector('.img-ceo'),
                greetingBottom: document.querySelector('.greeting-bottom')
            }
        },
        {
            // 2
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#section03'),
                navHover: document.querySelector('.navHover:nth-child(3)'),
                aboutSecTit: document.querySelector('#section03 .about-sec-tit'),
                fixedTab: document.querySelector('.fixedTab'),
                flowText: document.querySelector('.flowText span'),
            }
        },
    ]

    function setLayout() {
        // sceneInfo[0]
        let container = sceneInfo[0].objs.container.offsetHeight;
        let containerOffsetTop = sceneInfo[0].objs.containerOffset.offsetTop;
        let containerOffsetHeight = sceneInfo[0].objs.containerOffset.offsetHeight;

        sceneInfo[0].scrollHeight = container + containerOffsetTop + containerOffsetHeight;

        // sceneInfo[1]
        sceneInfo[1].scrollHeight = sceneInfo[1].objs.container.offsetHeight;

        // sceneInfo[2]
        sceneInfo[2].scrollHeight = sceneInfo[2].objs.container.offsetHeight;


        // current active scene
        let totalScrollHeight = 0;

        for (let i = 0; i < sceneInfo.length; i++) {
            
            totalScrollHeight += sceneInfo[i].scrollHeight;

            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }

        }

        sceneInfo[0].objs.containerOffset.classList.add('show');
        sceneInfo[0].objs.pageTitBox.classList.add('show');
    }

    function calcValues(currentYOffset) {
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        const leftPos = 90 - (scrollRatio.toFixed(2) * 1000);

        switch (currentScene) {
            case 0:
                if (scrollRatio > 0.11) {
                    objs.pageTitBox.classList.add('fixed');
                }else{
                    objs.pageTitBox.classList.remove('fixed');
                }
                
                if (scrollRatio > 0.6) {
                    // 1
                    sceneInfo[1].objs.greetingInner.classList.add('fadeAni');
                }else{
                    // 1
                    sceneInfo[1].objs.greetingInner.classList.remove('fadeAni');
                }

                if (scrollRatio > 0.8) {
                    // 0
                    objs.navHover.classList.remove('on');
                    objs.pageTitBox.classList.remove('show');
                    objs.pageTitBox.classList.add('hide');

                    // 1
                    sceneInfo[1].objs.navHover.classList.add('on');
                    sceneInfo[1].objs.aboutSecTit.classList.add('show');
                    sceneInfo[1].objs.imgCeo.classList.add('show');
                    sceneInfo[1].objs.greetingBottom.classList.add('show');
                }else{
                    // 0
                    objs.navHover.classList.add('on');
                    objs.pageTitBox.classList.add('show');
                    objs.pageTitBox.classList.remove('hide');

                    // 1
                    sceneInfo[1].objs.navHover.classList.remove('on');
                    sceneInfo[1].objs.aboutSecTit.classList.remove('show');
                    sceneInfo[1].objs.imgCeo.classList.remove('show');
                    sceneInfo[1].objs.greetingBottom.classList.remove('show');
                }

                break;
                
            case 1:
                if (scrollRatio > 0.2) {
                    objs.imgCeo.classList.remove('show');
                }

                if (scrollRatio > 0.9) {
                    // 1
                    objs.aboutSecTit.classList.remove('show');
                    objs.navHover.classList.remove('on');

                    // 2
                    sceneInfo[2].objs.navHover.classList.add('on');
                    sceneInfo[2].objs.aboutSecTit.classList.add('show');
                    sceneInfo[2].objs.fixedTab.classList.add('show');
                }else{
                    // 1
                    objs.aboutSecTit.classList.add('show');

                    // 2
                    sceneInfo[2].objs.navHover.classList.remove('on');
                    sceneInfo[2].objs.aboutSecTit.classList.remove('show');
                    sceneInfo[2].objs.fixedTab.classList.remove('show');
                }

                break;

            case 2:
                if (scrollRatio > 0.01) {
                    sceneInfo[2].objs.flowText.style.left = `${leftPos}%`;
                }

                break;
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        
        playAnimation();
    };

    window.addEventListener('load', function() {
        setLayout()
    });

    window.addEventListener('resize', function() {
        setLayout();
    });

    window.addEventListener('click', function() {
        let yearTab = document.querySelector(".history_tab .fixedTab");
        let year = yearTab.querySelectorAll(".btn_y");
        let clickIdx = year.length - this.getAttribute("data-idx");
        let currentTab = document.querySelector(".current");
        let currentIdx = currentTab.getAttribute("data-idx");

        console.log(currentIdx)
    });

    window.addEventListener('scroll', function() {
        yOffset = window.pageYOffset;

        setLayout()
        scrollLoop()
    });

})();