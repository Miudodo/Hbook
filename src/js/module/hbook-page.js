
/**
 * @authors H��
 * @date    2017-02-13 15:51:41
 * @version 0.1.6
 */

(function (global, factory) {

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());

}(this, function () { 

	"use strict";
	
	// �汾��
	var Version = '0.1.6';

	var Page = function(element, options){

		this.options = options;
		this.$element = $(element);
		this.init();

	}

	// ��ʼ��
	Page.prototype.init = function(){

		this.create(this.$element, this.options);
		this.bindEvent(this.$element, this.options);

	}

	// ������ҳ
	Page.prototype.create = function(element,options){

		element.addClass('page').empty();
			
		//��һҳ
		if (options.current > 1) {
			element.append('<a href="javascript:;" class="prevPage">&laquo;</a>');
		} else {
			element.remove('.prevPage');
			element.append('<span class="disabled">&laquo;</span>');
		}
		
		//�м�ҳ��
		if (options.current != 1 && options.current >= 4 && options.pageCount != 4) {
			element.append('<a href="javascript:;" class="number">' + 1 + '</a>');
		}
		if (options.current - 2 > 2 && options.current <= options.pageCount && options.pageCount > 5) {
			
			element.append('<span class="more">...</span>');
		}

		var start = options.current - 2,
			end   = options.current + 2;
		if ((start > 1 && options.current < 4) || options.current == 1) {
			end++;
		}
		if (options.current > options.pageCount - 4 && options.current >= options.pageCount) {
			start--;
		}
		for (; start <= end; start++) {
			if (start <= options.pageCount && start >= 1) {
				if (start != options.current) {
					element.append('<a href="javascript:;" class="number">' + start + '</a>');
				} else {
					element.append('<span class="current">' + start + '</span>');
				}
			}
		}
		if (options.current + 2 < options.pageCount - 1 && options.current >= 1 && options.pageCount > 5 ) {
			element.append('<span class="more">...</span>');
		}
		if (options.current != options.pageCount && options.current < options.pageCount - 2 && options.pageCount != 4) {
			element.append('<a href="javascript:;" class="number">' + options.pageCount + '</a>');
		}

		//��һҳ
		if (options.current < options.pageCount) {
			element.append('<a href="javascript:;" class="nextPage">&raquo;</a>');
			// element.append('<input type="text"  class="gotoInput"/>');
			// element.append('<a href="javascript:;" class="gotoPage">��ת</a>');
		} else {
			element.remove('.nextPage');
			element.append('<span class="disabled">&raquo;</span>');
			// element.append('<input type="text"  class="gotoInput"/>');
			// element.append('<a href="javascript:;" class="gotoPage">��ת</a>');
		}
	}

	// ���¼�
	Page.prototype.bindEvent = function(){

		var _self=this;

		_self.$element.off('click');

		_self.$element.on("click", "a.number", function() {
			var current = parseInt($(this).text());
			_self.create(_self.$element, {
				"current": current,
				"pageCount": _self.options.pageCount
			});
			if (typeof(_self.options.callback) == "function") {
				_self.options.callback(current);
			}
		});

		//��һҳ
		_self.$element.on("click", "a.prevPage", function() {
			var current = parseInt(_self.$element.children("span.current").text());
			_self.create(_self.$element, {
				"current": current - 1,
				"pageCount": _self.options.pageCount
			});
			if (typeof(_self.options.callback) == "function") {
				_self.options.callback(current - 1);
			}
		});

		//��һҳ
		_self.$element.on("click", "a.nextPage", function() {

			var current = parseInt(_self.$element.children("span.current").text());
			_self.create(_self.$element, {
				"current": current + 1,
				"pageCount": _self.options.pageCount
			});
			if (typeof(_self.options.callback) == "function") {
				_self.options.callback(current + 1);
			}
		});

		//��ת��ĳҳ
		_self.$element.on("click", "a.gotoPage", function() {
			var gotoPage=_self.$element.children("input.gotoInput").val();
			if (gotoPage != '') {
				var current = parseInt(gotoPage);
				if (current) {
					if (current <= _self.options.pageCount) {
						_self.create(_self.$element, {
							"current": current,
							"pageCount": _self.options.pageCount
						});
						if (typeof(_self.options.callback) == "function") {
							_self.options.callback(current);
						}
					};
				};
				
			};
		});
		
	}
	
	$.fn.page = function(option) {
		//Ĭ�ϲ���
		var element=this;
		var options = $.extend($.fn.page.defaults, option);

		return this.each(function () {
           new Page(this, options);
		})
		
	}

	$.fn.page.defaults={
		current   : 1,  //��ǰҳ
		pageCount : 10, //������
		callback  : function(thisPage) {} //�ص�����
	}

}));