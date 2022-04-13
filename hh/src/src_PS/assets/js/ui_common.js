$(function () {
	$(document).on ('click','a',function(e){
		var $href = $(this).attr('href');
		if($href == '#' || $href == '#none'){
			e.preventDefault();
		}
	});

	pageCommon();  //page header setting

	if($('#wrap').hasClass('exclude')) {
		// pc 전용메뉴 페이지
		$('html').addClass('win');
	} else {
		deviceCheck();
	}
	
	range();
	insCheckActive();
	Dialog.init();	
	$.fn.tab();
	$.fn.accordion();
	$.fn.slickSlider();	
	$.fn.datePicker();
	$.fn.inputDel();
	$.fn.toggle();
	$('.hintInfo').uiToolTip();
	sidePop.sideSet();
	topButton();
	$.fn.breadcrumbsFixed();
	$.fn.asideFixed();
	
	// 2022.01.13
	$.fn.PsGnbNav();
	
	// 퇴직연금일 경우
	if($('body').attr('data-category') == 'ps'){
		$.fn.GnbNavPS();
		$('#aside').remove();
	}
});

$(document).ready(function() {
	if(!isMobile) {
		if ($('.scrollbar').length > 0) {
			$('.scrollbar').mCustomScrollbar({
				advanced:{
					autoScrollOnFocus:true,
					updateOnContentResize:true
				}
			});
		}

		if ($('.horizon_scrollbar').length > 0) {
			$('.horizon_scrollbar').mCustomScrollbar({
				horizontalScroll:true,
				advanced:{
					autoScrollOnFocus:true,
					updateOnContentResize:true
				}
			});
		}

		

		if ($('.horizon_scrollbar_xy').length > 0) {
			$('.horizon_scrollbar_xy').mCustomScrollbar({
				axis: "yx",
				setWidth:'auto',
				setHeight:'200',
				setTop:0,
				setLeft:0
			});
		}
	} else {
		if( $(".tel_number").length > 0) {
			$('.tel_number').each(function(){
				var tel = $(this).text();
				$(this).contents().unwrap().wrap('<a href="tel:' + tel + '" class="tel_number"></a>')
			});
		}
	}

	xScrInfo();
});

var mbHeader = { title: '', tooltip: false, prev: true, menu: true };
var pageCommon = function() {

	/*(".header_home").load("../inc/header.html", function() {
		$.fn.GnbNav();
	});
	*/
	
	// if($('.breadcrumbs_wrap').length) {
	if($('.breadcrumbs_wrap:empty').length) {
		$('.breadcrumbs_wrap').load('../inc/breadcrumbs.html', function() {
			$.fn.dropMenu('.breadcrumbs>ul>li.d1>a', '.breadcrumbs>ul>li>.sub>ul>li>a');
			$.fn.zoomInOut();

			$('.breadcrumbs_opt .b_search').on('click', function (e){
				e.preventDefault();
				totalSearch.open();
			});
			
			$('#totalSearch .btn_close').on('click', function (e){
				e.preventDefault();
				totalSearch.close();
			});

			$('.breadcrumbs_opt .b_menu').on('click', function (e){
				e.preventDefault();
				allMenu.open();
			});
			
			$('.menu_list_wrap .btn_close').on('click', function (e){
				e.preventDefault();
				allMenu.close();
			});

		});
	}

	$('.breadcrumbs_opt .b_menu').on('click', function (e){
		e.preventDefault();
		allMenu.open();
	});

	$('.menu_list_wrap .btn_close').on('click', function (e){
		e.preventDefault();
		allMenu.close();
	});

	
}


// 퇴직연금 GNB
$.fn.GnbNavPS = function() {
	var menu = $('.gnb>ul'),
		bg = $('.gnb_bg');
	var $menuParentH = $('.gnb').outerHeight();
		menuH = menu.outerHeight()
	//	menuLink = menu.find('a').outerHeight(true);
	// var $menuHeight = menuH - menuLink;

	menu.find('>li').on('mouseover focusin', function (e){
		$(this).addClass('over');
	}).on('mouseout focusout', function(e) {
		$(this).removeClass('over');
	});

	menu.on('mouseover focusin', function (e){
		var $subMenu = $(this).find('.sub_menu');
		var heightArry = [];

		$(this).addClass('open');
		$subMenu.each(function(e) {
			heightArry.push($(this).outerHeight());
		});
		heightArry.sort(function(a, b) {return b-a;});
	
		bg.css({'height':heightArry[0] + 40}).parent().closest('#header').addClass('show');
		$(this).css({'height':heightArry[0] + 40});	
	}).on('mouseout focusout', function (e){ 
		$(this).removeClass('open');
		bg.removeAttr('style').closest('#header').removeClass('show');
		$(this).css({'height':$menuParentH});
	});
};

// 퇴직연금 GNB - 2022.01.13
$.fn.PsGnbNav = function() {
	var menu = $('.gnb > ul'),
	gnbSub = $('.header_gnb > .gnb_sub');

	menu.find('li').on('mouseover focusin', function() {
		$(this).addClass('over');
	}).on('mouseout focusout', function() {
		$(this).removeClass('over');
	});
	
	menu.on('mouseover focusin', function() {
		gnbSub.addClass('show');
	}).on('mouseout focusout', function() {
		gnbSub.removeClass('show');
	});
	
	gnbSub.on('mouseover focusin', function(e) {
		var $target = $(e.target),
			tClass = !!$target.attr('class') ? $target.attr('class').indexOf('part') > -1 ? $target.closest('dd').attr('class') : $target.attr('class')
					: $target.closest('dd').attr('class'),
			tIdx = !!Number(tClass.substr(tClass.length-1, 1)) ? Number(tClass.substr(tClass.length-1, 1)) : '';
		
		if (!!tIdx) {
			menu.find('li').eq(tIdx-1).addClass('over');
		}
	
		$(this).addClass('show');
	
		if (tClass.indexOf('gnb_sub') > -1) {
			$(this).removeClass('show');
			menu.find('li').removeClass('over');
		}
	}).on('mouseout focusout', function() {
		$(this).removeClass('show');
		menu.find('li').removeClass('over');
	});
};

