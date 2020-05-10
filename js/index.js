// проверка email
function isEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}



$(document).ready(function () {
    if($('.more__services').length && !$('.services__blog .load_more').length  ) {
        $('.more__services').addClass('no__more');
    }
    createSticky($(".menu_in"));
    $(document).on('click', '.load_more', function(){
        var targetContainer = $('.search__block, .blog__content-inner, .review__more, .services__blog'),          //  Контейнер, в котором хранятся элементы
            url =  $('.load_more').attr('data-url');    //  URL, из которого будем брать элементы

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    //  Удаляем старую навигацию
                    $('.search__block .pag, .blog__content-inner .pag, .review__more .pag, .services__blog .pag, .blogPage .blog__block .pag').remove();
                    var elements = $(data).find('.search__block .blog__item, .blog__content-inner .blog__item, .review__more .blog__item, .services__blog .blog__item'),  //  Ищем элементы
                        pagination = $(data).find('.search__block .pag, .blog__content-inner .pag, .blog__item .pag, .review__more .pag, .services__blog .pag');//  Ищем навигацию
                    targetContainer.append(elements);   //  Добавляем посты в конец контейнера
                    console.log(elements);
                    targetContainer.append(pagination); //  добавляем навигацию следом
                    if($('.blog__more, .more__services, .more_otzivi, .blog__more').length) {
                        if(!$('.load_more').length) {
                            $('.blog__more, .more__services, .blog__more').addClass('no__more');
                        }
                    }
                }
            })
        }
    });
     // слайдер отзывов
     mySwiper = new Swiper('.blog__block_part', {
        // effect: 'fade',
        speed: 400,
        spaceBetween: 50,
        slidesPerView: 3,
        watchSlidesProgress: true,
        variableWidth: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        on: {
            slideChangeTransitionStart: function (swiper) {
                console.log(this);
            },
            slideChangeTransitionEnd: function () {
                console.log(this);
            },
        },
        breakpoints: {
            530: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            900: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });

    $('.blog__more:not(.no__more), .more__services').on('click', function (e) {
        e.preventDefault();
        $('.load_more').click();
        if(!$('.load_more').length) {
         //   $('.more_otzivi').addClass('no__more');
            $('.more__services').addClass('no__more');
        }
    })
    $('body').on('click', '.more_otzivi', function (e) {
        e.preventDefault();

        if($(this).text().length > 6) {
            $('.more_otzivi').text('Скрыть');
            $('.more_otzivi').addClass('no_more');
            $('.load_more').click();
        } else {
            $('.more_otzivi').text('Показать больше отзывов');
            $('.center_content').load(window.location.href + ' .center_content');
            $('.more_otzivi').removeClass('no_more');
        }
    })

    $('.more__filters').on('click', function (e) {
        e.preventDefault();
        $('.hide__filters').toggle();
        if($(this).text().length > 6) {
            $('.more__filters').text('Скрыть');
        } else {
            $('.more__filters').text('Показать ещё фильтры');
        }
    })
    $('.blog__tabs-item a').on('click', function (e) {
        e.preventDefault();
        if($(this).attr('data-section-id')) {
            $('.blog__item').hide();
            $('.blog__tabs-item').removeClass('active');
            $(this).parents('.blog__tabs-item').addClass('active');
            $('.blog__item[data-section-id="'+$(this).attr('data-section-id')+'"]').show();
        } else {
            $('.blog__item').show();
            $('.blog__tabs-item').removeClass('active');
            $('.blog__tabs-item').first().addClass('active');
        }
    })
    // faq открываем
    $(".menu_top_wp ul li").click(function(e){
        $('.menu_top_wp ul li').removeClass('acitve');
        $(this).toggleClass('acitve');
    });

    $('.phone').mask('0 (000) 000-00-00');
    // $('.detail__block_photos ul').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     fade: true,
    //     // asNavFor: '.slider_one_nav'
    // });
    //home__slider_height();
    $(window).resize(function () {
        //home__slider_height();
    })
    // открытие меню
    $(document).on('click', '.menu_top', function(e) {
        e.preventDefault();
        $('.menu_block').toggleClass('active');
        $('body').addClass('overflow__mobile');
        $('.slider__home_item').toggleClass('menu');
    });
    // этот метод отключен
    $(document).on('click', '.more_otzivi_OLD', function(e) {
        e.preventDefault();
        $('.shows__otzivi').toggleClass('active');
        $('html, body').animate({
            scrollTop: $('.shows__otzivi').offset().top
        }, 2000);
    });
    // устанавливаем полоску левую нижнюю
    // $('.slider__social').height();
    //
    // $('.slider__home_item .container.active').height(); //all
    //подбор форма
    $("#podbor__auto .btns").click(function(e){
        e.preventDefault();
        var self = $(this);
        var stop;
        var btns = $(this).attr('data-btn');
        var consult_name = $(this).parents('.popup__container').find('[name="consult_name"]').val();
        var consult_phone = $(this).parents('.popup__container').find('[name="consult_number"]').val();
        var page = $(this).parents('.popup__container').find('[name="consult_page"]').val();
        var phone = $(this).parents('.popup__container').find("#consult_number").val();
        var title = $('.fancybox-container .popup__container_title').text();
        var captcha_code = $(this).parents('.popup__container').find("#captcha_code").val();
        var captcha_word = $(this).parents('.popup__container').find("#captcha_word").val();
        var _this = $(this);
        if(consult_phone.length < 16 ) {
            $(this).parents('.popup__container').find('input[name="consult_number"]').addClass('error');
            stop = 'stop';
        } else {
            $(this).parents('.popup__container').find('input[name="consult_number"]').removeClass('error');
        }
        $(this).parents('.popup__container').find(".popup__container_footer").removeClass('error');
        if(stop == 'stop') return;
        $.ajax({
            type: "GET",
            url: '/ajax/podbor_redesign.php',
                data: $("#filtId").serialize()+"&otvet="+btns+"&page="+page+"&name="+consult_name+"&phone="+consult_phone+"&captcha_word="+captcha_word+"&captcha_code="+captcha_code+"&title="+title,
            success: function(html){
                //$("#ContOZ").html("");
                if($.trim(html) == 'ok') {
                    $('.popup__container_form_wp input[type="text"], .popup__container_form_wp textarea').val('');
                    $.fancybox.close();
                    $.fancybox.open('<div class="message"><p><h2>Ваше сообщение отправлено</h2><br>В ближайшее время с Вами свяжется наш менеджер!</p></div>');
                    $('#filtId')[0].reset();
                }  else if($.trim(html) == 'Неверно введен код') {
                    //$("#ContOZ").html(html);
                }
            }
        });
    });
    // получить бесплатную консультацию
    $(".popup__container.fancybox-content:not(#ostavit_otziv):not(#podbor__auto) .btns").click(function(e){
        e.preventDefault();
        var self = $(this);
        var stop;
        var btns = $(this).attr('data-btn');
        var consult_name = $(this).parents('.popup__container').find('[name="consult_name"]').val();
        var consult_phone = $(this).parents('.popup__container').find('[name="consult_number"]').val();
        var consult_email  = $(this).parents('.popup__container').find('[name="consult_email"]').val();
        var consult_question = $(this).parents('.popup__container').find('[name="consult_question"]').val();
        var page = $(this).parents('.popup__container').find('[name="consult_page"]').val();
        var phone = $(this).parents('.popup__container').find("#consult_number").val();
        var title = $('.fancybox-container .popup__container_title').text();
        var captcha_code = $(this).parents('.popup__container').find("#captcha_code").val();
        var captcha_word = $(this).parents('.popup__container').find("#captcha_word").val();
        var _this = $(this);
        if(consult_phone.length < 16 ) {
            $(this).parents('.popup__container').find('input[name="consult_number"]').addClass('error');
            stop = 'stop';
        } else {
            $(this).parents('.popup__container').find('input[name="consult_number"]').removeClass('error');
        }
        if(isEmail(consult_email)) {
            $(this).parents('.popup__container').find('input[name="consult_email"]').removeClass('error');
        } else {
            $(this).parents('.popup__container').find('input[name="consult_email"]').addClass('error');
            stop = 'stop';
        }
        $(this).parents('.popup__container').find(".popup__container_footer").removeClass('error');
        if(stop == 'stop') return;
        $.ajax({
            type: "GET",
            url: '/ajax/free_consult.php',
            data: "otvet="+btns+"&page="+page+"&name="+consult_name+"&phone="+consult_phone+"&captcha_word="+captcha_word+"&captcha_code="+captcha_code+"&email="+consult_email+"&question="+consult_question+"&title="+title,
            success: function(html){
                //$("#ContOZ").html("");
                if($.trim(html) == 'ok') {
                    $('.popup__container_form_wp input[type="text"], .popup__container_form_wp textarea').val('');
                    $.fancybox.close();
                    $.fancybox.open('<div class="message"><p><h2>Ваше сообщение отправлено</h2><br>В ближайшее время с Вами свяжется наш менеджер!</p></div>');
                }  else if($.trim(html) == 'Неверно введен код') {
                    //$("#ContOZ").html(html);
                }
            }
        });
    });
    $("#ostavit_otziv .btns").click(function(e){
        e.preventDefault();
        var self = $(this);
        var stop;
        var btns = $(this).attr('data-btn');
        var consult_name = $(this).parents('.popup__container').find('[name="consult_name"]').val();
        var consult_phone = $(this).parents('.popup__container').find('[name="consult_number"]').val();
        var consult_email  = $(this).parents('.popup__container').find('[name="consult_email"]').val();
        var consult_question = $(this).parents('.popup__container').find('[name="consult_question"]').val();
        var page = $(this).parents('.popup__container').find('[name="consult_page"]').val();
        var phone = $(this).parents('.popup__container').find("#consult_number").val();
        var service = $(this).parents('.popup__container').find('[name="service"]').val();
        var captcha_code = $(this).parents('.popup__container').find("#captcha_code").val();
        var captcha_word = $(this).parents('.popup__container').find("#captcha_word").val();
        var _this = $(this);
        if(!consult_name) {
            $(this).parents('.popup__container').find('input[name="consult_name"]').addClass('error');
            stop = 'stop';
        } else {
            $(this).parents('.popup__container').find('input[name="consult_name"]').removeClass('error');
        }
        if(!consult_phone) {
            $(this).parents('.popup__container').find('input[name="consult_number"]').addClass('error');
            stop = 'stop';
        } else {
            $(this).parents('.popup__container').find('input[name="consult_number"]').removeClass('error');
        }
        if(!consult_question) {
            $(this).parents('.popup__container').find('textarea[name="consult_question"]').addClass('error');
            stop = 'stop';
        } else {
            $(this).parents('.popup__container').find('textarea[name="consult_question"]').removeClass('error');
        }
        $(this).parents('.popup__container').find(".popup__container_footer").removeClass('error');
        if(stop == 'stop') return;
        $.ajax({
            type: "GET",
            url: "/ajax/save_review.php",
            data: "otvet="+btns+"&page="+page+"&name="+consult_name+"&phone="+consult_phone+"&captcha_word="+captcha_word+"&captcha_code="+captcha_code+"&email="+consult_email+"&question="+consult_question+"&service="+service,
            success: function(html){
                //$("#ContOZ").html("");
                if($.trim(html) == 'ok') {
                    $('.popup__container_form_wp input[type="text"], .popup__container_form_wp textarea').val('');
                    $.fancybox.close();
                    $.fancybox.open('<div class="message"><p><h2>Ваш отзыв принят. Спасибо!</h2><br>После проверки модератором он будет опубликован.</p></div>');
                }  else if($.trim(html) == 'Неверно введен код') {
                    //$("#ContOZ").html(html);
                }
            }
        });
    });
    // закрытие меню
    $(document).on('click', '.menu_block .menu_close', function(e) {
        e.preventDefault();
        $('.menu_block').toggleClass('active');
        $('body').removeClass('overflow__mobile');
        $('.slider__home_item').toggleClass('menu');
    });
    // открытие блока вопросов
    $(document).on('click', '.faq_btn', function(e) {
        e.preventDefault();
        $('.faq_block').toggleClass('active');
        $('.menu_top_list li').removeClass('acitve');
    });
    // закрытие блока вопросов
    $(document).on('click', '.faq_block .menu_close', function(e) {
        e.preventDefault();
        $('.faq_block').toggleClass('active');
    });
    $('.blog__sections_btn').on('click', function (e) {
        e.preventDefault();
        $('.blog__sections').toggleClass("open");
    })
    $(document).on('click','.blog__sections.open li:not(.blog__sections_btn) a', function (e) {
        e.preventDefault();
        $('.blog__sections').removeClass('open');
    })
    // слайдер web
    // $(document).on('click', '.detail__block_photos li:not(.more__btn) a', function(e) {
    //     e.preventDefault();
    //     console.log( $(this).attr('data-big'));
    //     $('.detail__block_photos li a').removeClass('active');
    //     $(this).addClass('active');
    //     $('.detail__block_main img').attr('src', $(this).find('img').attr('data-big'));
    // });
    // наведение на слайдер
    $(document).on('mouseover', '.detail__block_photos li:not(.more__btn) a', function(e) {
        e.preventDefault();
        $('.detail__block_photos li a').removeClass('active');
        $(this).addClass('active');
        $('.detail__block_main img').attr('src', $(this).find('img').attr('data-big'));
    });
    jQuery('.detail__block_photos.show__mobile').swipe({
            swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
                if (phase == "start") {
                    // сработает в начале swipe
                }
                if (phase == "end") {
                    //сработает через 20 пикселей то число которое выбрали в threshold
                    if (direction == 'left') {
                        //сработает при движении влево
                        $('.detail__block_photos.show__mobile.hide__www ul').append($('.detail__block_photos.show__mobile.hide__www ul li').first());
                    }
                    if (direction == 'right') {
                        //сработает при движении вправо
                        $('.detail__block_photos.show__mobile.hide__www ul').prepend($('.detail__block_photos.show__mobile.hide__www ul li').last());
                    }
                    if (direction == 'up') {
                        //сработает при движении вверх
                    }
                    if (direction == 'down') {
                        //сработает при движении вниз
                    }
                }
            },
            triggerOnTouchEnd: true,
            threshold: 20 // сработает через 20 пикселей
        }
         );

    //map();
    // header
    $(window).scroll(function(){
        var sticky = $('.block-header'),
            scroll = $(window).scrollTop();
        if (scroll >= 100) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
    });
    // burger
    $(document).on('click','.burger', function () {
        $('.menu').toggleClass('show');
        $('body').toggleClass('hidden');
    });


})
function home__slider_height() {
    $('body').css('min-height', $(window).height());
    $('html').css('min-height', $(window).height());
    $('#site').css('min-height', $(window).height());
    $('.slider__home').css('min-height', $(window).height());
    $('.slider__home_items').css('min-height', $(window).height());
    $('.slider__home_item').css('min-height', $(window).height());
    $('.slider__home_item .container').css('min-height', $(window).height() - 0); //
    $('.slider__home__items').css('min-height', $(window).height() - 95); //155
    $('.slider__home_item_text').css('min-height', $(window).height() - 155);
    //$('.main__block').css('min-height', $(window).height() - 155);
    // menu main center content
    $('.menu__inner_wp').css('marginTop', $('.menu__inner_wp').css('marginTop', (($('.menu_block').height() -  ($('.menu__inner_wp').height() ) ) - 80) / 2));
}
function createSticky(sticky) {
    if (typeof sticky !== "undefined") {
        var	pos = sticky.offset().top + 20,
            win = $(window);
        win.on("scroll", function() {
            win.scrollTop() >= pos ? sticky.addClass("fixed") : sticky.removeClass("fixed");
        });
    }
}
