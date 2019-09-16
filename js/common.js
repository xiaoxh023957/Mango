$(function(){
	// 页面加载动画
	$(window).load(function(){
		setTimeout(function(){
			$("#c-loadBox").fadeOut();
		},1000);
	});

	// 等高
	$('.c-dg').matchHeight();

	// 导航
	nav();
	function nav(){
		var oBody = $("body");
		var oHd = $("#c-header");
		var oNm = $("#c-header .c-navMask");
		var oNav = $("#c-header .c-nav");
		var oBtn = $("#c-header .c-switch");
		var oL = $("#c-header .c-nav li");
		var oA = $("#c-header .c-nav2 a");

		// 移动端导航开关
		oBtn.click(function(){
			oHd.toggleClass('c-open');
			// 菜单遮罩
			oNm.stop().fadeToggle();
		});

		// 窗口改变菜单隐藏
		$(window).resize(function(){
			oHd.removeClass("c-open");
			oNm.stop().fadeOut();
		});

		//移动端子菜单控制
		oA.click(function(){
			$(this).next().stop().slideToggle();
		});

		//滚动后头部导航颜色变化
		$(window).scroll(function(){
			if ($(this).scrollTop()>0) {
				oBody.addClass("c-scroll");
			}else{
				oBody.removeClass("c-scroll");
			}
		});



	}

	// 顶部搜索
	showcSearch();
	function showcSearch(){
		var oS = $("#c-header .c-gongneng .c-search");
		var oF = $("#c-header .c-gongneng .c-search .c-form");

		oS.click(function(ev){
			ev.stopPropagation();
			oF.stop().fadeToggle();
		})

		$(window).click(function(){
			oF.stop().fadeOut();
		});

		oF.click(function(ev) {
			ev.stopPropagation();
		});
	}

	// 轮播
	$(document).ready(function () {
		// 首页轮播
		var mySwiper = new Swiper ('#c-banner', {
			loop: true, // 循环模式选项
			autoplay: true,
			speed:500,
			autoplay: {
				delay: 4000,//4秒切换一次
			},
			// 如果需要分页器
			pagination: {
			  el: '.swiper-pagination',
			  clickable: true, //点击分页器切换
			},

			// 如果需要前进后退按钮
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},
		    on:{
		      init: function(){
		        swiperAnimateCache(this); //隐藏动画元素 
		        swiperAnimate(this); //初始化完成开始动画
		      }, 
		      slideChangeTransitionEnd: function(){ 
		        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
		        //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
		      } 
		    }
		});

		// 优势轮播
		var mySwiper = new Swiper ('#c-banner2', {
			effect : 'coverflow',
			slidesPerView: 3,
			spaceBetween : 30,
			centeredSlides: true,
			loop: true, // 循环模式选项
			speed:600,
			// 如果需要分页器
			pagination: {
			  el: '.swiper-pagination',
			  clickable: true, //点击分页器切换
			},

			// 如果需要前进后退按钮
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},
			breakpoints: { 
			  //当宽度小于等于992
			  992: { 
			    slidesPerView: 2,
			    spaceBetween : 0
			  },
			  //当宽度小于等于500
			  500: {
			    slidesPerView: 1,
			    spaceBetween : 0
			  }
			}

		}) 
	})


	// 底部链接
	footerLink();
	function footerLink(){
		var oBtn = $("#c-footer #c-footer-top .c-titleBox");
		oBtn.click(function(){
			if($(window).width()<768){
				$(this).next().stop().slideToggle();
			}
		});
		$(window).resize(function(){
			if($(window).width()>767){
				oBtn.next().stop().slideDown();
			}
		});
	}

	// 分类菜单
	menuOption($(".c-menu1"));
	function menuOption(obj,obj2){
		obj.each(function(){
			var oText = $(this).find(".c-text");
			var oTextP = $(this).find(".c-text p");
			var oList = $(this).find(".c-list");
			var aLi = $(this).find(".c-list li");

			aLi.each(function(){
				// 获取带active的li标签的子级a标签的值设为选中框中的值
				if ($(this).hasClass("c-active")) {
					$(this).children("ul").stop().slideDown();
					oTextP.html($(this).children("a").html());
				}

				// 屏幕小于768，点击li标签下拉框回缩
				$(this).click(function(e){
					e.stopPropagation();
					if ($(window).outerWidth()<768 && $(this).find("ul").length<1) {
						oText.removeClass("c-open");
						oList.stop().slideUp();
					}
					$(this).toggleClass('c-open');
					$(this).children("ul").stop().slideDown();
				});
			});

			// 点击选中框，下拉框动画
			oText.click(function(e){
				e.stopPropagation();
				$(this).toggleClass('c-open');
				oList.stop().slideToggle();
			});

			// 屏幕小于768，点击页面下拉框回缩
			$(window).click(function(){
				if ($(window).outerWidth()<768) {
					oText.removeClass("c-open");
					oList.stop().slideUp();
				}
			});

			// 窗口重置动画
			$(window).resize(function(){
				if ($(window).outerWidth()>767) {
					oText.addClass("c-open");
					oList.slideDown();
				}else{
					oText.removeClass("c-open");
					oList.slideUp();
				}
			});

		});
	}

	// 侧边栏回到顶部
	goTop();
	function goTop(){
		var aTop = $("#c-goTop");
		aTop.click(function(){
			$('html,body').animate({scrollTop:0});
		});
		$(window).scroll(function(){
			var i = $(this).scrollTop();
			if (i > $(this).height()) {
				aTop.fadeIn();
			}else{
				aTop.fadeOut();
			}
		});
	}

	// 微信咨询二维码弹窗
	weixin();
	function weixin() {
		var w = $("#c-weixin");
		var m = $("#c-wMask");
		var b = m.find(".c-box");
		w.click(function(){
			m.stop().fadeIn();
		});
		m.click(function(){
			m.stop().fadeOut();
		});
		b.click(function(ev){
			ev.stopPropagation();
		});
	}

	// 人才招聘
	talent();
	function talent(){
		var aT = $("#c-talent .c-list .c-tBox");
		aT.eq(0).next().stop().slideDown();
		aT.eq(0).parent().addClass("c-active");
		aT.click(function(){
			$(this).next().stop().slideToggle();
			$(this).parent().toggleClass("c-active");
		});
	}


});


// 页面进入动画
(function($) {
	function wow() {
		var t = .1,
			e = !0,
			wow = new WOW({
				boxClass: "wow",
				animateClass: "animated",
				offset: 0,
				callback: function(e) {
					(e = $(e)).css("animation-delay", t.toFixed(1) + "s"),
					t += .1;
				}
			});
			$(window).scroll(function() {
				e && (t = .2, setTimeout(function() {
					e = !0
				}, 150), e = !1)
			}),
			wow.init();
	}
	$(window).load(function(){
		setTimeout(function(){
			wow();
		},1300);
	});
}(jQuery));


