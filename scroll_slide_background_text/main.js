(() => {

	let yOffset = 0;
	let currentScene = 0;
	let enterNewScene = false;
	let prevScrollHeight = 0;
	const sceneInfo = [
		{
			// 0
			type: 'normal',
			heightNum: 1,
			scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
		},
		{
			// 1
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-2'),
				slideText: document.querySelector('.content-flow')
            },
			values: {
				slideText_transformX: [0, 100, { start: 0.2, end: 0.8 }]
			}
		},
		{
			// 2
			type: 'normal',
			heightNum: 2,
			scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
		},
	];
	
	function setLayout () {
		// 각 스크롤 섹션의 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;	
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
		}
	}
	
	function calcValues(values, currentYOffset) {
		// 각 섹션마다의 스크롤 비율값(0~1)과 values값 변환
		let rv;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight
		
		if (values.length === 3) {
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;
			
            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if (currentYOffset < partScrollStart) {
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}
		
		return rv;
	}

	function scrollLoop() {
		enterNewScene = false;
		let prevScrollHeight = 0;

		for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
		
		if (yOffset + 10 > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			enterNewScene = true;
			currentScene++;
		}

		if (yOffset + 10 < prevScrollHeight || yOffset + 10 == prevScrollHeight) {
			enterNewScene = true;
			if (currentScene === 0) return;
			currentScene--;
		}

		if (enterNewScene) return;

		function playAnimation() {
			const obj = sceneInfo[currentScene].objs;
			const values = sceneInfo[currentScene].values;
			const currentYOffset = yOffset - prevScrollHeight;
			const scrollHeight = sceneInfo[currentScene].scrollHeight;
			const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight;

			switch (currentScene) {
				case 0:
					sceneInfo[1].objs.container.classList.remove('sticky');
					break;
				case 1:
					// console.log('1play')
					let slideText_transformX_in = calcValues(values.slideText_transformX, currentYOffset);
					
					obj.container.classList.add('sticky');
					sceneInfo[1].objs.container.style.marginTop = 0;

					obj.slideText.style.transform = `translate3d(-${slideText_transformX_in}%, 0, 0)`;
					if (scrollRatio <= 15) {
						
					}
					
					break;
				case 2:
					sceneInfo[1].objs.container.classList.remove('sticky');
					sceneInfo[1].objs.container.style.marginTop = `${sceneInfo[1].scrollHeight}px`;
					break;
			}

		}playAnimation()
	};

	window.addEventListener('resize',setLayout);
	window.addEventListener('load',setLayout);

	window.addEventListener('scroll', () => {
		yOffset = window.pageYOffset;
		scrollLoop();
	});

})();



