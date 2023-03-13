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

    // Получаем ссылки на элементы слайдера
/*     const teamSlider = document.querySelector('.team__slider');
    const teamSlides = document.querySelector('.team__slides');
    const teamSliderBtn = document.querySelector('.team__btn');

    // Устанавливаем начальные значения переменных
    let currentSlide = 0;
    let slideOffset = 0;
    const visibleWidth = teamSlider.offsetWidth;

    // Добавляем обработчик события на кнопку слайдера
    teamSliderBtn.addEventListener('click', function() {
    // Увеличиваем текущий слайд и сдвигаем слайды на видимую область
    currentSlide++;
    slideOffset -= visibleWidth;

    // Если достигнут конец слайдов, переключаемся на первый слайд
    if (currentSlide === teamSlides.children.length) {
        currentSlide = 0;
        slideOffset = 0;
    }

    // Прокручиваем слайды к следующему слайду
    teamSlides.style.transform = `translateX(${slideOffset}px)`;
    }); */

/*     const slideWidth = document.querySelector('.team__slider__person').offsetWidth + 30; // ширина одного слайда + отступ между ними
    const slider = document.querySelector('.team__slides');
    const button = document.querySelector('.team__btn');

    button.addEventListener('click', () => {
    slider.scrollLeft += slideWidth;
    }); */

/*     const teamSlider = document.querySelector('.team__slider');
    const teamSlides = document.querySelector('.team__slides');
    const teamSliderBtn = document.querySelector('.team__btn');
    const slideWidth = teamSlides.children[0].offsetWidth;
    
    let currentSlide = 0;
    let slideOffset = 0;
    const visibleWidth = teamSlider.offsetWidth;
    
    teamSliderBtn.addEventListener('click', function() {
      currentSlide++;
      slideOffset -= slideWidth;
      
      if (currentSlide === teamSlides.children.length - 1) {
        teamSlides.appendChild(teamSlides.children[0]);
        currentSlide = 0;
        slideOffset = 0;
      }
    
      teamSlides.style.transform = `translateX(${slideOffset}px)`;
    }); */

/*     const teamSlider = document.querySelector('.team__slider');
    const teamSlides = document.querySelector('.team__slides');
    const teamSliderBtn = document.querySelector('.team__btn');

    let currentSlide = 0;
    let slideOffset = 0;
    const visibleWidth = teamSlider.offsetWidth;
    const slideWidth = teamSlides.children[0].offsetWidth;

    let slideInterval;

    teamSliderBtn.addEventListener('mousedown', function() {
    slideInterval = setInterval(function() {
        currentSlide++;
        slideOffset -= slideWidth;

        if (currentSlide === teamSlides.children.length) {
        currentSlide = 0;
        slideOffset = 0;
        }

        teamSlides.style.transform = `translateX(${slideOffset}px)`;
    }, 0.1);
    });

    teamSliderBtn.addEventListener('mouseup', function() {
    clearInterval(slideInterval);
    });

    teamSliderBtn.addEventListener('mouseleave', function() {
    clearInterval(slideInterval);
    }); */



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

});