var sidePop = {
	OutCont:'#skipNavi,#header h1,#container,#footer',
	sideSet:function(){
		if($('.assure_wrap').length){
			$('.assure_wrap').each(function(){
				if(isMobile) $('#sidePopUI').attr('aria-hidden',true);

				var $checkInp = '.assure_list input';

				$($checkInp).each(function(){
					if($(this).siblings('.btn_blank').length && !$(this).prop('checked')){
						// $(this).attr({'tabindex':-1,'aria-hidden':true});
					}
				});

				$('.btn_blank').on('click', function(e){
					// 2021.08.04 수정 - dialog open에 대한 case 추가
					if (!!!$(this).hasClass('dialog_open')) {
						e.preventDefault();
						if(isMobile) {
							$(this).addClass('open');	
							if($('#sidePopUI').hasClass('show')){
								sidePop.sideClose();
							}else{
								sidePop.sideOpen();
							}
						} else {
							$('.btn_blank').removeClass('open');
							$(this).addClass('open');	
							$('.before_view').hide();
							$('#sidePopUI').show();
							$('#sidePopUI').attr('tabindex',0).focus();
						}
					}
				});

				$(document).on('click','.btn_side_close',function(e){
					e.preventDefault();
					sidePop.sideClose();
				});

				$(document).on('click','.btn.primary',function(e){
					e.preventDefault();	
					$('.btn_blank.open').siblings('input[type="checkbox"]').prop('checked',true).change();
					if(isMobile) {
						sidePop.sideClose();
					} else {
						$('.btn_blank.open').focus();
						$('.btn_blank').removeClass('open');
					}
				});
			})
		}		
	},
	sideOpen:function(){
		Body.lock();
		$('#sidePopUI').attr('tabindex',0).focus();
		$('#sidePopUI').attr('aria-hidden',false);
		$(sidePop.OutCont).attr('aria-hidden',true);
		$('#sidePopUI').addClass('show');
		$('#sidePopUI').before('<div class="dimmed" aria-hidden="true"></div>');
		$('.dimmed').addClass('show');
		Dialog.focusMove('#sidePopUI');
	},
	sideClose:function(){
		Body.unlock();
		$('.btn_blank.open').focus();
		$('.btn_blank').removeClass('open');
		$('#sidePopUI').attr('aria-hidden',true);
		$(sidePop.OutCont).removeAttr('aria-hidden');
		$('#sidePopUI').removeClass('show');
		$('.dimmed').removeClass('show');
		$('#sidePopUI').removeAttr('tabindex style');
		setTimeout(function(){
			$('.dimmed').remove();
		},610);
	}
}

$.fn.inputDel = function(){
	//input 삭제버튼
	// 8-20 통합검색 검색시에만 input 삭제버튼 사용
	$(document).on('keyup change focus','.total_search .inp_txt, .search_box .form_in .inp_txt, span.inp_txt, .total_search_form .inp_txt, .gmenu_search .inp_txt', function(){
		console.log('1');
		var $val = $(this).val(), $txt = $(this).text(),
			$unit = $(this).data('unit');	

		if($(this).prop('readonly') || $(this).prop('disabled') || $(this).hasClass('no_del')){
			console.log("return");
			return false;
		}
		if($val != '' || $txt != ''){
			if(!$(this).next('.inp_del').length && !$(this).next('.datepicker').length){
				if($(this).hasClass('auto')) {
					$(this).closest('.insu_amount').addClass('active');
					$(this).addClass('active').attr('data-content', $unit);
				}
				$(this).after('<button type="button" class="inp_del">입력내용삭제</button>');
			}
		}else{
			// $(this).removeClass('active').removeAttr('data-content');
			// $(this).next('.inp_del').remove();
			// $(this).closest('.insu_amount').removeClass('active');
			$(this).removeAttr('data-content');
			$(this).next('.inp_del').remove();
			$(this).closest('.insu_amount');
		}
		
		
	});
	$(document).on('click','.inp_del',function(){
		var $inp = $(this).prev('.inp_txt');
		if($inp.hasClass('auto')) {			
			$inp.empty().focus().removeAttr('data-content');
		} else {
			$inp.val('').change().focus();
		}	
		$(this).remove();	
	});
}

