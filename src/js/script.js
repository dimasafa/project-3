'use strict';

window.addEventListener('DOMContentLoaded', function(){
    // hamburger menu

    const hamburger = document.querySelector('.Intero__hamburger');
    const hamMenu = document.querySelectorAll('.Intero__mobile__mobileItem');
    const parentMobMenu = document.querySelector('.Intero__mobile');
    const menuClose = document.querySelector('.Intero__mobile__kreuz');
    const overlay = document.querySelector('.Intero__overlay');

    function closeMenu() {
        parentMobMenu.style.display = 'none';
        overlay.style.display = 'none';
    }

    function openMenu() {
        parentMobMenu.style.display = 'block';
        overlay.style.display = 'block';
        
    }

    hamburger.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);

    parentMobMenu.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('Intero__mobile__mobileItem')) {
            hamMenu.forEach((item) => {
                if(target === item) {
                    closeMenu();
                }
            });
        }
    });

    // Time

    const officeTime = document.querySelector('.Intero__bottomLine__time');

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        if (hours.toString().length === 1) {
            hours = '0' + hours.toString();
        }
        if (minutes.toString().length === 1) {
            minutes = '0' + minutes.toString();
        }
        if (seconds.toString().length === 1) {
            seconds = '0' + seconds.toString();
        }


        officeTime.innerHTML = `Office time ${hours}:${minutes}:${seconds}`;
    }

        setInterval(updateClock, 1000);
        updateClock();

    // Wetter API

    // Функция для получения данных о погоде через API
    function getWeatherData(city, apiKey) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = {
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            };
            return weatherData;
        });
    }
    
    // Вызов функции для получения данных о погоде и отображения их на странице
    const apiKey = 'dc479f74e2f408ade12574d3477d6a6c';
    const city = 'Bochum';
    
    getWeatherData(city, apiKey)
        .then(weatherData => {
        const temperatureElement = document.querySelector('#temperature');
        const descriptionElement = document.querySelector('#description');
        const iconElement = document.querySelector('#icon');

        temperatureElement.innerHTML = `${Math.floor(weatherData.temperature)} &deg;C`;
        descriptionElement.innerHTML = weatherData.description;
        iconElement.setAttribute('src', `https://openweathermap.org/img/w/${weatherData.icon}.png`);
        })
        .catch(error => console.error(error));

    const wetterButton = document.querySelector('.Intero__weatherBtn');
    const wetterButtonColor = document.querySelector('.Intero__weatherBtn__knopf');
    const wetterCity = document.querySelector('.Intero__weather__city');
    const wetterTemp = document.querySelector('.Intero__weather__temperatur');
    const wetterDescr = document.querySelector('.Intero__weather__description');
    const wetterIcon = document.querySelector('.Intero__weather__icon');

    function showWether() {
        wetterCity.style.display = 'block';
        wetterTemp.style.display = 'block';
        wetterDescr.style.display = 'block';
        wetterIcon.style.display = 'inline-block';
        wetterButtonColor.style.backgroundColor = '#367848';
    }

    function closeWeather() {
        wetterCity.style.display = 'none';
        wetterTemp.style.display = 'none';
        wetterDescr.style.display = 'none';
        wetterIcon.style.display = 'none';
        wetterButtonColor.style.backgroundColor = '';
    }

    wetterButton.addEventListener('click', function() {
        if (wetterCity.style.display === 'block') {
          closeWeather();
        } else {
          showWether();
        }
      });

    // modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const close = document.querySelector('[data-close]');

    const modal = document.querySelector('.modal');

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
    }

    close.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });

    //slider

    const teamSlider = document.querySelector('.team__slider');
    const teamSlides = document.querySelector('.team__slides');
    const teamSliderBtn = document.querySelector('.team__btn');

    // Устанавливаем начальные значения переменных
    let currentSlide = 0;
    let slideOffset = 0;
    const visibleWidth = teamSlider.offsetWidth;
    const slideWidth = teamSlides.children[0].offsetWidth;

    // Создаем копии первого и последнего слайда
    const firstSlideCopy = teamSlides.children[0].cloneNode(true);
    const lastSlideCopy = teamSlides.children[teamSlides.children.length - 1].cloneNode(true);

    // Добавляем копии первого и последнего слайда в начало и конец слайдера соответственно
    teamSlides.insertBefore(lastSlideCopy, teamSlides.children[0]);
    teamSlides.appendChild(firstSlideCopy);

    // Добавляем обработчики событий на кнопку слайдера
    teamSliderBtn.addEventListener('mousedown', function() {
        // Запускаем анимацию прокрутки слайдов
        const scrollInterval = setInterval(function() {
            slideOffset -= 10;

            // Если достигнут конец слайдов, переключаемся на первый слайд
            if (slideOffset < -(currentSlide + 1) * slideWidth) {
                currentSlide++;

                // Если достигнут конец копий слайдов, переключаемся на первый слайд
                if (currentSlide === teamSlides.children.length - 2) {
                    currentSlide = 0;
                    slideOffset = 0;
                }
            }

            // Прокручиваем слайды к следующему слайду
            teamSlides.style.transform = `translateX(${slideOffset}px)`;
        }, 10);

        // Останавливаем анимацию прокрутки слайдов при отпускании кнопки
        teamSliderBtn.addEventListener('mouseup', function() {
            clearInterval(scrollInterval);
        });
    });


    // video

    const videoPlayer = document.querySelector('.video__box__video__player');
    const playButton = document.querySelector('.video__btn');

    // Add event listener to the play button
    playButton.addEventListener('click', () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playButton.style.display = 'none';
    } 
    });

    // Dark/Light

    const darkStyle = document.querySelector('.Intero__style__dark');
    const lightStyle = document.querySelector('.Intero__style__white');
    
    const about = document.getElementById('about');
    const weText = document.querySelector('.we__textBox__text-links');
    const weText1 = document.querySelector('.we__textBox__centerBox__header');
    const weText2 = document.querySelector('.we__textBox__centerBox__text');
    const weText3 = document.querySelector('.we__textBox__centerBox__zahlbox__erklarung-1');
    const weText4 = document.querySelector('.we__textBox__centerBox__zahlbox__erklarung-2');
    const weText5 = document.querySelector('.we__textBox__centerBox__zahlbox__erklarung-3');

    const services = document.getElementById('services');
    const servicesText = document.querySelector('.services__boxOne__header');
    const servicesText1 = document.querySelector('.services__boxOne__subheader');
    const servicesText2 = document.querySelector('.services__boxOne__text');
    const servicesText3 = document.querySelector('.services__boxTwo__Text1');
    const servicesText4 = document.querySelector('.services__boxTwo__Text2');
    const servicesText5 = document.querySelector('.services__boxTwo__Text3');

    const projects = document.getElementById('projects');
    const projectsText = document.querySelector('.projects__header');
    const projectsText1 = document.querySelector('.projects__gridBox__miniGridBox__content__text-1');
    const projectsText2 = document.querySelector('.projects__gridBox__miniGridBox__content__text-2');
    const projectsText3 = document.querySelector('.projects__gridBox__miniGridBox__content__text-3');
    const projectsText4 = document.querySelector('.projects__gridBox__miniGridBox__content__text-4');
    const projectsText5 = document.querySelector('.projects__gridBox__miniGridBox__content__text-5');
    const projectsText6 = document.querySelector('.projects__gridBox__miniGridBox__content__text-6');
    const projectsText7 = document.querySelector('.projects__gridBox__miniGridBox__content__text-7');

    const steps = document.getElementById('steps');
    const stepsText = document.querySelector('.work__header');
    const stepsText1 = document.querySelector('.work__gridBox__miniBox');
    const stepsText2 = document.querySelector('.work__gridBox__miniBox__board-1');
    const stepsText3 = document.querySelector('.work__gridBox__miniBox__board-2');
    const stepsText4 = document.querySelector('.work__gridBox__miniBox__board-3');

    const team = document.getElementById('team');
    const teamText = document.querySelector('.team__header');
    const teamText1 = document.querySelector('.team__slider__person__name-1');
    const teamText2 = document.querySelector('.team__slider__person__name-2');
    const teamText3 = document.querySelector('.team__slider__person__name-3');
    const teamText4 = document.querySelector('.team__slider__person__name-4');

    const video = document.getElementById('video');
    const videoText = document.querySelector('.video__box__header');

    const contacts = document.getElementById('contacts');
    const contactsText = document.querySelector('.forma__header');
    const contactsText1 = document.querySelector('.forma__wrapper__linksText');
    const contactsText2 = document.querySelector('.forma__wrapper__mainForma__forma-1');
    const contactsText3 = document.querySelector('.forma__wrapper__mainForma__forma-2');
    const contactsText4 = document.querySelector('.forma__wrapper__mainForma__forma-3');
    const contactsText5 = document.querySelector('.forma__wrapper__mainForma__btn__submit');
    const contactsText6 = document.querySelector('.forma__wrapper__mainForma__btn__reset');

    const bottom = document.getElementById('bottom');
    const bottomText = document.querySelector('.bottom__firstBox__mitte__header');
    const bottomText1 = document.querySelector('.bottom__firstBox__mitte__email');
    const bottomText2 = document.querySelector('.bottom__firstBox__ende__text-1');
    const bottomText3 = document.querySelector('.bottom__firstBox__ende__text-2');
    const bottomText4 = document.querySelector('.bottom__firstBox__ende__text-3');
    const bottomText5 = document.querySelector('.bottom__firstBox__ende__text-4');
    const bottomText6 = document.querySelector('.bottom__firstBox__ende__text-5');
    const bottomText7 = document.querySelector('.bottom__firstBox__ende__text-6');
    const bottomText8 = document.querySelector('.bottom__secondBox__left');
    const bottomText9 = document.querySelector('.bottom__secondBox__center__text-1');
    const bottomText10 = document.querySelector('.bottom__secondBox__center__text-2');
    const bottomText11 = document.querySelector('.bottom__secondBox__center__text-3');
    const bottomText12 = document.querySelector('.bottom__secondBox__center__text-4');
    const bottomicon = document.querySelector('.bottom__secondBox__ende');
    


    // Проверяем, сохранено ли значение в localStorage
    const savedStyle = localStorage.getItem('style');
    if (savedStyle === 'light') {
    // Если значение 'light', применяем стили светлой темы
    lightStyle.style.borderColor = 'orangered';
    darkStyle.style.borderColor = '#000';
    weText.style.color = '#131D29';
    weText1.style.color = '#131D29';
    weText2.style.color = '#131D29';
    weText3.style.color = '#131D29';
    weText4.style.color = '#131D29';
    weText5.style.color = '#131D29';
    about.style.backgroundColor = '#F7F7F7';
    services.style.backgroundColor = '#F7F7F7';
    servicesText.style.color = '#131D29';
    servicesText1.style.color = '#131D29';
    servicesText2.style.color = '#131D29';
    servicesText3.style.color = '#131D29';
    servicesText4.style.color = '#131D29';
    servicesText5.style.color = '#131D29';
    projects.style.backgroundColor = '#F7F7F7';
    projectsText.style.color = '#131D29';
    projectsText1.style.color = '#131D29';
    projectsText2.style.color = '#131D29';
    projectsText3.style.color = '#131D29';
    projectsText4.style.color = '#131D29';
    projectsText5.style.color = '#131D29';
    projectsText6.style.color = '#131D29';
    projectsText7.style.color = '#131D29';
    steps.style.backgroundColor = '#F7F7F7';
    stepsText.style.color = '#131D29';
    stepsText1.style.color = '#131D29';
    stepsText2.style.color = '#131D29';
    stepsText3.style.color = '#131D29';
    stepsText4.style.color = '#131D29';
    team.style.backgroundColor = '#F7F7F7';
    teamText.style.color = '#131D29';
    teamText1.style.color = '#131D29';
    teamText2.style.color = '#131D29';
    teamText3.style.color = '#131D29';
    teamText4.style.color = '#131D29';
    video.style.backgroundColor = '#F7F7F7';
    videoText.style.color = '#131D29';
    contacts.style.backgroundColor = '#F7F7F7';
    contactsText.style.color = '#131D29';
    contactsText1.style.color = '#131D29';
    contactsText2.style.backgroundColor = '#F7F7F7';
    contactsText3.style.backgroundColor = '#F7F7F7';
    contactsText4.style.backgroundColor = '#F7F7F7';
    contactsText5.style.backgroundColor = '#F7F7F7';
    contactsText5.style.color = '#131D29';
    contactsText6.style.backgroundColor = '#F7F7F7';
    contactsText6.style.color = '#131D29';
    bottom.style.backgroundColor = '#F7F7F7';
    bottomText.style.color = '#131D29';
    bottomText1.style.color = '#131D29';
    bottomText2.style.color = '#131D29';
    bottomText3.style.color = '#131D29';
    bottomText4.style.color = '#131D29';
    bottomText5.style.color = '#131D29';
    bottomText6.style.color = '#131D29';
    bottomText7.style.color = '#131D29';
    bottomText8.style.color = '#131D29';
    bottomText9.style.color = '#131D29';
    bottomText10.style.color = '#131D29';
    bottomText11.style.color = '#131D29';
    bottomText12.style.color = '#131D29';
    bottomicon.style.display = 'none';

    } else {
    // Если значение не 'light', применяем стили темной темы
    lightStyle.style.borderColor = '#fff';
    darkStyle.style.borderColor = '#367848';
    weText.style.color = '#F7F7F7';
    weText1.style.color = '#F7F7F7';
    weText2.style.color = '#F7F7F7';
    weText3.style.color = '#F7F7F7';
    weText4.style.color = '#F7F7F7';
    weText5.style.color = '#F7F7F7';
    about.style.backgroundColor = '#131D29';
    services.style.backgroundColor = '#131D29';
    servicesText.style.color = '#F7F7F7';
    servicesText1.style.color = '#F7F7F7';
    servicesText2.style.color = '#F7F7F7';
    servicesText3.style.color = '#F7F7F7';
    servicesText4.style.color = '#F7F7F7';
    servicesText5.style.color = '#F7F7F7';
    projects.style.backgroundColor = '#131D29';
    projectsText.style.color = '#F7F7F7';
    projectsText1.style.color = '#F7F7F7';
    projectsText2.style.color = '#F7F7F7';
    projectsText3.style.color = '#F7F7F7';
    projectsText4.style.color = '#F7F7F7';
    projectsText5.style.color = '#F7F7F7';
    projectsText6.style.color = '#F7F7F7';
    projectsText7.style.color = '#F7F7F7';
    steps.style.backgroundColor = '#131D29';
    stepsText.style.color = '#F7F7F7';
    stepsText1.style.color = '#F7F7F7';
    stepsText2.style.color = '#F7F7F7';
    stepsText3.style.color = '#F7F7F7';
    stepsText4.style.color = '#F7F7F7';
    team.style.backgroundColor = '#131D29';
    teamText.style.color = '#F7F7F7';
    teamText1.style.color = '#F7F7F7';
    teamText2.style.color = '#F7F7F7';
    teamText3.style.color = '#F7F7F7';
    teamText4.style.color = '#F7F7F7';
    video.style.backgroundColor = '#131D29';
    videoText.style.color = '#F7F7F7';
    contacts.style.backgroundColor = '#131D29';
    contactsText.style.color = '#F7F7F7';
    contactsText1.style.color = '#F7F7F7';
    contactsText2.style.backgroundColor = '#131D29';
    contactsText3.style.backgroundColor = '#131D29';
    contactsText4.style.backgroundColor = '#131D29';
    contactsText5.style.backgroundColor = '#131D29';
    contactsText5.style.color = '#F7F7F7';
    contactsText6.style.backgroundColor = '#131D29';
    contactsText6.style.color = '#F7F7F7';

    bottom.style.backgroundColor = '#131D29';
    bottomText.style.color = '#F7F7F7';
    bottomText1.style.color = '#F7F7F7';
    bottomText2.style.color = '#F7F7F7';
    bottomText3.style.color = '#F7F7F7';
    bottomText4.style.color = '#F7F7F7';
    bottomText5.style.color = '#F7F7F7';
    bottomText6.style.color = '#F7F7F7';
    bottomText7.style.color = '#F7F7F7';
    bottomText8.style.color = '#F7F7F7';
    bottomText9.style.color = '#F7F7F7';
    bottomText10.style.color = '#F7F7F7';
    bottomText11.style.color = '#F7F7F7';
    bottomText12.style.color = '#F7F7F7';
    bottomicon.style.display = 'flex';
    }

    // Обработчик событий для кнопки светлой темы
    lightStyle.addEventListener('click', () => {
    localStorage.setItem('style', 'light');

    lightStyle.style.borderColor = 'orangered';
    darkStyle.style.borderColor = '#000';

    weText.style.color = '#131D29';
    weText1.style.color = '#131D29';
    weText2.style.color = '#131D29';
    weText3.style.color = '#131D29';
    weText4.style.color = '#131D29';
    weText5.style.color = '#131D29';
    about.style.backgroundColor = '#F7F7F7';

    services.style.backgroundColor = '#F7F7F7';
    servicesText.style.color = '#131D29';
    servicesText1.style.color = '#131D29';
    servicesText2.style.color = '#131D29';
    servicesText3.style.color = '#131D29';
    servicesText4.style.color = '#131D29';
    servicesText5.style.color = '#131D29';

    projects.style.backgroundColor = '#F7F7F7';
    projectsText.style.color = '#131D29';
    projectsText1.style.color = '#131D29';
    projectsText2.style.color = '#131D29';
    projectsText3.style.color = '#131D29';
    projectsText4.style.color = '#131D29';
    projectsText5.style.color = '#131D29';
    projectsText6.style.color = '#131D29';
    projectsText7.style.color = '#131D29';

    steps.style.backgroundColor = '#F7F7F7';
    stepsText.style.color = '#131D29';
    stepsText1.style.color = '#131D29';
    stepsText2.style.color = '#131D29';
    stepsText3.style.color = '#131D29';
    stepsText4.style.color = '#131D29';

    team.style.backgroundColor = '#F7F7F7';
    teamText.style.color = '#131D29';
    teamText1.style.color = '#131D29';
    teamText2.style.color = '#131D29';
    teamText3.style.color = '#131D29';
    teamText4.style.color = '#131D29';

    video.style.backgroundColor = '#F7F7F7';
    videoText.style.color = '#131D29';

    contacts.style.backgroundColor = '#F7F7F7';
    contactsText.style.color = '#131D29';
    contactsText1.style.color = '#131D29';
    contactsText2.style.backgroundColor = '#F7F7F7';
    contactsText3.style.backgroundColor = '#F7F7F7';
    contactsText4.style.backgroundColor = '#F7F7F7';
    contactsText5.style.backgroundColor = '#F7F7F7';
    contactsText5.style.color = '#131D29';
    contactsText6.style.backgroundColor = '#F7F7F7';
    contactsText6.style.color = '#131D29';

    bottom.style.backgroundColor = '#F7F7F7';
    bottomText.style.color = '#131D29';
    bottomText1.style.color = '#131D29';
    bottomText2.style.color = '#131D29';
    bottomText3.style.color = '#131D29';
    bottomText4.style.color = '#131D29';
    bottomText5.style.color = '#131D29';
    bottomText6.style.color = '#131D29';
    bottomText7.style.color = '#131D29';
    bottomText8.style.color = '#131D29';
    bottomText9.style.color = '#131D29';
    bottomText10.style.color = '#131D29';
    bottomText11.style.color = '#131D29';
    bottomText12.style.color = '#131D29';
    bottomicon.style.display = 'none';
    });

    // Обработчик событий для кнопки темной темы
    darkStyle.addEventListener('click', () => {
    localStorage.removeItem('style');

    lightStyle.style.borderColor = '#fff';
    darkStyle.style.borderColor = '#367848';

    weText.style.color = '#F7F7F7';
    weText1.style.color = '#F7F7F7';
    weText2.style.color = '#F7F7F7';
    weText3.style.color = '#F7F7F7';
    weText4.style.color = '#F7F7F7';
    weText5.style.color = '#F7F7F7';
    about.style.backgroundColor = '#131D29';

    services.style.backgroundColor = '#131D29';
    servicesText.style.color = '#F7F7F7';
    servicesText1.style.color = '#F7F7F7';
    servicesText2.style.color = '#F7F7F7';
    servicesText3.style.color = '#F7F7F7';
    servicesText4.style.color = '#F7F7F7';
    servicesText5.style.color = '#F7F7F7';

    projects.style.backgroundColor = '#131D29';
    projectsText.style.color = '#F7F7F7';
    projectsText1.style.color = '#F7F7F7';
    projectsText2.style.color = '#F7F7F7';
    projectsText3.style.color = '#F7F7F7';
    projectsText4.style.color = '#F7F7F7';
    projectsText5.style.color = '#F7F7F7';
    projectsText6.style.color = '#F7F7F7';
    projectsText7.style.color = '#F7F7F7';

    steps.style.backgroundColor = '#131D29';
    stepsText.style.color = '#F7F7F7';
    stepsText1.style.color = '#F7F7F7';
    stepsText2.style.color = '#F7F7F7';
    stepsText3.style.color = '#F7F7F7';
    stepsText4.style.color = '#F7F7F7';

    team.style.backgroundColor = '#131D29';
    teamText.style.color = '#F7F7F7';
    teamText1.style.color = '#F7F7F7';
    teamText2.style.color = '#F7F7F7';
    teamText3.style.color = '#F7F7F7';
    teamText4.style.color = '#F7F7F7';

    video.style.backgroundColor = '#131D29';
    videoText.style.color = '#F7F7F7';

    contacts.style.backgroundColor = '#131D29';
    contactsText.style.color = '#F7F7F7';
    contactsText1.style.color = '#F7F7F7';
    contactsText2.style.backgroundColor = '#131D29';
    contactsText3.style.backgroundColor = '#131D29';
    contactsText4.style.backgroundColor = '#131D29';
    contactsText5.style.backgroundColor = '#131D29';
    contactsText5.style.color = '#F7F7F7';
    contactsText6.style.backgroundColor = '#131D29';
    contactsText6.style.color = '#F7F7F7';

    bottom.style.backgroundColor = '#131D29';
    bottomText.style.color = '#F7F7F7';
    bottomText1.style.color = '#F7F7F7';
    bottomText2.style.color = '#F7F7F7';
    bottomText3.style.color = '#F7F7F7';
    bottomText4.style.color = '#F7F7F7';
    bottomText5.style.color = '#F7F7F7';
    bottomText6.style.color = '#F7F7F7';
    bottomText7.style.color = '#F7F7F7';
    bottomText8.style.color = '#F7F7F7';
    bottomText9.style.color = '#F7F7F7';
    bottomText10.style.color = '#F7F7F7';
    bottomText11.style.color = '#F7F7F7';
    bottomText12.style.color = '#F7F7F7';
    bottomicon.style.display = 'flex';
    });

    contactsText5.addEventListener('mouseover', () => {
        contactsText5.style.background = '#367848';
        if (contacts.style.backgroundColor !== '#131D29') {
            contactsText5.style.color = '#F7F7F7';
        }
      });

    contactsText6.addEventListener('mouseover', () => {
        contactsText6.style.background = '#367848';
        if (contacts.style.backgroundColor !== '#131D29') {
            contactsText6.style.color = '#F7F7F7';
            }
    });

    contactsText5.addEventListener('mouseout', () => {
        if (lightStyle.style.borderColor !== 'orangered') {
            contactsText5.style.background = '#131D29';

        } else if (lightStyle.style.borderColor === 'orangered'){
            contactsText5.style.background = '#F7F7F7';
        }

        if (lightStyle.style.borderColor === 'orangered') {
            contactsText5.style.color = '#131D29';
        } else if (lightStyle.style.borderColor !== 'orangered') {
            contactsText5.style.color = '#F7F7F7';
        }
      });

      contactsText6.addEventListener('mouseout', () => {
        if (lightStyle.style.borderColor !== 'orangered') {
            contactsText6.style.background = '#131D29';

        } else if (lightStyle.style.borderColor === 'orangered'){
            contactsText6.style.background = '#F7F7F7';
        }

        if (lightStyle.style.borderColor === 'orangered') {
            contactsText6.style.color = '#131D29';
        } else if (lightStyle.style.borderColor !== 'orangered') {
            contactsText6.style.color = '#F7F7F7';
        }
      });
    

          //acync await mit json-server

    const forms = document.querySelectorAll('form');
    const resetForm = document.getElementById('reset');

    const message = {
        loading: 'loading...',
        success: 'alles ok!',
        failure: 'Etwas schief gegangen'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                statusMessage.textContent = message.success;
                statusMessage.remove();
            }).catch (() => {
                statusMessage.textContent = message.failure;
            }).finally (() => {
                form.reset();
            });
        });
    }
    
    resetForm.addEventListener('click', () => {
        const inputAll = document.querySelectorAll('.forma__wrapper__mainForma__forma input');
        for (let i = 0; i < inputAll.length; i++) {
            if (inputAll[i].type == "name" || inputAll[i].type == "email" || inputAll[i].type == "text") {
                inputAll[i].value = "";
            }
        }
    });


    
});
