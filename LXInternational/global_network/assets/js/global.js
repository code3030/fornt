( () => {
    const selectArea = document.querySelectorAll(".selectArea button");
    const allPin = document.querySelectorAll(".branch");
    const map = document.querySelector(".worldmap");
    let device = "pc";

    function page_init() {
        map.style.opacity = 1;
        map.style.transform = "translateY(0)";
        document.querySelector(".selectArea").style.opacity = 1;
        document.querySelector(".guide-icons").style.opacity = 1;

        anime({
            targets: '.branch',
            opacity: [0,1],
            translateY: [-50,0],
            delay: anime.stagger(15),
            duration: 1000,
            easing: 'spring(1, 100, 10, 0)',
        });

        // 최초화면 Korea 상세 팝업 보이도록 수정
        if (window.innerWidth>1024) {
            setTimeout(showKorea, 500);
        }

        function showKorea(){
            document.querySelector("#korea").style.display="block";
            document.querySelector(".branch.korea path").setAttribute("fill","#d2074a");
            document.querySelector(".branch.korea path").setAttribute("fill-opacity","1");
        }
        // end 최초화면 Korea 상세 팝업 보이도록 수정

        if (window.innerWidth > 1024) {
            for (let i=0; i<selectArea.length; i++) {
                selectArea[i].addEventListener("click", changeArea);
            }
        }else if (window.innerWidth <= 1024) {
            device = "m";
                for(let i=0; i<selectArea.length; i++){
                selectArea[i].addEventListener("click", changeArea_m);
            }
        }

        window.addEventListener("resize",function() {
            if (window.innerWidth > 1024 && device == "m") {
                device = "pc";
                for (let i=0; i<selectArea.length; i++) {
                    selectArea[i].addEventListener("click", changeArea);
                }
            } else if (window.innerWidth <= 1024 && device == "pc") {
                device = "m";
                for (let i=0; i<selectArea.length; i++) {
                    selectArea[i].removeEventListener("click", changeArea);
                    selectArea[i].addEventListener("click", changeArea_m);
                }
            }
        })

        for (let i=0; i<allPin.length; i++) {
            allPin[i].addEventListener("click", showBranchPopup);
        }
        
        map.addEventListener("click",resetPin);

        // click branch pin
        function showBranchPopup(e){
            changeArea(this);
        
            let thisPin = this.querySelector("path");
            let popupName = this.classList[2];
        
            thisPin.setAttribute("fill","#d2074a");
        
            document.querySelector("#"+popupName).style.display = "block";
        }

        for(let i=0; i<allPin.length; i++){
            allPin[i].addEventListener("click", showBranchPopup);
        }

        // set area pin & button
        function changeArea(target){
            let areaName;

            if (target.type == "button") {
                areaName = target.getAttribute("data-branch");
            }else{
                areaName = this.getAttribute("data-branch");
            }

            let areaPin = document.querySelectorAll("." + areaName);
            let btn = document.querySelector("#" + areaName);

            resetPin();

            btn.classList.add("on");

            for (let i=0; i<areaPin.length; i++) {
                areaPin[i].querySelector("path").setAttribute("fill-opacity",1);
            }
        }

        function changeArea_m() {
            let parent_ele = this.parentElement;

            if (this.classList.contains("on")) {
                this.classList.remove("on");
                parent_ele.querySelector(".branchList").style.display = "none";
            }else{
                let branch_btn = document.querySelectorAll(".selectArea button");
                let branch = document.querySelectorAll(".branchList");

                for (let i=0; i<branch.length; i++) {
                    branch_btn[i].classList.remove("on");
                    branch[i].style.display = "none";
                }
                this.classList.add("on");
                parent_ele.querySelector(".branchList").style.display = "block";
            }
        }

        // reset pin & button
        function resetPin(){
            let infoAll = document.querySelectorAll(".overseas-branch .branchInfo");
            
            for (let i=0; i<infoAll.length; i++) {
              infoAll[i].style.display = "none";
            }
        
            for (let i=0; i<allPin.length; i++) {
                allPin[i].querySelector("path").setAttribute("fill","#434655");
                allPin[i].querySelector("path").setAttribute("fill-opacity",0.5);
            }
            
            for (let i=0; i<selectArea.length; i++) {
              selectArea[i].classList.remove("on");
            }
          }
    }
    

    window.addEventListener('load', function() {
        page_init();
    });

})();