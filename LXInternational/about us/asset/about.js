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
                flowText: document.querySelectorAll('.flowText span'),
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
                // 1
                sceneInfo[0].objs.navHover.classList.remove('on');
                sceneInfo[1].objs.navHover.classList.add('on');

                sceneInfo[1].objs.navHover.classList.add('on');
                sceneInfo[1].objs.aboutSecTit.classList.add('show');
                sceneInfo[1].objs.imgCeo.classList.add('show');
                sceneInfo[1].objs.greetingBottom.classList.add('show');
                
                if (scrollRatio > 0.2) {
                    objs.imgCeo.classList.remove('show');
                }

                if (scrollRatio > 0.8) {
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
                sceneInfo[1].objs.greetingBottom.classList.add('show');
                sceneInfo[1].objs.greetingInner.classList.add('fadeAni');
                sceneInfo[1].objs.navHover.classList.remove('on');

                sceneInfo[0].objs.navHover.classList.remove('on');
                
                sceneInfo[2].objs.navHover.classList.add('on');

                sceneInfo[2].objs.navHover.classList.add('on');
                sceneInfo[2].objs.aboutSecTit.classList.add('show');
                sceneInfo[2].objs.fixedTab.classList.add('show');

                if (scrollRatio > 0.01) {

                    let posText = sceneInfo[2].objs.flowText;
                    let posTexts = new Array();

                    for (let i = 0; i < posText.length; i++) {
                        posTexts.push(posText[i]);

                        for (let a = 0; a < posTexts.length; a ++) {
                            posTexts[a].style.left = `${leftPos}%`;     
                        }
                    }
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
        setLayout();
    });
    
    window.addEventListener('resize', function() {
        setLayout();
        scrollLoop();
    });

    window.addEventListener('scroll', function() {
        yOffset = window.pageYOffset;

        setLayout();
        scrollLoop();
    });
})();

// let tabMove = $("#section03").offset();
let tabMove = document.querySelector('#section03');

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("history-group");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.opacity = "0";
        tabcontent[i].classList.remove('current');
    }

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" on", "");
    }
    
    document.getElementById(tabName).style.opacity = "1";
    document.getElementById(tabName).classList.add('current');
    evt.currentTarget.className += " on";
}