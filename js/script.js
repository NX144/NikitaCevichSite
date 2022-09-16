"use strict";

// Libs wow.js
new WOW().init();


setTimeout(() => {
    document.querySelector(".overlay__title").classList.add("overlay__title-before");
}, 250);

setTimeout(() => {
    document.querySelector(".overlay").style.height = "0";
    document.querySelector(".overlay").style.opacity = "0";
}, 2600);

document.addEventListener("DOMContentLoaded", function() {

    const mainForm1 = document.querySelector('.contacts__form');

	function postData(form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();

			// Сам AJAX запрос
			const request = new XMLHttpRequest();
			request.open("POST", "./mailer/smart.php");
			// Не нужно устанавливать заголовки для формата XMLHttpRequest + FormData
			// request.setRequestHeader("Content-Type", "multipart/form-data; charset=UTF-8");
			const gtg = new FormData(form);
			request.send(gtg);

			// Взаимодействие с модальным окном
			const modalRequest = document.querySelector('#modal-success'),
				modalRequestInner = document.querySelector('.modal-success__block'),
				modalClose = document.querySelector('.modal-success__block-close');

			modalRequest.style.cssText = "transition: .3s all ease-in-out;";


			let objRequest = {
				ok: {
					title: "Благодарим за заявку!",
					descr: "Скоро с вами свяжется наш менеджер"
				},
				bad: {
					title: "Что-то пошло не так....",
					descr: "Попробуйте ещё раз или напишите в тех.поддержку!"
				}
			};

			class MessRequest {
				constructor(message, classObj) {
					this.message = message;
					this.classObj = classObj;
				}
				render() {
					modalRequest.classList.remove("hide");
					document.body.classList.add('overflow-hidden');
					let requestMessage = document.createElement('div');
					requestMessage.className = this.classObj;
					requestMessage.innerHTML = this.message;
					modalRequestInner.appendChild(requestMessage);
					// if(modalRequestInner.childNodes[3]) {
					//     modalRequestInner.childNodes[3].nextSibling.classList.add("title");
					// }
					// console.log(modalRequestInner.childNodes[2].nextSibling);
					// console.dir(modalRequestInner.childNodes[2].nextSibling);
				}
			}

			function modalCls() {
				modalRequest.classList.add('hide');
				document.body.classList.remove('overflow-hidden');
				let objText = document.querySelector(".modal-success__block");
				while (objText.childNodes.length > 2) {
					objText.removeChild(objText.lastChild);
				}
			}
			modalClose.addEventListener('click', () => {
				modalCls();
			});
			if (modalRequest.classList.contains('hide')) {
				document.querySelector('.modal-success').addEventListener('click', function () {
					modalCls();
				});
			}

			request.addEventListener('load', () => {
				if (request.status === 200 && request.readyState === 4) {
					new MessRequest(objRequest.ok.title, "modal-success__block-title title").render();
					new MessRequest(objRequest.ok.descr, "modal-success__block-descr title").render();
				} else {
					new MessRequest(objRequest.bad.title, "modal-success__block-title title").render();
					new MessRequest(objRequest.bad.descr, "modal-success__block-descr title").render();
				}
			});

			document.querySelectorAll("form input").forEach(item => {
				item.value = "";
			});
			document.querySelectorAll("form textarea").forEach(item => {
				item.value = "";
			});
		});
	}

	postData(mainForm1);

    const menu = document.querySelector(".menu"),
        menuOverlay = document.querySelector(".menu__overlay"),
        burgerMenu = document.querySelector(".hamburger"),
        closeMenu = document.querySelector(".menu__close");

    burgerMenu.addEventListener("click", function(e) {
        menu.classList.add("active");
    });

    function menuClose(objClick, menu) {
        objClick.addEventListener("click", function(e) {
            menu.classList.remove("active");
        });
    }
    menuClose(closeMenu, menu);
    menuClose(menuOverlay, menu);


    const percentNumber = document.querySelectorAll(".skills__progress-percent"),
        progressBar = document.querySelectorAll(".skills__progress-bar");

    percentNumber.forEach((item, i) => {
        progressBar[i].style.width = item.textContent;
    });

    let checkboxTheme = document.querySelector(".theme__control input"),
    sectionsTheme = document.querySelectorAll("section");

    if(localStorage.getItem("dark-theme") == "true") {
        checkboxTheme.checked = true;
        sectionsTheme.forEach(item => {
            item.classList.toggle("dark-mode");
        });
    }

    checkboxTheme.addEventListener('click', () => {
        sectionsTheme.forEach(item => {
            item.classList.toggle("dark-mode");
        });
        localStorage.setItem("dark-theme", checkboxTheme.checked);
    });

    function scrollPage(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const element = document.querySelector(this.getAttribute('href'));
            let rect = element.getBoundingClientRect().top + window.scrollY; 
            //Кол-во пикселей до элемента прибавляем к кол-ву пикселей которые пролистали(там где нажали на ссылку)
            if(screen.width <= "659") { // Проверка на то, есть ли верхний сайтбар(для моб устройств)
                window.scroll({top: rect - 65, behavior: 'smooth'});
            } else {
                window.scroll({top: rect, behavior: 'smooth'});
            }
        });
    }

    document.querySelectorAll('.menu__list li > a').forEach((item) => {
        scrollPage(item);
    });

    let promoText = document.querySelectorAll('.promo__link');
    promoText.forEach((item) =>  {
        scrollPage(item);
    });

    let arrowDown = document.querySelector(".arrow-7"),
        menuList = document.querySelector(".menu");

    scrollPage(arrowDown);

    Hammer(menuList).on('swipeleft', () => {
        menu.classList.remove("active");
        console.log("gf");
    });
});