$.fn.datePicker = function() {
	//jquery ui datepicker
	if($('.inp_date').length){
		$('.inp_date').each(function(){
			var $this = $(this);
			
			$(this).datepicker({
				prevText: '이전달',
				nextText: '다음달',
				buttonText : '달력팝업열기',
				monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
				monthNamesShort:['01','02','03','04','05','06','07','08','09','10','11','12'],
				dayNamesMin: ['일','월','화','수','목','금','토'],
				dateFormat:'yy.mm.dd',
				yearRange:'-100:+100',
				yearSuffix: '.',
				showMonthAfterYear: true,
				showButtonPanel: false,
				showOn:'button',
				beforeShow: function(el,ob){
					//열때
					var $cal = $('#'+ob.dpDiv[0].id);
					var i_offset = $(el).offset();
					$(this).prop('readonly',true);

					setTimeout(function(){
						$('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
						$('.ui-datepicker-prev, .ui-datepicker-next').on('click', function(e) {
							e.preventDefault();
						});
						$cal.attr('tabindex',0).focus();

						if (!!isMobile) {
							$cal.addClass('show');
							$cal.after('<div class="dim_datepicker"></div>');

							Body.lock();
						}
					},10);
				},
				onChangeMonthYear: function(y,m,ob){
					//달력 바뀔때
					var $cal = $('#'+ob.dpDiv[0].id);
					setTimeout(function(){
						$('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
						$cal.focus();
					},10);
				},
				onSelect: function(d,ob){
					//선택할때
					var $cal = $('#'+ob.dpDiv[0].id);
					$cal.removeAttr('tabindex');
					$(this).next('.ui-datepicker-trigger').focus();
					$(this).prop('readonly',false);
				},
				onClose: function(d,ob){
					//닫을때
					var $cal = $('#'+ob.dpDiv[0].id);
					$cal.removeAttr('tabindex');
					$(this).next('.ui-datepicker-trigger').focus();
					$(this).prop('readonly',false);

					if (!!isMobile) {
						closeTop = -1 * parseInt($('#wrap').css('top'));
						$cal.removeClass('show');
						$('.dim_datepicker').remove();
						
						Body.unlock();
					}
				}
			});

			//달력버튼 카드리더기에서 안읽히게
			$(this).siblings('.ui-datepicker-trigger').attr({
				'aria-hidden':true,
				'tabindex':-1
			});
			if($(this).prop('disabled') == true){
				$(this).siblings('.ui-datepicker-trigger').attr('disabled','disabled');
			}
		});
	}
};

var isMobile = false;
var deviceCheck = function() {
	var ua = navigator.userAgent,
		ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
		deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
		uAgent = ua.toLowerCase(),
		deviceInfo_len = deviceInfo.length;

	var browser = {},
		support = {},
		version,
		device;

	for (var i = 0; i < deviceInfo_len; i++) {
		if (uAgent.match(deviceInfo[i]) !== null) {
			device = deviceInfo[i];
			isMobile = true;
			break;
		}			
	}
	
	browser.local = (/^http:\/\//).test(location.href);
	browser.firefox = (/firefox/i).test(ua);
	browser.webkit = (/applewebkit/i).test(ua);
	browser.chrome = (/chrome/i).test(ua);
	browser.opera = (/opera/i).test(ua);
	browser.ios = (/ip(ad|hone|od)/i).test(ua);
	browser.android = (/android/i).test(ua);
	browser.safari = browser.webkit && !browser.chrome;
	browser.app = ua.indexOf('appname') > -1 ? true : false;

	//touch, mobile
	support.touch = browser.ios || browser.android || (document.ontouchstart !== undefined && document.ontouchstart !== null);
	browser.mobile = support.touch && ( browser.ios || browser.android);
	
	//os
	browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
	browser.os = browser.os ? browser.os[1].toLowerCase() : '';

	//version 
	if (browser.ios || browser.android) {
		version = ua.match(/applewebkit\/([0-9.]+)/i);
		version && version.length > 1 ? browser.webkitversion = version[1] : '';
		if (browser.ios) {
			version = ua.match(/version\/([0-9.]+)/i);
			version && version.length > 1 ? browser.ios = version[1] : '';
		} else if (browser.android) {
			version = ua.match(/android ([0-9.]+)/i);
			version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
		}
	}

	if (ie) {
		browser.ie = ie = parseInt( ie[1] || ie[2] );
		( 11 > ie ) ? support.pointerevents = false : '';
		( 9 > ie ) ? support.svgimage = false : '';
	} else {
		browser.ie = false;
	}

	var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
	var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : 'etc';
	var clsMobile = browser.mobile ? browser.app ? 'app mobile' : 'mobile' : 'desktop';

	$('html').addClass(browser.os);
	$('html').addClass(clsBrowser);
	$('html').addClass(clsMobileSystem);
	$('html').addClass(clsMobile);
};

$.fn.dropMenu = function(m1, m2){
	var $breadcrumbs = {
		menu: $(m1),
		subMenu: $(m2)
	};
	var menuopen = '메뉴펼치기', menuclose = '메뉴접기'

	$breadcrumbs.menu.attr('title',menuopen);
	$breadcrumbs.menu.on('click', function (e) {	
		e.preventDefault();
		var $this = $(this);
		if($this.hasClass('active')){
			$this.removeClass('active').attr('title',menuopen).closest('li.d1').find('.sub').slideUp();
			$('.breadcrumbs_in').removeClass('active');
		} else {
			$this.closest('li.d1').find('.sub').slideDown().closest('li.d1').siblings().find('.sub').slideUp();
			$this.addClass('active').attr('title',menuclose).closest('li.d1').siblings('li.d1').find('a').removeClass('active').attr('title',menuopen);
			$('.breadcrumbs_in').addClass('active');
		}
	});
	$breadcrumbs.subMenu.on('focusout', function (e) {
		var $this = $(this), focus_num = $this.closest('ul').find('li').length, focus_index = $this.closest('li').index()+1;
		if(focus_num == focus_index){
			$this.closest('li.d1').find('a').removeClass('active').attr('title',menuopen).closest('li.d1').find('.sub').slideUp();
			$('.breadcrumbs_in').removeClass('active');
		}
	});
	$(document).click(function(e) {
		var a = e.target;
		if($(a).closest('.breadcrumbs').length === 0) {
			$breadcrumbs.menu.closest('li.d1').find('a').removeClass('active').attr('title','메뉴펼치기').closest('li.d1').find('.sub').slideUp();
			$('.breadcrumbs_in').removeClass('active');
		}
	});
}

$.fn.breadcrumbsFixed = function() {
	var $window = $(window), $wrap = $('#wrap'), $header = $('#header');
	$window.on('scroll', function() {
		var scrollPos = $(this).scrollTop(), headerHeight = $header.outerHeight();
		if(!$('html.lock').length){
			if (headerHeight < scrollPos) {
				$wrap.addClass('fixed')
			} else {
				$wrap.removeClass('fixed');
				if($('#totalSearch').hasClass('show')) {
					$('#totalSearch').removeClass('show').hide();
				}	
				if($('#allMenu').hasClass('show')) {
					$('#allMenu').removeClass('show').hide();
				}	
			}
		}
	});
}

$.fn.asideFixed = function() {
	var $window = $(window),
		$aside = $('#aside'),
		asideH = $aside.outerHeight(),
		headerH = 248,
		winHeight = $(window).innerHeight(),
		footerH = $('#footer').outerHeight(),
		docHeight = $('#wrap').outerHeight() + headerH,
		limitTop = docHeight - footerH - asideH,
		initBtm = 145, asideMB = 40;

	if ($('.tab_section').length > 0) {
		var newDocHeight;
		$(document).off('click.tabclick').on('click.tabclick', '.tab_section .tab > a', function() {
			newDocHeight = $('#wrap').outerHeight();
			limitTop = newDocHeight - footerH - asideH;
		});
	}
	
	$window.on('scroll', function() {
		var nowTop =  $(window).scrollTop(),
			changeH = nowTop + winHeight - (asideH + asideMB);

		if (changeH > limitTop) {
			$aside.css({ position: 'absolute', bottom: footerH+asideMB+'px' });
		} else {
			$aside.css({ position: 'fixed', bottom: initBtm+'px' });
		}
	});
}

$.fn.toggle = function(){
	var $btnToggle = $('.m_toggle_btn, .toggle_btn'), 
	$contentsToggle = $('.m_toggle_cont, .toggle_conts');

	if($('body').attr('data-category') == 'ps'){
		// 퇴직연금 초기화
		var $eduBtnToggle = $('.acco_edu_wrap .toggle_btn'), 
		$eduContentsToggle = $('.acco_edu_wrap .toggle_conts');
		
		$eduBtnToggle.attr({'aria-expaned':'true', 'title':'내용닫기'}).addClass('active');
		$eduContentsToggle.attr('aria-hidden','false');
	} else {
		// 퇴직연금 제외한 나머지 
		$btnToggle.attr({'aria-expanded':'false', 'title':'내용열기'});
		$contentsToggle.attr('aria-hidden','true');	
	}

	$btnToggle.on('click', function (e) {
		e.preventDefault();
		var $this = $(this), $panel = $($this.attr('href'));
		if ($this.attr('aria-expanded') == 'false'){
			$this.attr({'aria-expanded':'true', 'title':'내용닫기'}).addClass('active');
			$panel.attr('aria-hidden','false').slideDown(300);
		} else {
			$this.attr({'aria-expanded':'false', 'title':'내용열기'}).removeClass('active');
			$panel.attr('aria-hidden','true').slideUp(300);
		}
	});	
}

var insCheckActive = function(){
	//agree_item:checkbox
	var $insuChk = '.ins_check input[type=checkbox]';

	$(document).on('change',$insuChk,function(){
		var $this = $(this),
			$insuItem = $this.closest('.rd_box'),
			$contEdit = $insuItem.find('.inp_txt')

		if($(this).prop('checked')){
			//체크할때
			$insuItem.addClass('active');
			if($contEdit) {
				$contEdit.attr('contenteditable', 'true');				
			}			
		}else{
			//해제할때
			$insuItem.removeClass('active');
			if($contEdit) {
				$contEdit.attr('contenteditable', 'false');
				$contEdit.next('.inp_del').remove();
			}			
		}
	});
}
var Dialog ={
	focusClass:'dialog_focused',
	open:function(tar, callback){
		var $select_id = $(tar),
			$body = $('body'),
			$lastCloseBtn = '<a href="#" class="dialog_close last_focus" role="button"><span class="offscr">팝업창 닫기</span></a>';

		if($('body').hasScrollBar()){ //스크롤유무 체크
			Body.lock();
		}
			
		//원래 포커스에 클래스 부여
		var $focus = $(':focus');
		if($focus.length){
			$($focus).addClass(Dialog.focusClass);
		}		
		
		//팝업 마지막 포커스 버튼 적용
		// $select_id.find('.dialog_wrap').append($lastCloseBtn);

		//열기
		$select_id.attr({'aria-hidden':'false','tabindex':'0'}).fadeIn(100,function(){
			if(!!callback){
				callback();
			}
		}).addClass('n' + $('.dialog.show').length + ' show').focus();
		if (!!!isMobile) $select_id.css({ display:'flex' });

		$select_id.on('blur', function(){ $(this).removeAttr('tabindex'); });			
		
		if(!isMobile) {
			// Dialog.height($select_id);
			$select_id.find('.scrollbar').mCustomScrollbar({
				advanced:{
					autoScrollOnFocus:true,
					updateOnContentResize:true
				}
			});
		} 
		else {
			// $select_id.find('.dialog_content').scrollTop(0,0);
			var $height = $(tar).height(),
				$head = $(tar).find('.dialog_header').height(),
				$content = $(tar).find('.dialog_content');

			// if(!$(tar).hasClass('full'))$content.css('max-height',$height);
			if($(tar).hasClass('bottom')) {
				$content.css('max-height',$height - $head - 80);
			}
			
			// top button
			topButton(tar);
		}
		
		//팝업 안에서만 포커스 이동
		Dialog.focusMove(tar);

		xScrInfo();
	},
	height: function(target){
		var $select_id = $(target),		
			$dialogContent = $select_id.find('.scrollbar');
		if($dialogContent.length){
			var fullHeight = $(window).outerHeight() - $select_id.find('.dialog_header').outerHeight() - $select_id.find('.dialog_footer').outerHeight() - 300,
			contentHeight = $dialogContent.outerHeight();
				// console.log(fullHeight + " / " + contentHeight);
				console.log(contentHeight);
			if(fullHeight < contentHeight){
				$dialogContent.css('height',fullHeight);
				$dialogContent.removeClass('no_scroll');
			} else {
				$dialogContent.css('height','auto');
				$dialogContent.addClass('no_scroll');
			}
		}
	},
	focusMove:function(tar){
		if(!$(tar).is(':visible'))return false;
		var $tar = $(tar),
			$focusaEl = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])'
			$focusaEls = $tar.find($focusaEl);
			
		var $isFirstBackTab = false;
		$focusaEls.on('keydown',function(e){
			var $keyCode = (e.keyCode?e.keyCode:e.which),
				$focusable = $tar.find(':focusable').not('.last_focus'),
				$focusLength = $focusable.length,
				$firstFocus = $focusable.first(),
				$lastFocus = $focusable.last(),
				$index = $focusable.index(this);

			$isFirstBackTab = false;
			if($index == ($focusLength-1)){ //last
				if ($keyCode == 9){
					if(!e.shiftKey){
						$firstFocus.focus();
						e.preventDefault();
					};
				};
			}else if($index == 0){	//first
				if($keyCode == 9){
					if(e.shiftKey){
						$isFirstBackTab = true;
						$lastFocus.focus();
						e.preventDefault();
					};
				};
			}
		});
		
		$tar.on('keydown',function(e){
			var $keyCode = (e.keyCode?e.keyCode:e.which),
				$focusable = $tar.find(':focusable').not('.last_focus'),
				$lastFocus = $focusable.last();
			
			if(e.target == this && $keyCode == 9){
				if(e.shiftKey){
					$lastFocus.focus();
					e.preventDefault();
				};
			}
		});

		$(document).on('focusin',$tar.selector+' .last_focus',function(e){
			var $focusable = $tar.find(':focusable').not('.last_focus'),
				$firstFocus = $focusable.first(),
				$lastFocus = $focusable.last();
			if($isFirstBackTab){
				$lastFocus.focus();
			}else{
				$firstFocus.focus();
			}
		});
	},
	close:function(tar){
		//포커스 되돌려주기			
		var $body = $('body');			
			$count = $('.dialog.show').length,
			$parent = $('.dialog.n' + ($count-2)),
			returnFocus = $parent.find('.dialog_focused');

		if(returnFocus.length > 0){
			returnFocus.focus();
			setTimeout(function(){
				$($parent).find('.dialog_open').removeClass(Dialog.focusClass);
			},50); 
		} else {
			$('.'+Dialog.focusClass).focus();
			setTimeout(function(){
				$('.'+Dialog.focusClass).removeClass(Dialog.focusClass);
			},50); 
		}

		//닫기
		if($('.dialog.show').length == 1){
			Body.unlock();
		} 
		$(tar).attr('aria-hidden','true').removeClass('show').removeClass('n' + $('.dialog.show').length).fadeOut(300);
		$(tar).find('.scrollbar').css('height','auto');
		$(tar).find('.last_focus').remove();
	},
	init:function(){
		$('.dialog').attr({'aria-hidden':'true','aria-live':'polit','tabindex':-1});
		//열기
		$(document).on('click','.dialog_open',function(e){
			e.preventDefault();
			var $pop = $(this).attr('href');
			Dialog.open($pop);
		});

		$(document).on('click', '.dialog_close',function(e){
			e.preventDefault();
			var $pop = $(this).attr('href');
			if ($pop == '#' || $pop == '#none' || $pop == undefined)$pop = $(this).closest('.dialog');
			Dialog.close($pop);
		});
	}
};
var dialogHeight = function(){
	var $dialog = $('.dialog.show');
	if($dialog.length>0){
		$dialog.each(function(){
			// Dialog.height(this);
		});
	}
};

var scrollItem ={
	checkInView: function(target){
		var $window = $(window);
			$wHeight = $window.height(),
			$scrollTop = $window.scrollTop(),
			$winBottom = ($scrollTop + $wHeight);

		$.each(target, function(){
			var $el = $(this),
				$elHeight = $($el).outerHeight(),
				$elTop = $($el).offset().top + 50,
				$elCenter = $elTop + ($elHeight/5),
				$elBottom = $elTop + $elHeight - 50,
				$animationClass = $el.data('animation'),
				$delay = $el.data('delay'),
				$duration = $el.data('duration'),
				$animationIn = $el.data('animation-in'),
				$addClassAry = ['on','active'];

			if(!$el.hasClass('animated') && $addClassAry.indexOf($animationClass) == -1){
				if($delay>0){
					$el.css({
						'-webkit-animation-delay':$delay+'ms',
						'animation-delay':$delay+'ms'
					});
				}
				if($duration>0){
					$el.css({
						'-webkit-animation-duration':$duration+'ms',
						'animation-duration':$duration+'ms'
					});
				}
				$el.addClass('animated paused '+$animationClass);
			}

			if($animationIn){
				if(($elTop >= ($scrollTop - ($wHeight/2))) && ($elBottom <= ($winBottom + ($wHeight/2)))){
					if($el.hasClass('animated')){
						$el.addClass('paused '+$animationClass);
					}
				}else{
					if($el.hasClass('animated')){
						$el.removeClass($animationClass);
					}else{
						$el.removeClass($animationClass);
					}
				}
			}
			
			if(($elBottom >= $scrollTop) && ($elTop <= $winBottom)){
				if($el.hasClass('animated')){
					if($el.closest('.tab_panel').length && !$el.closest('.tab_panel').hasClass('active'))return;
					$el.removeClass('paused');
				}else{
					$el.addClass($animationClass);
				}
			}
		});
	},
	scrollChk: function(target){
		var $scrollTop = $(window).scrollTop();
		//console.log($scrollTop)
		$.each(target, function(){
			var $el = $(this),
				$Data = $el.data('scrollchk').split(','),
				$Start = $Data[0],
				$End = $Data[1],
				$type = $Data[2].split(' ');

			switch($Start){
				case 'in':
					$Start = $el.parent().offset().top - $(window).height();
				break;
				case 'top':
					$Start = $el.parent().offset().top - 50;
				break;
				case 'bottom':
					$Start = $el.parent().offset().top - $el.parent().outerHeight();
				break;
				default:
					$Start = parseInt($Start)
				break;
			}

			switch($End){
				case 'out':
					$End = $el.parent().offset().top + $el.parent().outerHeight();
				break;
				case 'top':
					$End = $el.parent().offset().top - 50;
				break;
				case 'bottom':
					$End = $el.parent().offset().top - $el.parent().outerHeight();
				break;
				default:
					$End = parseInt($End);
				break;
			}

			var isFadeOut = false,
				isFadeIn = false,
				isTopDown = false,
				isSclDown = false,
				isSclUp = false;
			if($.inArray('fadeOut',$type) != -1)isFadeOut = true;
			if($.inArray('fadeIn',$type) != -1)isFadeIn = true;
			if($.inArray('topDown',$type) != -1)isTopDown = true;
			if($.inArray('sclDown',$type) != -1)isSclDown = true;
			if($.inArray('sclUp',$type) != -1)isSclUp = true;

			var $min = $el.parent().outerHeight()-$el.outerHeight(),
				$rate = ($el.outerHeight()-$el.parent().outerHeight())/($End-$Start),
				$move = -($scrollTop-$Start)*($rate),
				$opacity = Math.max(0,Math.min(1,($scrollTop-$Start)/$End));

			if($Start > $scrollTop){
				if(isFadeOut)$el.css('opacity',1);
				if(isFadeIn)$el.css('opacity',0);
				if(isTopDown)$el.css('top',0);
				if(isSclDown)$el.css('top',0);
				if(isSclUp)$el.css('bottom',0);
			}else if($scrollTop > $End){
				if(isFadeOut)$el.css('opacity',0);
				if(isFadeIn)$el.css('opacity',1);
				if(isSclDown)$el.css('top',$min);
				if(isSclUp)$el.css('bottom',$min);
			}else{
				if(isFadeOut)$el.css('opacity',1-$opacity);
				if(isFadeIn)$el.css('opacity',$opacity);
				if(isTopDown)$el.css('top',($scrollTop-$Start)/2);
				if(isSclDown)$el.css('top',Math.max($min,$move));
				if(isSclUp)$el.css('bottom',Math.max($min,$move));
			}
		});
	},
	init: function(){
		var $animations = $.find('*[data-animation]');
		if($animations.length > 0){
			$(window).on('scroll resize',function(){
				scrollItem.checkInView($animations);
			});
		}

		var $scrollFades = $.find('*[data-scrollchk]');
		if($scrollFades.length > 0){
			$(window).on('scroll resize',function(){
				scrollItem.scrollChk($scrollFades);
			});
		}
	}
};
//body scroll lock
var Body = {
	scrollTop :'',
	lock: function(){
		Body.scrollTop = window.pageYOffset;
		$('#wrap').css({
			top: - (Body.scrollTop)
		});
		$('html').addClass('lock');
	},
	unlock: function(){
		$('html').removeClass('lock');
		$('#wrap').removeAttr('style');
		window.scrollTo(0, Body.scrollTop);
		window.setTimeout(function (){
			Body.scrollTop = '';
		}, 0);
	}
}

var range = function(){
	if($('.range_amount').length){
		$('.range_amount').each(function(){
			var $slider = $(this).find('.slider'),
				$inp = $(this).find('input[type=text]'),
				$unit = $slider.data('unit'),
				$list = $(this).find('.list'),
				$scope = $(this).find('.scope'),
				$min = parseInt($slider.data('min')),
				$max = parseInt($slider.data('max')),
				$val = parseInt($slider.data('value')),
				$step = parseInt($slider.data('step')),
				$dot = $slider.data('dot');
	
			if(!$min)$min = 0;
			if(!$max)$max = 5;
			if(!$step)$step = 1;
			if(!$val)$val = $min;
			$inp.attr('value', $val);

			if (!!$dot) {
				var dispVal;
				dispVal = $val/10 + '';
				dispVal = dispVal.indexOf('.') > 0 ? dispVal : dispVal + '.0';
				$inp.attr('value', dispVal);
			}

			if($list.length){
				$list.empty();
				$list.append('<ul></ul>');
				for(var i = $min;i <= ($max/$step);i++){
					$list.find('ul').append('<li><a href="#" role="button">'+i*$step+'<span class="offscr">'+$unit+'</span></a></li>');
				}
			}	
			
			// if($scope.length) {
			// 	$scope.find('.start').text($min);
			// 	$scope.find('.end').text('최대 ' + $max);
			// }
			
			var range = $slider.slider({
				min:$min,
				max:$max,
				value:$val,
				step:$step,
				range:'min',
				slide: function(e, ui) {
					var val;
					if (!!$dot) {
						val = ui.value/10 + '';
						val = val.indexOf('.') < 0 ? val + '.0' : val;
					} else {
						val = ui.value;
					}

					$inp.val(val);
				},
				create:function(e){
					$slider.find('.ui-slider-handle').html('<span class="offscr">선택한 값은</span><i>'+$val+'</i><span class="offscr">'+$unit+'입니다.</span>');
					if($list.length)$list.find('li').eq($val/$step).addClass('on').find('a').attr('title','현재선택');
				},
				stop:function(event,ui){
					$(ui.handle).find('i').html(ui.value);
					// $inp.val(ui.value);
					$inp.attr('value', ui.value);
					$slider.data('value',ui.value);
					if($list.length) {
						$list.find('li').eq(ui.value/$step).siblings().removeClass('on').removeAttr('title');
						$list.find('li').eq(ui.value/$step).addClass('on').find('a').attr('title','현재선택');
					}					
				}
			});

			$inp.on("keyup", function(e) {
				var inpVal;

				// 소수점일 경우, 숫자 키와 소수점 키만 눌렀을 때
				if (!!$dot) {
					if (
						(e.keyCode > 95 && e.keyCode < 106) || e.keyCode === 110
						|| (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 190
						|| e.keyCode === 46 || e.keyCode === 8		// delete or backspace
					) {
						inpVal = Number(this.value).toFixed(1) * 10;
					}
				} else {
					inpVal = this.value;
				}

				$slider.slider('value', inpVal);
				$(this).attr('value', inpVal);
				$slider.find('.ui-slider-handle').html('<span class="offscr">선택한 값은</span><i>'+inpVal+'</i><span class="offscr">'+$unit+'입니다.</span>');
				if($list.length) {
					$list.find('li').eq(inpVal/$step).siblings().removeClass('on').removeAttr('title');
					$list.find('li').eq(inpVal/$step).addClass('on').find('a').attr('title','현재선택');
				}
			})

			$list.find('a').click(function(e){
				e.preventDefault();
				var $txt = parseInt($(this).text());
				range.slider('value',$txt);
				$slider.find('.ui-slider-handle i').text($txt);
				$inp.attr('value', $txt);
				$(this).parent().addClass('on').attr('title','현재선택').siblings().removeClass('on').removeAttr('title');
			});
		});
	}
}
//scroll check
$.fn.hasScrollBar = function() {
	return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0)
			|| (this.prop("scrollHeight") > this.prop("clientHeight"));
};

$.fn.tab = function(){
	var $tabWidget = $('.tab_section');
	$tabWidget.each(function () {
		var $this = $(this),
			$tab1 = $this.find('.tab_list'),
			$tabListItems = $tab1.find('li a'),
			$tabListItemActive = $tab1.find('li.active a'),
			$tabPanels = $this.find('.tab_panel');
			$tab1.attr('role','tablist');
		
			var $tabListItemID = $tabListItemActive.attr("href"),
				$tabPanelActive = $($tabListItemID);
			$tabPanels.attr({
				'aria-hidden':'true',
				'role':'tabpanel'
			});
			$tabListItemActive.attr('title','현재선택');
			$tabPanelActive.attr('aria-hidden','false').addClass('active');
	});
	$('.tab_list .tab a').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.tab_list').find('li').removeClass('active').find('a').removeAttr('title');
		$(this).closest('li').addClass('active').find('a').attr('title','현재선택');
		var tabpanid = $(this).attr('href');
		var tabpan = $(tabpanid);
		
		if (tabpan.length > 0) {
			tabpan.attr('aria-hidden','false').addClass('active').siblings().attr('aria-hidden', 'true').removeClass('active');
		} else {
			$(this).closest('.tab_section').find('.tab_contents>.tab_panel').attr('aria-hidden','true').removeClass('active');
			// $tabWidget.find('.panel').attr('aria-hidden', 'true').removeClass('active');
		}
		$('.popup_slide').slick('setPosition');
		if ($(this).find('tabmenu')) {
			e.preventDefault();
			scrollUI.center($(this).parent());
		}
		xScrInfo();
	});	
	
};

