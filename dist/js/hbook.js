
/**
 * @authors H君
 * @date    2017-02-06 11:37:29
 * @version 0.0.6
 */

!function(window,$) {

	"use strict";
	
	//弹框层级
	var dialogIndex = 1050;

	var Dialog=function(options){

		// 默认配置
		var defaults={
			title:'提示',
			type:0, 	    // 0:有头部和尾部 1:没有头部 2:没有尾部 3：没有头尾 
			backdrop:true,  // 是否出现遮罩
			confirmButton:true,  //确认按钮
			cancelButton:true,	 //取消按钮
			confirm:function(){},
			cancel:function(){}
		}

		var options = $.extend(defaults, options);

		this.options=options;
		this.confirm=options.confirm;
		this.cancel=options.cancel;
		this.$element=$('#'+options.id);
		this.init(this.options,this.$element);
		
	}

	// 初始化
	Dialog.prototype.init=function(options,$element){

		var _self = this;

		if ($element.length <= 0) {
			dialogIndex ++ ;
			_self.show(options,$element);
		}
		
	}

	// 显示弹出框
	Dialog.prototype.show=function(){
		
		var _self = this,
			options = _self.options;

		var typeClass = '';	
		if (options.type == 1){
			typeClass = 'dialog-tip' ; 
		}
		var _html = '<div class="dialog '+typeClass+'" id="'+options.id+'" style="z-index:'+(dialogIndex - 1)+'">';

		if ( (options.type == 0 || options.type == 2) && options.type != 3) {
			_html += 	'<div class="dialog-header">'+options.title+'<a href="javascript:;" class="dialog-close dialog-close-'+options.id+'" ><i class="fa fa-close font-16"></i></a></div>';
		}
			_html += 	'<div class="dialog-body">'+options.content+'</div>';
		if (options.type != 2 && options.type != 3) {
			_html +=	'<div class="dialog-footer dialog-footer-right">'+
							'<div class="btn-group">';

			if (options.confirmButton){
				_html +=		'<a href="javascript:;" class="btn btn-primary dialog-confirm-'+options.id+'" >确认</a>';
			}				
			
			if (options.cancelButton){
				_html +=		'<a href="javascript:;" class="btn dialog-cancel-'+options.id+'">取消</a>';
			}		
				_html +=		 '</div>'+
							'</div>'+
						'</div>';
		}			
			
		$(_html).appendTo(document.body).addClass('in');

		_self.$element = $(_html);
		_self.backdrop(options);
		_self.bindEvent(options);

	}

	// 隐藏弹出框
	Dialog.prototype.hide=function(id){

		var elememtId = id || this.options.id;
		$('#'+elememtId).removeClass('in').remove();
		$('.dialog-backdrop-'+elememtId).length > 0 ? this.hideBackDrop(elememtId) : '' ;
		
	}

	// 显示遮罩
	Dialog.prototype.backdrop=function(options){

		var elememtId = options.id;

		if ($('.dialog-backdrop-'+elememtId).length <= 0) {
			$('<div class="dialog-backdrop dialog-backdrop-'+elememtId+'" style="z-index:'+(dialogIndex-2)+'"></div>')
			.appendTo(document.body)
			.addClass('in');

			$(document.body).addClass('dialog-open');
		}

	}

	// 隐藏遮罩
	Dialog.prototype.hideBackDrop = function(elememtId){

		var _self = this; 

		$('.dialog-backdrop-'+elememtId).remove();

		if ($('.dialog-backdrop').length < 1) {
			$(document.body).removeClass('dialog-open');
		}
		
	}


	// 绑定事件
	Dialog.prototype.bindEvent=function(options){

		var _self = this,
			elememtId = options.id;
		
		// 点击确认按钮
		$('.dialog-confirm-'+elememtId+'').click(function(){
			if (typeof _self.confirm == 'function') {
				_self.confirm();
			}
		})

		// 点击取消按钮
		$('.dialog-cancel-'+elememtId+'').click(function(){

			if (typeof _self.cancel == 'function') {
				_self.cancel();
				_self.hide(elememtId);
			}
		})

		// 关闭操作
		$('.dialog-backdrop-' + elememtId + ',.dialog-close-'+elememtId+'').click(function(){
			_self.hide(elememtId);
		})

	}
	
	function stopEvent(e){_

		if (!e) var e = window.event;
		if (e.stopPropagation) { 
			// 兼容火狐
			e.stopPropagation(); 
		} 
		else if (e) { 
			// 兼容IE
			window.event.cancelBubble = true; 
		}

	}

	window.Dialog = Dialog; 

}(window,window.jQuery);

