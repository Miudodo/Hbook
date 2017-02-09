/**
 * 
 * @authors H君
 * @date    2017-02-06 16:55:47
 * @version 0.0.6
 */
!function(window){

	'use strict';

	var $header = $("#header"),
		$checkBox = $("#check-box"),
		$loginBtn = $("#login-btn");

	var $backToTop = $('#backToTop');	

	var hbook={

		// 初始化
		init:function(){

			hbook.bindEvent();
			hbook.valid();
			// $('[data-toggle="tooltip"]').tooltip();
			hbook.page('.page');
			prettyPrint();

		},

		//事件绑定
		bindEvent:function(){

			$header.find('.nav a').click(function() {
				var _id = $(this).attr('data-id'),
					  T = $('#'+_id).offset().top;

				$('body,html').stop().animate({
					scrollTop: T - 60
				},500, 'linear', function() {
					$('#navbar').removeClass('in');
				});
			})

			$loginBtn.click(function(event) {
				if ($('#login-form').valid()) {
					console.log($('#login-form').serialize())
				}
			});

			$checkBox.on('click', 'a', function(event) {
				var $this = $(this),
					color = $this.data('color');

				$checkBox.find('label').each(function(index, el) {
					$(el).removeClass('box-primary box-success box-warning box-danger  box-violet box-black box-grey')
						 .addClass(color);
				});
			});

			// 导航下拉
			$('.navbar-toggle').click(function(event) {
				$(this).toggleClass('collapsed');
				$(this).parent().next('.collapse').toggleClass('in');
			});

			//弹窗
			var dialog = null;
			$('#dialog-btn').click(function(event) {
				var _html = '<div >您觉的Hbook好用吗？</div>';
				dialog = new Dialog({
					id:'dialog1',
					type:0,
					title:'提示',
					content:_html,
					confirm:function(){
						new Dialog({
							id:'dialog1',
							title:'提示',
							content:'感谢您的支持！',

							confirm:function(){
								this.hide();
							}
						})
					},
					cancel:function(){
						new Dialog({
							id:'dialog3',
							type:'1',
							content:'取消成功',
							cancelButton:false,
							confirm:function(){
								this.hide();
							}
						})
					}
				})
			
			});

			//滚动文档
			$(window).on('scroll', function(event) {
				var scrollTopVal = $(window).scrollTop();
				if(scrollTopVal > 200){
					$backToTop.addClass('in');
				}else{
					$backToTop.removeClass('in');
				}
			});

			//回到顶部
			$backToTop.click(function(event) {
				$('body,html').stop().animate({scrollTop: 0
				},500, 'linear', function() {});
			});

		},
		
		//表单验证
		valid:function(){
			
			$("#login-form").validate({
				rules: {
					user: "required",
					password: {
						required: true,
						minlength: 6
					}
				},
				messages: {
					user: "不能为空",
					password: '密码至少6位数以上'
				}
			});
		},

		// 分页
		page:function(element){

			$(element).page({
				pageCount: 26,
				current: 1,
				showNum: 10,
				callback: function(tPage) {
					console.log(tPage);
				}
			});

		},

		
		
		
		
	};

	window.hbook=hbook.init;

}(this);
	