var scrollUI = {
	center: function(el){
		var $parent = $(el).parent(),
			$parentWidth = $parent.outerWidth(),
			$parentScrollW = $parent.get(0).scrollWidth,
			$thisLeft = $(el).position().left,
			$thisWidth = $(el).outerWidth(),
			$scrollLeft = $thisLeft - ($parentWidth/2) + ($thisWidth/2),
			$speed = Math.max(300,Math.abs($scrollLeft * 2));
		if($parentWidth < $parentScrollW)$parent.animate({'scrollLeft':'+='+$scrollLeft},$speed);
	},
	hidden: function(){
		var $window = $(window),
			$position = $window.scrollTop(),
			$floatingNav = $('#floatingNav'),
			$isFloatingNav = false,
			$sclHidden = $('.btn_scl_hidden'),
			$sclHidden2 = $('.scl_hidden');

		$window.on('scroll', function(){
			var $scrollTop = $(this).scrollTop(),
				$wrapH = $('#wrap').height(),
				$end = $wrapH - $(window).height() - 10;
			if($scrollTop >= $position){										//아래로 스크롤하면 숨김
				if($scrollTop >= $end){											//아래로 스크롤해도 마지막에 도달하면 보여줌
					$sclHidden2.removeClass('off');
				}else{
					if($scrollTop > 50)$sclHidden2.addClass('off');
				}
			}else{							//위로 스크롤하면 보여줌
				if(!$('html').hasClass('lock')){
					if($scrollTop <= 50){
						$sclHidden2.removeClass('off');
					}else{
						$sclHidden2.addClass('off');
					}
				}
			}
		});
		
		$sclHidden.find('a').on('focusin', function(e){
			$sclHidden.removeClass('off');
		});
	},
	loading:function(){
		$(window).scroll(function(){
			$('.loading_area').each(function(){
				var $this = $(this),
					$href = $this.data('href')
				if(isScreenIn(this)){
					$this.load($href,function(res,sta,xhr){
						if(sta == "success"){
							$this.children().unwrap();
						}
					});
				}
			});
		});
	},
	init: function(){
		scrollUI.hidden();
		scrollUI.loading();
	}

};