/**
 * @authors H君
 * @date    2016-04-27 18:35:42
 * @version 1.0
 * 
 */

!function($) {

	"use strict";

	var $formControl=$('.form-line-input .form-control');
	var $checkControl=$('.checkbox,.radio');

	// 文本框
	$formControl.on('focus',function(){
		var $self = $(this);
		$self.addClass('edited');
	})
	.on('blur',function(){
		var $self = $(this),
			val   = $.trim($self.val());

		val ? '' : $self.removeClass('edited');
	})
	
	// 复选框
	$checkControl.on('change', 'input[type=checkbox],input[type=radio]', function(event) {
		var $self = $(this);

		$self.parent().hasClass('radio') ? $(this).parent().siblings('.radio').removeClass('active') : '';
		$(this).parent().toggleClass('active');
	});

}(window.jQuery);

/**
 * @authors H君
 * @date    2016-04-21 11:22:04
 * @version 1.0
 * 
 * 分页功能
 * @param  {[type]} current   [当前页]
 * @return {[type]} showNum   [显示条数 ]
 * @return {[type]} pageCount [总页数]
 * @return {[type]} callback  [单击回调方法，返回当前页]
 */

!function($) {
	"use strict";

	var Page=function(element, options){
		this.options=options;
		this.$element=$(element);
		this.init();

	}

	Page.prototype = {

		init:function(){
			this.getDom(this.$element, this.options);
			this.bindEvent(this.$element, this.options);
		},

		getDom:function(element,options){
			
			element.empty();
			
			//上一页
			if (options.current > 1) {
				element.append('<a href="javascript:;" class="prevPage">&laquo;</a>');
			} else {
				element.remove('.prevPage');
				element.append('<span class="disabled">&laquo;</span>');
			}
			
			//中间页码
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

			//下一页
			if (options.current < options.pageCount) {
				element.append('<a href="javascript:;" class="nextPage">&raquo;</a>');
				// element.append('<input type="text"  class="gotoInput"/>');
				// element.append('<a href="javascript:;" class="gotoPage">跳转</a>');
			} else {
				element.remove('.nextPage');
				element.append('<span class="disabled">&raquo;</span>');
				// element.append('<input type="text"  class="gotoInput"/>');
				// element.append('<a href="javascript:;" class="gotoPage">跳转</a>');
			}
		
		},

		bindEvent:function(){
			var _self=this;

			_self.$element.off('click');			
			_self.$element.on("click", "a.number", function() {
				var current = parseInt($(this).text());
				_self.getDom(_self.$element, {
					"current": current,
					"pageCount": _self.options.pageCount
				});
				if (typeof(_self.options.callback) == "function") {
					_self.options.callback(current);
				}
			});

			//上一页
			_self.$element.on("click", "a.prevPage", function() {
				var current = parseInt(_self.$element.children("span.current").text());
				_self.getDom(_self.$element, {
					"current": current - 1,
					"pageCount": _self.options.pageCount
				});
				if (typeof(_self.options.callback) == "function") {
					_self.options.callback(current - 1);
				}
			});

			//下一页
			_self.$element.on("click", "a.nextPage", function() {

				var current = parseInt(_self.$element.children("span.current").text());
				_self.getDom(_self.$element, {
					"current": current + 1,
					"pageCount": _self.options.pageCount
				});
				if (typeof(_self.options.callback) == "function") {
					_self.options.callback(current + 1);
				}
			});

			//跳转到某页
			_self.$element.on("click", "a.gotoPage", function() {
				var gotoPage=_self.$element.children("input.gotoInput").val();
				if (gotoPage != '') {
					var current = parseInt(gotoPage);
					if (current) {
						if (current <= _self.options.pageCount) {
							_self.getDom(_self.$element, {
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

	}

	$.fn.page = function(option) {
		//默认参数
		var element=this;
		var options = $.extend($.fn.page.defaults, option);

		return this.each(function () {
           new Page(this, options);
		})
		
	}

	$.fn.page.defaults={
		current   : 1,
		pageCount : 10,
		callback  : function() {}
	}


	
}(window.jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      // $.support.transition && this.$tip.hasClass('fade') ?
      //   $tip
      //     .one('bsTransitionEnd', complete)
      //     .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      //   complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    // $.support.transition && $tip.hasClass('fade') ?
    //   $tip
    //     .one('bsTransitionEnd', complete)
    //     .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
    //   complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
   
    $.fn.tooltip = old
    return this

  }

}(jQuery);
