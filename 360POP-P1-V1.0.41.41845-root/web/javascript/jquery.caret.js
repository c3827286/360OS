(function($) {
  $.fn.caret = function(pos) {
	var range_pos = {};
    var target = this[0];
	var isContentEditable = target.contentEditable === 'true';
    //get
    if (arguments.length == 0 || pos == "range") {
      //HTML5
      if (window.getSelection) {
        //contenteditable
        if (isContentEditable) {
          target.focus();
          var range1 = window.getSelection().getRangeAt(0),
              range2 = range1.cloneRange();
          range2.selectNodeContents(target);
          range2.setEnd(range1.endContainer, range1.endOffset);
          return range2.toString().length;
        }
		if(pos == "range"){
			range_pos.start = target.selectionStart;
			range_pos.end = target.selectionEnd;
			return range_pos;
		}
        else
		//textarea
        	return target.selectionStart;
      }
      //IE<9
      if (document.selection) {
        target.focus();
        //contenteditable
        if (isContentEditable) {
            var range1 = document.selection.createRange(),
                range2 = document.body.createTextRange();
            range2.moveToElementText(target);
            range2.setEndPoint('EndToEnd', range1);
			return range2.text.length;
        }
        //textarea
        var pos = 0,
            range = target.createTextRange(),
            range2 = document.selection.createRange().duplicate(),
            bookmark = range2.getBookmark();
        range.moveToBookmark(bookmark);
        while (range.moveStart('character', -1) !== 0) pos++;
		if(pos == "range"){
			var val = target.val();
			range_pos.start = (range2.text == "" ? val.length : val.lastIndexOf(range2.text));
			range_pos.end = pos;
			return range_pos;
		}
		else
			return pos;
      }
      //not supported
      return 0;
    }
    //set
    if (pos == -1)
      pos = this[isContentEditable? 'text' : 'val']().length;
    //HTML5
    if (window.getSelection) {
      //contenteditable
      if (isContentEditable) {
        target.focus();
        window.getSelection().collapse(target.firstChild, pos);
      }
      //textarea
      else
        target.setSelectionRange(pos, pos);
    }
    //IE<9
    else if (document.body.createTextRange) {
      if (isContentEditable) {
        var range = document.body.createTextRange();
        range.moveToElementText(target);
        range.moveStart('character', pos);
        range.collapse(true);
        range.select();
      } else {
        var range = target.createTextRange();
        range.move('character', pos);
        range.select();
      }
    }
    if (!isContentEditable)
      target.focus();
    return pos;
  }
})(jQuery);

(function($){
    $.fn.textFocus=function(index){
        var range,len,v=index===undefined?0:parseInt(index);
        this.each(function(){
            if($.browser.msie){
                range=this.createTextRange();
                len=this.value.length;
                if(!v){ v = len;}
                v===0?range.collapse(false):range.move("character",v);
                range.select();
            }else{
                len=this.value.length;
                if(!v){ v = len;}
                v===0?this.setSelectionRange(len,len):this.setSelectionRange(v,v);
            }
            this.focus();
        });
        return this;
    }
})(jQuery);


String.prototype.repeat = function( num ) {
    return new Array(num + 1).join(this);
};
var pwd = 0 ;
$.fn.PwdFadeIn = function(options) {
    var defaults = {
        duration: 2000,
        mask: '\u25CF'
    };
    var values = Array();
    this.each(function() {
        var ret = {
            pass:null,
			real_pass:null,
            text:null,
            focused:false,
            timeout:null,
            opts: null,
        
            maskNow: function(ival) {
                clearTimeout(ret.timeout);
                if(ret.opts.mask != null) {
                    var vl;
					var ss = ret.text.caret("range");
                    if($.isArray(ival)) {
                        vl = ret.opts.mask.repeat(ival[0])
                            + ret.text.val().substring(ival[0], ival[1])
                            + ret.opts.mask.repeat(ret.text.val().length - ival[1]);
                    } else {
                        vl = ret.opts.mask.repeat(ret.text.val().length);
                    }
                    if(vl!=ret.text.val()) {
                    	  ret.text.removeAttr("lastpos").val(vl);
                    }
                    if(ret.focused) {
                        var setStartPos = (typeof ss === "object")?ss.start:ss;
                        ret.text.caret(setStartPos);
                    }
                }
            },
        
            reMask: function(ival) {
                if(ret.opts.mask == null) return;
                ret.maskNow(ival);
                if($.isArray(ival)) {
                    ret.timeout = setTimeout(ret.maskNow, ret.opts.duration);
                }
            },
        
            unMask: function() {
                clearTimeout(ret.timeout);
                ret.opts.mask = null;
                ret.text.val(ret.real_pass);
            }
        };
        ret.opts = $.extend(defaults, options);
        ret.pass = $(this);
        var caretMoved = true;
        function sel(ev) {
			//中文输入法下，ff输入框虚拟失焦，不在捕获任何输入框事件 ie .webkit 输入框不失焦，但是会屏蔽所有有键的keypress事件
            if(!caretMoved && !$.browser.mozilla) {
                caretMoved = true;
                ret.text.change();
            }
            var el = $(ev.target);
            var range = el.caret("range");
            if(range.start != range.end) {
                el.attr("lastpos", range.start + "," + range.end)
            } else {
                el.removeAttr("lastpos");
            }
        }
        var ieChange = function(ev) {
            if(event.propertyName=="value") {
                ret.text.unbind("propertychange").change();
            }
        };
        ret.real_pass = ret.pass.val();
        if($.browser.msie) {
            var htm = this.outerHTML.replace("password", "text");
            ret.text = $(htm).val(ret.real_pass).bind("propertychange", ieChange);
            ret.pass.closest("form").submit(function() {
                ret.text.attr("disabled", "disabled");
            });
        }
		else{
			ret.text = ret.pass.clone().attr("type", "text");
		}
        var last = null;
        ret.text.attr("autocomplete", "off").change(function(evt) {
        	if(last==ret.text.val()) return;
            var t = last = ret.text.val();
            var tr = ret.real_pass;
            var lp = ret.text.attr("lastpos");
            if(lp == null) {
                lp = $(evt.target).caret() - (t.length - tr.length);
            } else {
                lp = lp.split(",");
                tr = tr.substring(0, parseInt(lp[0])) + tr.substring(parseInt(lp[1]));
                lp = parseInt(lp[0]);
            }
            var added = t.length - tr.length;
            if(added > 0) {
                tr = tr.substring(0,lp) + t.substring(lp, lp + added) + tr.substring(lp);
				ret.reMask([lp, lp + added]);
            } else
                tr = tr.substring(0,lp + added) + tr.substring(lp);
            ret.text.attr("autocomplete", "off").removeAttr("lastpos");
			ret.real_pass = tr;
			if($.browser.msie)
				ret.text.bind("propertychange", ieChange);
        }).keypress(sel).mouseup(sel).select(sel)
        .unbind("input").bind("input", function() {
            if(jQuery.browser.opera || jQuery.browser.mozilla) ret.text.change();
            else caretMoved = false;
         })
        .focus(function() { ret.focused = true; }).blur(function() { ret.focused = false; });
        ret.pass.after(ret.text).hide().removeAttr("id");
		ret.reMask();
        values.push(ret);
		ret.pass.remove();
    });
    values = $(values);
    values.$ = this;
    return values;
};