$.fn.accordion = function(){
	var $accordion = $('.accordion'),
		$title = $('.accordion .title'),
		$title_retire = $('.accordions .title'),
		$panel = $('.accordion .panel');
	$panel.hide();
	$accordion.attr({
		role: 'tablist',
		multiselectable: 'true'
	});
	$panel.attr('id', function(IDcount) { 
		return 'panel-' + IDcount; 
	});
	$panel.attr('aria-labelledby', function(IDcount) { 
		return 'control-panel-' + IDcount; 
	});
	$panel.attr('aria-hidden','true');
	$panel.attr('role','tabpanel');
	$title.each(function(i){
		var $this = $(this);
		$target = $this.next('.panel')[0].id;
		$link = $('<a>', {
		  'href':'#'+$target,
		  'aria-expanded':'false',
		  'aria-controls':$target,
		  'id':'control-'+ $target
		});
		$this.wrapInner($link);
		if($this.hasClass('open')){
			$this.find('a').attr('aria-expanded',true).addClass('active').append('<span class="ico">내용닫기</span>').parent().next('.panel').addClass('active').attr('aria-hidden','false').slideDown(200);

		} else {
			$this.find('a').append('<span class="ico">내용열기</span>');
		}
	});
	$title_retire.each(function(s) {
		var $this = $(this);
		$target = $this.next('.panel')[0].id;
		$link = $('<a>', {
		  'href':'#'+$target,
		  'aria-expanded':'false',
		  'aria-controls':$target,
		  'id':'control-'+ $target
		});
		$this.wrapInner($link);
	});
	$('.accordion .title a').on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.attr('aria-expanded') == 'false'){
			if(!$this.closest('.accordion').hasClass('toggle')){
				$this.parents('.accordion').find('[aria-expanded=true]').attr('aria-expanded',false).removeClass('active').parent().next('.panel').removeClass('active').attr('aria-hidden','true').slideUp(200);
			}
			$this.attr('aria-expanded',true).addClass('active').find('.ico').text('내용닫기').parents('.title').next('.panel').addClass('active').attr('aria-hidden',false).slideDown(200);
			$this.parent().siblings().find('.ico').text('내용열기');
		} else {
			  $this.attr('aria-expanded',false).removeClass('active').find('.ico').text('내용열기').parents('.title').next('.panel').removeClass('active').attr('aria-hidden',true).slideUp(200);
		}

		if(!isMobile) {
			if ($this.closest('.scrollbar').length) {
				$this.closest('.scrollbar').mCustomScrollbar({
					advanced:{
						autoScrollOnFocus:true,
						updateOnContentResize:true
					}
				});
			}
		}		
	});
}

$.fn.slickSlider = function(){
	if ($('.main_visual').length > 0){
		var $myHeadSlide = $('.main_visual_slide').slick({
			infinite: true,
			autoplay:true,
			autoplaySpeed:3000,
			speed:1000,
			arrows: false,
			appendDots:$('.main_visual_control .page'),
			dots:true,
			customPaging: function(slider, i) {
				return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1 + '번째 배너');
			},
		});
		$('.main_visual_control .pause').on('click',function(){
			$myHeadSlide.slick('slickPause');
			$('.main_visual_control .play').show().focus();
			$(this).hide();
		});
		$('.main_visual_control .play').on('click',function(){
			$myHeadSlide.slick('slickPlay');
			$('.main_visual_control .pause').show().focus();
			$(this).hide();
		});
	}
};

$.fn.sameHeight = function(item){
	var $this = this;
	$(window).on('load',function(){
		$this.each(function(){
			var $heightArry = [],
				$item = $(this).find(item);
			if(item == null)$item = $(this).children();
			$item.each(function(){
				$(this).css('height','auto');
				var $height = $(this).outerHeight();
				$heightArry.push($height);
			});
			var $maxHeight = Math.max.apply(null, $heightArry);
			$item.css('height',$maxHeight);
		});
	});
};

$.fn.uiToolTip = function() {
	return this.each(function() {
		var $t = $(this),
			_parent = '.ui_tooltip_wrap',
			_tooltip = '.tooltip',
			_edge = '.tooltip > i',
			_closeBtn = '.tooltip_close',
			$parent = $t.closest(_parent),
			$tootip = $t.closest(_parent).find(_tooltip),
			$edge = $t.closest(_parent).find(_edge),
			$closeBtn = $tootip.find(_closeBtn),
			$mob = $('html').hasClass('mobile'),
			$right = $tootip.hasClass('right'),
			edgePos = '22px',
			$winW = $(window).width(),
			whiteSpace = 20; // 모바일에서 툴팁의 좌우 여백

		$t.on('click', function() {
			
			if($tootip.is(':visible')) return;
			
			$tootip.show();			
			if($mob) {
				// $tootip 위치 잡기
				console.log($winW, $tootip.offset().left, Math.floor($tootip.offset().left) + whiteSpace);
				$tootip.css({
					'width': $winW - (whiteSpace * 2),
					'left': Math.floor(whiteSpace - $tootip.offset().left) + 'px',
				});
				$edge.css('left', $t.offset().left - $tootip.offset().left);
			} else {
				if($tootip.offset().left + $tootip.innerWidth() > $winW || $right) { // 툴팁의 offset left 값 + 가로값이 브라우자 가로폭보도 큰경우, 즉 화면을 넘어간 경우
					$tootip.css('right', '-' + edgePos);
					$edge.css('right', edgePos);
				} else {
					$tootip.css('left', '-' + edgePos);
					$edge.css('left', edgePos);
				}
			}
			setTimeout(function() {
				$parent.addClass('active');
			},100);

			$closeBtn.off().on('click', function() {
				$parent.removeClass('active');
				setTimeout(function() {
					$tootip.removeAttr('style');
					$edge.removeAttr('style');
					$t.focus();
				},100);
			});
		});
	});
}


/** top button */
var topButton = function(_tar) {
	var $target = !!!_tar ? $('#container') : $(_tar).find('.dialog_content'),
		$topBtn = !!$('.header_mb').hasClass('big') ? $('<div class="top_button b"><button type="button" class="top_btn">TOP</button></div>') : $('<div class="top_button"><button type="button" class="top_btn">TOP</button></div>');
		// winHeight = $(window).innerHeight(),
		// docHeight = $('#wrap').outerHeight() - 30,
		// footerH = $('#footer').outerHeight(),
		// limitTop = docHeight - footerH - 90,
		// btnMB = 40, btnH, breadcrumbH;

	// if ($('.breadcrumbs_wrap').length > 0) {
	// 	breadcrumbH = 66;
	// 	limitTop = limitTop + breadcrumbH;
	// }
	
	if ($target.closest('.bottom').length < 1 && !!!$target.closest('.dialog_wrap').hasClass('s')) {
		// top button 초기화 - 삭제 후 추가
		$target.find('.top_button').remove();
		$target.append($topBtn);
	}

	// btnH = $('.top_button > .top_btn').outerHeight();

	// if ($('#container .tab_section').length > 0) {
	// 	var newDocHeight;
	// 	$(document).off('click.tabclick2').on('click.tabclick2', '.tab_section .tab > a', function() {
	// 		newDocHeight = $('#wrap').outerHeight();
	// 		limitTop = newDocHeight - footerH - 90;
	// 	});
	// }

	$(window).on('scroll', function() {
		var nowTop =  $(window).scrollTop();
			// changeH = nowTop + winHeight - (btnH + btnMB);

		if (nowTop > 184) {
			$topBtn.addClass('show');
		} else {
			$topBtn.removeClass('show');
		}

		// if (changeH > limitTop) {
		// 	$topBtn.css({ position: 'absolute', bottom: footerH+btnMB+'px' });
		// } else {
		// 	$topBtn.css({ position: 'fixed', bottom: btnMB+'px' });
		// }
	});

	$(document).off('click.screentop').on('click.screentop', '.top_button > .top_btn', function() {
		if ($(this).closest('.dialog').length < 1) {
			$('html').animate({ scrollTop: 0 }, 300);
		} else {
			$(this).closest('.dialog_content').animate({ scrollTop: 0 }, 300);
		}
	});
};



/* 가로스크롤바 관련 안내 문구 */
var xScrInfo = function() {
	if ($('.horizon_scrollbar').length > 0) {
		$.each($('.horizon_scrollbar'), function(i) {
			if ($('.horizon_scrollbar').eq(i).outerWidth() < $('.horizon_scrollbar').eq(i).find('table').outerWidth()) {
				var $scrBar = $('.horizon_scrollbar').eq(i),
					infoTxt = '스크롤하여 좌우로 표를 확인하세요';
					scrInfo = '<div class="scr_info" tabindex="0"><span>'+ infoTxt +'</span></div>';

				$scrBar.addClass('x_hidden');
				$scrBar.find('.scr_info').length < 1 ? $scrBar.prepend(scrInfo) : '';

				$scrBar.find('.scr_info').on('click.xscrollinfo', function() {
					$(this).closest('.horizon_scrollbar').removeClass('x_hidden');
					$(this).remove();
				}).on('keyup.xscrollinfo', function(e) {
					if (e.keyCode === 13) {
						$(this).closest('.horizon_scrollbar').removeClass('x_hidden');
						$(this).remove();
					}
				});
			}
		});
	}
};




/**
* 작업리스트에서 PC, 모바일 View용 
* --------------------------------------
* (퍼블용 스크립트)
* 2021.08.02
*/
function toggleWorklist(_view){
	if(_view == 'mobile'){
		$('html').removeClass('win');
		$('html').removeClass('desktop');
		$('html').addClass('mobile');
	}else{
		$('html').removeClass('mobile');
		$('html').addClass('win');
	}

	$('html').addClass('loadOn');
	parent.toggleWatch();
	return false;
}



/**
* 로딩 중(공통/보장분석)
*/
var loading = {
	start: function() {
		var loadingObj = '<div id="Loading" class="loading">';
			loadingObj += '<div class="loading_img"></div>';		// loading image
			loadingObj += '<div class="loading_msg">';
			loadingObj += '<div class="msg">마음을 가득 담는 중...</div>';
			loadingObj += '</div>';
			loadingObj += '</div>';
	
		// body에 loading 추가
		$('body').append(loadingObj);
	},
	end: function() {
		if ($('#Loading').length > 0) {
			$('#Loading').remove();
		}
	}
};