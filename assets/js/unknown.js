(function($) {
  $(document).ready(function() {

    //form-item focused
    $('.form-item > *').focus(function() {
      $(this).parent().addClass('focused');
    });
    $('.form-item > *').blur(function() {
      $(this).parent().removeClass('focused');
    });

    //header-bg-image navbar-fixed
    var header = $('#header');
    var headerHeight = header.outerHeight();
    //var headerBg = $('.header-bg-video.navbar-fixed #header-bg');
    var headerBg = $('.navbar-fixed #header-bg');
    var navbar = $('.navbar-fixed #navbar');
    var headerBgHeight = headerHeight - 192;

    $(document).scroll(function(e) {
      var scrollPercent = (headerBgHeight - window.scrollY) / headerBgHeight;
      if (scrollPercent >= 0) {
        headerBg.css('opacity', scrollPercent);
      }
      if (window.scrollY > headerHeight - 128) {
        navbar.addClass('navbar-bg');
      } else {
        navbar.removeClass('navbar-bg');
      }
      if (window.scrollY > headerHeight - 64) {
        navbar.addClass('navbar-shadow');
      } else {
        navbar.removeClass('navbar-shadow');
      }
    });

    // drawer
    $('#navbar-menu-toggle').click(function(e) {
      $('body').addClass('drawer-open');
      e.stopPropagation();
      e.preventDefault();
    });

    $('#drawer-overlay').click(function(e) {
      $('body').removeClass('drawer-open');
    });

    $('#drawer-menu-close').click(function(e) {
      $('body').removeClass('drawer-open');
      e.stopPropagation();
      e.preventDefault();
    });

    // jquery touch events https://github.com/benmajor/jQuery-Touch-Events
    $('#drawer').swipeleft(function() {
      $('body').removeClass('drawer-open');
    });

    $('#drawer-overlay').swipeleft(function() {
      $('body').removeClass('drawer-open');
    });

    // smooth scroll for internal links

    var fixedHeight = 24;
    if ($('body').hasClass('navbar-fixed')) {
      fixedHeight += 64;
    }

    if ($('body').hasClass('adminimal-menu')) {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (width < 1025) {
        fixedHeight += 47;
      } else {
        fixedHeight += 29;
      }
    }

    $('a[href^="#"]:not([href="#"])').on('click', function(e) {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - fixedHeight
      }, 600, 'swing', function() {
        if (history.pushState) {
          history.pushState(null, null, target);
        } else {
          window.location.hash = target;
        }
      });
    });

    var pathname = window.location.pathname;
    $('a[href^="' + pathname + '#"]').on('click', function(e) {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - fixedHeight
      }, 600, 'swing', function() {
        if (history.pushState) {
          history.pushState(null, null, target);
        } else {
          window.location.hash = target;
        }
      });
    });

    // collapsible panels
    $('.collapsible-toggle').click(function() {
      var target = '#'.concat($(this).attr('data-target'));
      $(target).slideToggle('fast');
      $(this).toggleClass('expanded');
    });

    // tootips
    $('.tooltip').hover(function() {
      $(this).addClass('tooltip-expanded');
    }, function() {
      $(this).removeClass('tooltip-expanded');
    });

    // dropdown menus
    $('.menu-dropdown-toggle').click(function(e) {
      $(this).removeClass('tooltip-expanded');
      $(this).find('.tooltip').removeClass('tooltip-expanded');
      var target = '#'.concat($(this).attr('data-target'));
      $(target).slideToggle('fast');
      $('.menu-dropdown:not(' + target + ')').slideUp('fast');
      e.stopPropagation();
      e.preventDefault();
    });

    $(document).click(function() {
      $('.menu-dropdown').slideUp('fast');
    });


  });
})(jQuery);;
/**
 * jquery.ripple.js
 *
 * @version 0.0.1
 * @author SUSH <sush@sus-happy.ner>
 * https://github.com/sus-happy/jquery.ripple.js
 */

(function($, U) {
  // use border-radius
  $.support.borderRadius = false;
  // use transition
  $.support.transition = false;
  $(function() {
    $.each(['borderRadius', 'BorderRadius', 'MozBorderRadius', 'WebkitBorderRadius', 'OBorderRadius', 'KhtmlBorderRadius'], function(i, v) {
      if (document.body.style[v] !== undefined) $.support.borderRadius = true;
      return (!$.support.borderRadius);
    });

    var el = $("<div>");
    $.support.transition = typeof el.css("transitionProperty") === "string";
  });

  $.extend({
    // jquery.ripple用の関数
    ripple: {
      // アニメーションの裏に隠れないようにするDOM
      $textSpan: $('<span>').css({
        position: 'relative',
        'z-index': 2
      }),
      // アニメーション用のDOM
      $rippleWrap: $('<span>', {
        'class': 'rippleWrap'
      }).css({
        position: 'absolute',
        'z-index': 1,
        'left': 0,
        'top': 0,
        'overflow': 'hidden'
      }).append(
        $('<span>', {
          'class': 'rippleAnimate'
        }).css({
          position: 'absolute',
          'left': 0,
          'top': 0,
          'width': 0,
          'height': 0,
          'border-radius': '50%'
        })
      ),
      // jquery.rippleが利用できるか？
      is: function() {
        return $.support.borderRadius && $.support.transition;
      },
      // coreクラス
      core: function(target, param) {
        this.$target = target;
        this._v_duration = 400;
        this._h_duration = 400;
        this._timer = null;

        // paramに値があれば設定変更
        if (param !== U && Object.prototype.hasOwnProperty.call(param, 'v_duration')) {
          this.set_view_duration(param.v_duration);
        }
        if (param !== U && Object.prototype.hasOwnProperty.call(param, 'h_duration')) {
          this.set_hide_duration(param.h_duration);
        }

        // イベント初期設定
        this.init();
      }
    }
  });

  // coreクラスを拡張しておく
  $.ripple.core.prototype = {
    // 設定変更
    set_view_duration: function(v_duration) {
      this._v_duration = v_duration;
    },
    set_hide_duration: function(h_duration) {
      this._h_duration = h_duration;
    },

    // イベント初期設定
    init: function() {
      var that = this;

      // position staticだったらrelativeにしておく
      if (this.$target.css('position') === 'static') {
        this.$target.css('position', 'relative');
      }
      // スマホ端末のハイライトを切る
      this.$target.css('-webkit-tap-highlight-color', 'rgba( 0, 0, 0, 0 )');

      // 必要DOMを追加
      this.$target.wrapInner($.ripple.$textSpan);
      this.$target.append($.ripple.$rippleWrap.clone());

      // 必要DOMを変数に入れておく
      this.$rippleWrap = this.$target.find('.rippleWrap');
      this.$rippleAnimate = this.$target.find('.rippleAnimate');

      // マスクに関係するスタイルを反映する
      // border-radius
      this.$rippleWrap.css('border-radius', this.$target.css('border-radius'));

      // 色を指定
      this.$target.find('.rippleAnimate').css('background-color', this.$target.attr('data-color'));

      // イベントを登録
      if (('ontouchstart' in window)) {
        this.$target.bind('touchstart.ripple', function(e) {
          that.view(e.originalEvent.touches[0]);
        });
        this.$target.bind('touchend.ripple', function(e) {
          that.hidden(e.originalEvent.touches[0]);
        });
        this.$target.bind('mouseleave.ripple', function(e) {
          that.hidden(e);
        });
      } else {
        this.$target.bind('mousedown.ripple', function(e) {
          that.view(e);
        });
        this.$target.bind('mouseup.ripple mouseleave.ripple', function(e) {
          that.hidden(e);
        });
      }
    },

    // イベント廃止
    remove: function() {},

    // アニメーション開始
    view: function(e) {
      // タイマーは切っておく
      clearTimeout(this._timer);

      // マスク要素のサイズを再取得（変わる可能性も考慮して）
      var width = this.$target.outerWidth();
      var height = this.$target.outerHeight();
      this.$rippleWrap.stop(true, false).width(width).height(height).css({
        'opacity': 1,
        'transition': 'none'
      });

      // サイズを指定（縦横の大きい値）
      var circleRatio = 2.8;
      var size = Math.max(width, height);

      // マウスボタンの位置を取得
      // offsetX, offsetYがおかしいのでpageX, pageYから計算する
      var offsetX = e.pageX - this.$target.offset().left;
      var offsetY = e.pageY - this.$target.offset().top;
      this.$rippleAnimate.css({
        'width': size,
        'height': size,
        'transform': 'scale3d( 0, 0, 1 )',
        'left': offsetX - size / 2,
        'top': offsetY - size / 2,
        'transition': 'none'
      });

      var animateTo = {};
      animateTo.transform = 'scale3d( ' + circleRatio + ', ' + circleRatio + ', 1 )';
      animateTo.transition = (this._v_duration / 1000) + 's ease-out';

      // アニメーション開始
      this.$rippleAnimate.show()
        .css(animateTo);
    },

    // アニメーション終了
    hidden: function(e) {
      var that = this;
      // Wrapの透明度を下げて隠していく
      this.$rippleWrap.stop(true, false).css({
        'opacity': 0,
        'transition': 'opacity ' + (this._h_duration / 1000) + 's ease-out'
      });

      // アニメーション終了タイミングでサイズ変更
      clearTimeout(this._timer);
      this._timer = setTimeout(function() {
        that.$rippleWrap.css({
          'opacity': 1,
          'transition': 'none'
        });
        that.$rippleAnimate.css({
          'transform': 'scale3d( 0, 0, 1 )',
          'transition': 'none'
        });
      }, this._v_duration);
    }
  };

  $.fn.extend({
    // jquery.ripple
    ripple: function(opt) {
      // 必要条件に満たさなければ終了
      // border-radiusとtransitionが使えればたぶん動く
      if (!$.ripple.is()) {
        return $(this);
      }

      // 対象DOMに対してイベントを登録する
      $(this).each(function() {
        new $.ripple.core($(this), opt);
      });

      return $(this);
    }
  });
})(jQuery);


(function($) {
  $(function() {
    $('.ripple').ripple();
    $('.btn').ripple();
    $('.fab').ripple();
  });
})(jQuery);;
/*!
 * jQuery Mobile Events
 * by Ben Major
 *
 * Copyright 2011-2015, Ben Major
 * Licensed under the MIT License:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
"use strict";
! function(a) {
  function n() {
    var a = f();
    a !== g && (g = a, d.trigger("orientationchange"))
  }

  function u(b, c, d, e) {
    var f = d.type;
    d.type = c, a.event.dispatch.call(b, d, e), d.type = f
  }
  a.attrFn = a.attrFn || {};
  var b = "ontouchstart" in window,
    c = {
      tap_pixel_range: 5,
      swipe_h_threshold: 50,
      swipe_v_threshold: 50,
      taphold_threshold: 750,
      doubletap_int: 500,
      touch_capable: b,
      orientation_support: "orientation" in window && "onorientationchange" in window,
      startevent: b ? "touchstart" : "mousedown",
      endevent: b ? "touchend" : "mouseup",
      moveevent: b ? "touchmove" : "mousemove",
      tapevent: b ? "tap" : "click",
      scrollevent: b ? "touchmove" : "scroll",
      hold_timer: null,
      tap_timer: null
    };
  a.isTouchCapable = function() {
    return c.touch_capable
  }, a.getStartEvent = function() {
    return c.startevent
  }, a.getEndEvent = function() {
    return c.endevent
  }, a.getMoveEvent = function() {
    return c.moveevent
  }, a.getTapEvent = function() {
    return c.tapevent
  }, a.getScrollEvent = function() {
    return c.scrollevent
  }, a.each(["tapstart", "tapend", "tapmove", "tap", "tap2", "tap3", "tap4", "singletap", "doubletap", "taphold", "swipe", "swipeup", "swiperight", "swipedown", "swipeleft", "swipeend", "scrollstart", "scrollend", "orientationchange"], function(b, c) {
    a.fn[c] = function(a) {
      return a ? this.on(c, a) : this.trigger(c)
    }, a.attrFn[c] = !0
  }), a.event.special.tapstart = {
    setup: function() {
      var b = this,
        d = a(b);
      d.on(c.startevent, function a(e) {
        if (d.data("callee", a), e.which && 1 !== e.which) return !1;
        var f = e.originalEvent,
          g = {
            position: {
              x: c.touch_capable ? f.touches[0].screenX : e.screenX,
              y: c.touch_capable ? f.touches[0].screenY : e.screenY
            },
            offset: {
              x: c.touch_capable ? Math.round(f.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(e.pageX - (d.offset() ? d.offset().left : 0)),
              y: c.touch_capable ? Math.round(f.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(e.pageY - (d.offset() ? d.offset().top : 0))
            },
            time: Date.now(),
            target: e.target
          };
        return u(b, "tapstart", e, g), !0
      })
    },
    remove: function() {
      a(this).off(c.startevent, a(this).data.callee)
    }
  }, a.event.special.tapmove = {
    setup: function() {
      var b = this,
        d = a(b);
      d.on(c.moveevent, function a(e) {
        d.data("callee", a);
        var f = e.originalEvent,
          g = {
            position: {
              x: c.touch_capable ? f.touches[0].screenX : e.screenX,
              y: c.touch_capable ? f.touches[0].screenY : e.screenY
            },
            offset: {
              x: c.touch_capable ? Math.round(f.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(e.pageX - (d.offset() ? d.offset().left : 0)),
              y: c.touch_capable ? Math.round(f.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(e.pageY - (d.offset() ? d.offset().top : 0))
            },
            time: Date.now(),
            target: e.target
          };
        return u(b, "tapmove", e, g), !0
      })
    },
    remove: function() {
      a(this).off(c.moveevent, a(this).data.callee)
    }
  }, a.event.special.tapend = {
    setup: function() {
      var b = this,
        d = a(b);
      d.on(c.endevent, function a(e) {
        d.data("callee", a);
        var f = e.originalEvent,
          g = {
            position: {
              x: c.touch_capable ? f.changedTouches[0].screenX : e.screenX,
              y: c.touch_capable ? f.changedTouches[0].screenY : e.screenY
            },
            offset: {
              x: c.touch_capable ? Math.round(f.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(e.pageX - (d.offset() ? d.offset().left : 0)),
              y: c.touch_capable ? Math.round(f.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(e.pageY - (d.offset() ? d.offset().top : 0))
            },
            time: Date.now(),
            target: e.target
          };
        return u(b, "tapend", e, g), !0
      })
    },
    remove: function() {
      a(this).off(c.endevent, a(this).data.callee)
    }
  }, a.event.special.taphold = {
    setup: function() {
      var e, b = this,
        d = a(b),
        f = {
          x: 0,
          y: 0
        },
        g = 0,
        h = 0;
      d.on(c.startevent, function a(i) {
        if (i.which && 1 !== i.which) return !1;
        d.data("tapheld", !1), e = i.target;
        var j = i.originalEvent,
          k = Date.now(),
          l = {
            x: c.touch_capable ? j.touches[0].screenX : i.screenX,
            y: c.touch_capable ? j.touches[0].screenY : i.screenY
          },
          m = {
            x: c.touch_capable ? j.touches[0].pageX - j.touches[0].target.offsetLeft : i.offsetX,
            y: c.touch_capable ? j.touches[0].pageY - j.touches[0].target.offsetTop : i.offsetY
          };
        f.x = i.originalEvent.targetTouches ? i.originalEvent.targetTouches[0].pageX : i.pageX, f.y = i.originalEvent.targetTouches ? i.originalEvent.targetTouches[0].pageY : i.pageY, g = f.x, h = f.y;
        var n = d.parent().data("threshold") ? d.parent().data("threshold") : d.data("threshold"),
          o = "undefined" != typeof n && n !== !1 && parseInt(n) ? parseInt(n) : c.taphold_threshold;
        return c.hold_timer = window.setTimeout(function() {
          var n = f.x - g,
            o = f.y - h;
          if (i.target == e && (f.x == g && f.y == h || n >= -c.tap_pixel_range && n <= c.tap_pixel_range && o >= -c.tap_pixel_range && o <= c.tap_pixel_range)) {
            d.data("tapheld", !0);
            var p = Date.now(),
              q = {
                x: c.touch_capable ? j.touches[0].screenX : i.screenX,
                y: c.touch_capable ? j.touches[0].screenY : i.screenY
              },
              r = {
                x: c.touch_capable ? Math.round(j.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(i.pageX - (d.offset() ? d.offset().left : 0)),
                y: c.touch_capable ? Math.round(j.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(i.pageY - (d.offset() ? d.offset().top : 0))
              },
              s = p - k,
              t = {
                startTime: k,
                endTime: p,
                startPosition: l,
                startOffset: m,
                endPosition: q,
                endOffset: r,
                duration: s,
                target: i.target
              };
            d.data("callee1", a), u(b, "taphold", i, t)
          }
        }, o), !0
      }).on(c.endevent, function a() {
        d.data("callee2", a), d.data("tapheld", !1), window.clearTimeout(c.hold_timer)
      }).on(c.moveevent, function a(b) {
        d.data("callee3", a), g = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, h = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY
      })
    },
    remove: function() {
      a(this).off(c.startevent, a(this).data.callee1).off(c.endevent, a(this).data.callee2).off(c.moveevent, a(this).data.callee3)
    }
  }, a.event.special.doubletap = {
    setup: function() {
      var e, f, h, i, b = this,
        d = a(b),
        g = null,
        j = !1;
      d.on(c.startevent, function a(b) {
        return (!b.which || 1 === b.which) && (d.data("doubletapped", !1), e = b.target, d.data("callee1", a), h = b.originalEvent, g || (g = {
          position: {
            x: c.touch_capable ? h.touches[0].screenX : b.screenX,
            y: c.touch_capable ? h.touches[0].screenY : b.screenY
          },
          offset: {
            x: c.touch_capable ? Math.round(h.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(b.pageX - (d.offset() ? d.offset().left : 0)),
            y: c.touch_capable ? Math.round(h.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(b.pageY - (d.offset() ? d.offset().top : 0))
          },
          time: Date.now(),
          target: b.target
        }), !0)
      }).on(c.endevent, function a(k) {
        var l = Date.now(),
          m = d.data("lastTouch") || l + 1,
          n = l - m;
        if (window.clearTimeout(f), d.data("callee2", a), n < c.doubletap_int && k.target == e && n > 100) {
          d.data("doubletapped", !0), window.clearTimeout(c.tap_timer);
          var o = {
              position: {
                x: c.touch_capable ? k.originalEvent.changedTouches[0].screenX : k.screenX,
                y: c.touch_capable ? k.originalEvent.changedTouches[0].screenY : k.screenY
              },
              offset: {
                x: c.touch_capable ? Math.round(h.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(k.pageX - (d.offset() ? d.offset().left : 0)),
                y: c.touch_capable ? Math.round(h.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(k.pageY - (d.offset() ? d.offset().top : 0))
              },
              time: Date.now(),
              target: k.target
            },
            p = {
              firstTap: g,
              secondTap: o,
              interval: o.time - g.time
            };
          j || (u(b, "doubletap", k, p), g = null), j = !0, i = window.setTimeout(function() {
            j = !1
          }, c.doubletap_int)
        } else d.data("lastTouch", l), f = window.setTimeout(function() {
          g = null, window.clearTimeout(f)
        }, c.doubletap_int, [k]);
        d.data("lastTouch", l)
      })
    },
    remove: function() {
      a(this).off(c.startevent, a(this).data.callee1).off(c.endevent, a(this).data.callee2)
    }
  }, a.event.special.singletap = {
    setup: function() {
      var b = this,
        d = a(b),
        e = null,
        f = null,
        g = {
          x: 0,
          y: 0
        };
      d.on(c.startevent, function a(b) {
        return (!b.which || 1 === b.which) && (f = Date.now(), e = b.target, d.data("callee1", a), g.x = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, g.y = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY, !0)
      }).on(c.endevent, function a(h) {
        if (d.data("callee2", a), h.target == e) {
          var i = h.originalEvent.changedTouches ? h.originalEvent.changedTouches[0].pageX : h.pageX,
            j = h.originalEvent.changedTouches ? h.originalEvent.changedTouches[0].pageY : h.pageY;
          c.tap_timer = window.setTimeout(function() {
            var a = g.x - i,
              e = g.y - j;
            if (!d.data("doubletapped") && !d.data("tapheld") && (g.x == i && g.y == j || a >= -c.tap_pixel_range && a <= c.tap_pixel_range && e >= -c.tap_pixel_range && e <= c.tap_pixel_range)) {
              var k = h.originalEvent,
                l = {
                  position: {
                    x: c.touch_capable ? k.changedTouches[0].screenX : h.screenX,
                    y: c.touch_capable ? k.changedTouches[0].screenY : h.screenY
                  },
                  offset: {
                    x: c.touch_capable ? Math.round(k.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(h.pageX - (d.offset() ? d.offset().left : 0)),
                    y: c.touch_capable ? Math.round(k.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(h.pageY - (d.offset() ? d.offset().top : 0))
                  },
                  time: Date.now(),
                  target: h.target
                };
              l.time - f < c.taphold_threshold && u(b, "singletap", h, l)
            }
          }, c.doubletap_int)
        }
      })
    },
    remove: function() {
      a(this).off(c.startevent, a(this).data.callee1).off(c.endevent, a(this).data.callee2)
    }
  }, a.event.special.tap = {
    setup: function() {
      var g, i, b = this,
        d = a(b),
        e = !1,
        f = null,
        h = {
          x: 0,
          y: 0
        };
      d.on(c.startevent, function a(b) {
        return d.data("callee1", a), (!b.which || 1 === b.which) && (e = !0, h.x = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, h.y = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY, g = Date.now(), f = b.target, i = b.originalEvent.targetTouches ? b.originalEvent.targetTouches : [b], !0)
      }).on(c.endevent, function a(j) {
        d.data("callee2", a);
        var k = j.originalEvent.targetTouches ? j.originalEvent.changedTouches[0].pageX : j.pageX,
          l = j.originalEvent.targetTouches ? j.originalEvent.changedTouches[0].pageY : j.pageY,
          m = h.x - k,
          n = h.y - l;
        if (f == j.target && e && Date.now() - g < c.taphold_threshold && (h.x == k && h.y == l || m >= -c.tap_pixel_range && m <= c.tap_pixel_range && n >= -c.tap_pixel_range && n <= c.tap_pixel_range)) {
          for (var p = j.originalEvent, q = [], r = 0; r < i.length; r++) {
            var s = {
              position: {
                x: c.touch_capable ? p.changedTouches[r].screenX : j.screenX,
                y: c.touch_capable ? p.changedTouches[r].screenY : j.screenY
              },
              offset: {
                x: c.touch_capable ? Math.round(p.changedTouches[r].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(j.pageX - (d.offset() ? d.offset().left : 0)),
                y: c.touch_capable ? Math.round(p.changedTouches[r].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(j.pageY - (d.offset() ? d.offset().top : 0))
              },
              time: Date.now(),
              target: j.target
            };
            q.push(s)
          }
          u(b, "tap", j, q)
        }
      })
    },
    remove: function() {
      a(this).off(c.startevent, a(this).data.callee1).off(c.endevent, a(this).data.callee2)
    }
  }, a.event.special.swipe = {
    setup: function() {
      function j(b) {
        d = a(b.currentTarget), d.data("callee1", j), g.x = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, g.y = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY, h.x = g.x, h.y = g.y, e = !0;
        var f = b.originalEvent;
        i = {
          position: {
            x: c.touch_capable ? f.touches[0].screenX : b.screenX,
            y: c.touch_capable ? f.touches[0].screenY : b.screenY
          },
          offset: {
            x: c.touch_capable ? Math.round(f.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(b.pageX - (d.offset() ? d.offset().left : 0)),
            y: c.touch_capable ? Math.round(f.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(b.pageY - (d.offset() ? d.offset().top : 0))
          },
          time: Date.now(),
          target: b.target
        }
      }

      function k(b) {
        d = a(b.currentTarget), d.data("callee2", k), h.x = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, h.y = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY;
        var j, l = d.parent().data("xthreshold") ? d.parent().data("xthreshold") : d.data("xthreshold"),
          m = d.parent().data("ythreshold") ? d.parent().data("ythreshold") : d.data("ythreshold"),
          n = "undefined" != typeof l && l !== !1 && parseInt(l) ? parseInt(l) : c.swipe_h_threshold,
          o = "undefined" != typeof m && m !== !1 && parseInt(m) ? parseInt(m) : c.swipe_v_threshold;
        if (g.y > h.y && g.y - h.y > o && (j = "swipeup"), g.x < h.x && h.x - g.x > n && (j = "swiperight"), g.y < h.y && h.y - g.y > o && (j = "swipedown"), g.x > h.x && g.x - h.x > n && (j = "swipeleft"), void 0 != j && e) {
          g.x = 0, g.y = 0, h.x = 0, h.y = 0, e = !1;
          var p = b.originalEvent,
            q = {
              position: {
                x: c.touch_capable ? p.touches[0].screenX : b.screenX,
                y: c.touch_capable ? p.touches[0].screenY : b.screenY
              },
              offset: {
                x: c.touch_capable ? Math.round(p.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(b.pageX - (d.offset() ? d.offset().left : 0)),
                y: c.touch_capable ? Math.round(p.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(b.pageY - (d.offset() ? d.offset().top : 0))
              },
              time: Date.now(),
              target: b.target
            },
            r = Math.abs(i.position.x - q.position.x),
            s = Math.abs(i.position.y - q.position.y),
            t = {
              startEvnt: i,
              endEvnt: q,
              direction: j.replace("swipe", ""),
              xAmount: r,
              yAmount: s,
              duration: q.time - i.time
            };
          f = !0, d.trigger("swipe", t).trigger(j, t)
        }
      }

      function l(b) {
        d = a(b.currentTarget);
        var g = "";
        if (d.data("callee3", l), f) {
          var h = d.data("xthreshold"),
            j = d.data("ythreshold"),
            k = "undefined" != typeof h && h !== !1 && parseInt(h) ? parseInt(h) : c.swipe_h_threshold,
            m = "undefined" != typeof j && j !== !1 && parseInt(j) ? parseInt(j) : c.swipe_v_threshold,
            n = b.originalEvent,
            o = {
              position: {
                x: c.touch_capable ? n.changedTouches[0].screenX : b.screenX,
                y: c.touch_capable ? n.changedTouches[0].screenY : b.screenY
              },
              offset: {
                x: c.touch_capable ? Math.round(n.changedTouches[0].pageX - (d.offset() ? d.offset().left : 0)) : Math.round(b.pageX - (d.offset() ? d.offset().left : 0)),
                y: c.touch_capable ? Math.round(n.changedTouches[0].pageY - (d.offset() ? d.offset().top : 0)) : Math.round(b.pageY - (d.offset() ? d.offset().top : 0))
              },
              time: Date.now(),
              target: b.target
            };
          i.position.y > o.position.y && i.position.y - o.position.y > m && (g = "swipeup"), i.position.x < o.position.x && o.position.x - i.position.x > k && (g = "swiperight"), i.position.y < o.position.y && o.position.y - i.position.y > m && (g = "swipedown"), i.position.x > o.position.x && i.position.x - o.position.x > k && (g = "swipeleft");
          var p = Math.abs(i.position.x - o.position.x),
            q = Math.abs(i.position.y - o.position.y),
            r = {
              startEvnt: i,
              endEvnt: o,
              direction: g.replace("swipe", ""),
              xAmount: p,
              yAmount: q,
              duration: o.time - i.time
            };
          d.trigger("swipeend", r)
        }
        e = !1, f = !1
      }
      var i, b = this,
        d = a(b),
        e = !1,
        f = !1,
        g = {
          x: 0,
          y: 0
        },
        h = {
          x: 0,
          y: 0
        };
      d.on(c.startevent, j), d.on(c.moveevent, k), d.on(c.endevent, l)
    },
    remove: function() {
      a(this).off(c.startevent, a(this).data.callee1).off(c.moveevent, a(this).data.callee2).off(c.endevent, a(this).data.callee3)
    }
  }, a.event.special.scrollstart = {
    setup: function() {
      function g(a, c) {
        e = c, u(b, e ? "scrollstart" : "scrollend", a)
      }
      var e, f, b = this,
        d = a(b);
      d.on(c.scrollevent, function a(b) {
        d.data("callee", a), e || g(b, !0), clearTimeout(f), f = setTimeout(function() {
          g(b, !1)
        }, 50)
      })
    },
    remove: function() {
      a(this).off(c.scrollevent, a(this).data.callee)
    }
  };
  var e, f, g, h, i, d = a(window),
    j = {
      0: !0,
      180: !0
    };
  if (c.orientation_support) {
    var k = window.innerWidth || d.width(),
      l = window.innerHeight || d.height(),
      m = 50;
    h = k > l && k - l > m, i = j[window.orientation], (h && i || !h && !i) && (j = {
      "-90": !0,
      90: !0
    })
  }
  a.event.special.orientationchange = e = {
    setup: function() {
      return !c.orientation_support && (g = f(), d.on("throttledresize", n), !0)
    },
    teardown: function() {
      return !c.orientation_support && (d.off("throttledresize", n), !0)
    },
    add: function(a) {
      var b = a.handler;
      a.handler = function(a) {
        return a.orientation = f(), b.apply(this, arguments)
      }
    }
  }, a.event.special.orientationchange.orientation = f = function() {
    var a = !0,
      b = document.documentElement;
    return a = c.orientation_support ? j[window.orientation] : b && b.clientWidth / b.clientHeight < 1.1, a ? "portrait" : "landscape"
  }, a.event.special.throttledresize = {
    setup: function() {
      a(this).on("resize", p)
    },
    teardown: function() {
      a(this).off("resize", p)
    }
  };
  var r, s, t, o = 250,
    p = function() {
      s = Date.now(), t = s - q, t >= o ? (q = s, a(this).trigger("throttledresize")) : (r && window.clearTimeout(r), r = window.setTimeout(n, o - t))
    },
    q = 0;
  a.each({
    scrollend: "scrollstart",
    swipeup: "swipe",
    swiperight: "swipe",
    swipedown: "swipe",
    swipeleft: "swipe",
    swipeend: "swipe",
    tap2: "tap"
  }, function(b, c) {
    a.event.special[b] = {
      setup: function() {
        a(this).on(c, a.noop)
      }
    }
  })
}(jQuery);;
/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+apacheconf+c+bash+cpp+csharp+ruby+css-extras+git+java+json+markdown+nginx+php+php-extras+sass+scss+twig+yaml&plugins=line-highlight */
var _self = (typeof window !== 'undefined') ? window // if in browser
  : (
    (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self // if in worker
    : {} // if in node js
  );

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function() {

  // Private helper vars
  var lang = /\blang(?:uage)?-(\w+)\b/i;
  var uniqueId = 0;

  var _ = _self.Prism = {
    manual: _self.Prism && _self.Prism.manual,
    util: {
      encode: function(tokens) {
        if (tokens instanceof Token) {
          return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
        } else if (_.util.type(tokens) === 'Array') {
          return tokens.map(_.util.encode);
        } else {
          return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
        }
      },

      type: function(o) {
        return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
      },

      objId: function(obj) {
        if (!obj['__id']) {
          Object.defineProperty(obj, '__id', {
            value: ++uniqueId
          });
        }
        return obj['__id'];
      },

      // Deep clone a language definition (e.g. to extend it)
      clone: function(o) {
        var type = _.util.type(o);

        switch (type) {
          case 'Object':
            var clone = {};

            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = _.util.clone(o[key]);
              }
            }

            return clone;

          case 'Array':
            return o.map(function(v) {
              return _.util.clone(v);
            });
        }

        return o;
      }
    },

    languages: {
      extend: function(id, redef) {
        var lang = _.util.clone(_.languages[id]);

        for (var key in redef) {
          lang[key] = redef[key];
        }

        return lang;
      },

      /**
       * Insert a token before another token in a language literal
       * As this needs to recreate the object (we cannot actually insert before keys in object literals),
       * we cannot just provide an object, we need anobject and a key.
       * @param inside The key (or language id) of the parent
       * @param before The key to insert before. If not provided, the function appends instead.
       * @param insert Object with the key/value pairs to insert
       * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
       */
      insertBefore: function(inside, before, insert, root) {
        root = root || _.languages;
        var grammar = root[inside];

        if (arguments.length == 2) {
          insert = arguments[1];

          for (var newToken in insert) {
            if (insert.hasOwnProperty(newToken)) {
              grammar[newToken] = insert[newToken];
            }
          }

          return grammar;
        }

        var ret = {};

        for (var token in grammar) {

          if (grammar.hasOwnProperty(token)) {

            if (token == before) {

              for (var newToken in insert) {

                if (insert.hasOwnProperty(newToken)) {
                  ret[newToken] = insert[newToken];
                }
              }
            }

            ret[token] = grammar[token];
          }
        }

        // Update references in other language definitions
        _.languages.DFS(_.languages, function(key, value) {
          if (value === root[inside] && key != inside) {
            this[key] = ret;
          }
        });

        return root[inside] = ret;
      },

      // Traverse a language definition with Depth First Search
      DFS: function(o, callback, type, visited) {
        visited = visited || {};
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);

            if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
              visited[_.util.objId(o[i])] = true;
              _.languages.DFS(o[i], callback, null, visited);
            } else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
              visited[_.util.objId(o[i])] = true;
              _.languages.DFS(o[i], callback, i, visited);
            }
          }
        }
      }
    },
    plugins: {},

    highlightAll: function(async, callback) {
      var env = {
        callback: callback,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };

      _.hooks.run("before-highlightall", env);

      var elements = env.elements || document.querySelectorAll(env.selector);

      for (var i = 0, element; element = elements[i++];) {
        _.highlightElement(element, async === true, env.callback);
      }
    },

    highlightElement: function(element, async, callback) {
      // Find language
      var language, grammar, parent = element;

      while (parent && !lang.test(parent.className)) {
        parent = parent.parentNode;
      }

      if (parent) {
        language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
        grammar = _.languages[language];
      }

      // Set language on the element, if not present
      element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

      // Set language on the parent, for styling
      parent = element.parentNode;

      if (/pre/i.test(parent.nodeName)) {
        parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
      }

      var code = element.textContent;

      var env = {
        element: element,
        language: language,
        grammar: grammar,
        code: code
      };

      _.hooks.run('before-sanity-check', env);

      if (!env.code || !env.grammar) {
        if (env.code) {
          _.hooks.run('before-highlight', env);
          env.element.textContent = env.code;
          _.hooks.run('after-highlight', env);
        }
        _.hooks.run('complete', env);
        return;
      }

      _.hooks.run('before-highlight', env);

      if (async && _self.Worker) {
        var worker = new Worker(_.filename);

        worker.onmessage = function(evt) {
          env.highlightedCode = evt.data;

          _.hooks.run('before-insert', env);

          env.element.innerHTML = env.highlightedCode;

          callback && callback.call(env.element);
          _.hooks.run('after-highlight', env);
          _.hooks.run('complete', env);
        };

        worker.postMessage(JSON.stringify({
          language: env.language,
          code: env.code,
          immediateClose: true
        }));
      } else {
        env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

        _.hooks.run('before-insert', env);

        env.element.innerHTML = env.highlightedCode;

        callback && callback.call(element);

        _.hooks.run('after-highlight', env);
        _.hooks.run('complete', env);
      }
    },

    highlight: function(text, grammar, language) {
      var tokens = _.tokenize(text, grammar);
      return Token.stringify(_.util.encode(tokens), language);
    },

    matchGrammar: function(text, strarr, grammar, index, startPos, oneshot, target) {
      var Token = _.Token;

      for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }

        if (token == target) {
          return;
        }

        var patterns = grammar[token];
        patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

        for (var j = 0; j < patterns.length; ++j) {
          var pattern = patterns[j],
            inside = pattern.inside,
            lookbehind = !!pattern.lookbehind,
            greedy = !!pattern.greedy,
            lookbehindLength = 0,
            alias = pattern.alias;

          if (greedy && !pattern.pattern.global) {
            // Without the global flag, lastIndex won't work
            var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
            pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
          }

          pattern = pattern.pattern || pattern;

          // Don’t cache length as it changes during the loop
          for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

            var str = strarr[i];

            if (strarr.length > text.length) {
              // Something went terribly wrong, ABORT, ABORT!
              return;
            }

            if (str instanceof Token) {
              continue;
            }

            pattern.lastIndex = 0;

            var match = pattern.exec(str),
              delNum = 1;

            // Greedy patterns can override/remove up to two previously matched tokens
            if (!match && greedy && i != strarr.length - 1) {
              pattern.lastIndex = pos;
              match = pattern.exec(text);
              if (!match) {
                break;
              }

              var from = match.index + (lookbehind ? match[1].length : 0),
                to = match.index + match[0].length,
                k = i,
                p = pos;

              for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
                p += strarr[k].length;
                // Move the index i to the element in strarr that is closest to from
                if (from >= p) {
                  ++i;
                  pos = p;
                }
              }

              /*
               * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
               * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
               */
              if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
                continue;
              }

              // Number of tokens to delete and replace with the new match
              delNum = k - i;
              str = text.slice(pos, p);
              match.index -= pos;
            }

            if (!match) {
              if (oneshot) {
                break;
              }

              continue;
            }

            if (lookbehind) {
              lookbehindLength = match[1].length;
            }

            var from = match.index + lookbehindLength,
              match = match[0].slice(lookbehindLength),
              to = from + match.length,
              before = str.slice(0, from),
              after = str.slice(to);

            var args = [i, delNum];

            if (before) {
              ++i;
              pos += before.length;
              args.push(before);
            }

            var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);

            args.push(wrapped);

            if (after) {
              args.push(after);
            }

            Array.prototype.splice.apply(strarr, args);

            if (delNum != 1)
              _.matchGrammar(text, strarr, grammar, i, pos, true, token);

            if (oneshot)
              break;
          }
        }
      }
    },

    tokenize: function(text, grammar, language) {
      var strarr = [text];

      var rest = grammar.rest;

      if (rest) {
        for (var token in rest) {
          grammar[token] = rest[token];
        }

        delete grammar.rest;
      }

      _.matchGrammar(text, strarr, grammar, 0, 0, false);

      return strarr;
    },

    hooks: {
      all: {},

      add: function(name, callback) {
        var hooks = _.hooks.all;

        hooks[name] = hooks[name] || [];

        hooks[name].push(callback);
      },

      run: function(name, env) {
        var callbacks = _.hooks.all[name];

        if (!callbacks || !callbacks.length) {
          return;
        }

        for (var i = 0, callback; callback = callbacks[i++];) {
          callback(env);
        }
      }
    }
  };

  var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
    this.type = type;
    this.content = content;
    this.alias = alias;
    // Copy of the full string this token was created from
    this.length = (matchedStr || "").length | 0;
    this.greedy = !!greedy;
  };

  Token.stringify = function(o, language, parent) {
    if (typeof o == 'string') {
      return o;
    }

    if (_.util.type(o) === 'Array') {
      return o.map(function(element) {
        return Token.stringify(element, language, o);
      }).join('');
    }

    var env = {
      type: o.type,
      content: Token.stringify(o.content, language, parent),
      tag: 'span',
      classes: ['token', o.type],
      attributes: {},
      language: language,
      parent: parent
    };

    if (o.alias) {
      var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
      Array.prototype.push.apply(env.classes, aliases);
    }

    _.hooks.run('wrap', env);

    var attributes = Object.keys(env.attributes).map(function(name) {
      return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
    }).join(' ');

    return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

  };

  if (!_self.document) {
    if (!_self.addEventListener) {
      // in Node.js
      return _self.Prism;
    }
    // In worker
    _self.addEventListener('message', function(evt) {
      var message = JSON.parse(evt.data),
        lang = message.language,
        code = message.code,
        immediateClose = message.immediateClose;

      _self.postMessage(_.highlight(code, _.languages[lang], lang));
      if (immediateClose) {
        _self.close();
      }
    }, false);

    return _self.Prism;
  }

  //Get current script and highlight
  var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

  if (script) {
    _.filename = script.src;

    if (!_.manual && !script.hasAttribute('data-manual')) {
      if (document.readyState !== "loading") {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(_.highlightAll);
        } else {
          window.setTimeout(_.highlightAll, 16);
        }
      } else {
        document.addEventListener('DOMContentLoaded', _.highlightAll);
      }
    }
  }

  return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
  global.Prism = Prism;
};
Prism.languages.markup = {
  'comment': /<!--[\s\S]*?-->/,
  'prolog': /<\?[\s\S]+?\?>/,
  'doctype': /<!DOCTYPE[\s\S]+?>/i,
  'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/
        }
      },
      'attr-value': {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: {
          'punctuation': [
            /^=/, {
              pattern: /(^|[^\\])["']/,
              lookbehind: true
            }
          ]
        }
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/
        }
      }

    }
  },
  'entity': /&#?[\da-z]{1,8};/i
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
  Prism.languages.markup['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.css = {
  'comment': /\/\*[\s\S]*?\*\//,
  'atrule': {
    pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
    inside: {
      'rule': /@[\w-]+/
        // See rest below
    }
  },
  'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
  'string': {
    pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'property': /[\w-]+(?=\s*:)/i,
  'important': /\B!important\b/i,
  'function': /[-a-z0-9]+(?=\()/i,
  'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'style': {
      pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
      lookbehind: true,
      inside: Prism.languages.css,
      alias: 'language-css'
    }
  });

  Prism.languages.insertBefore('inside', 'attr-value', {
    'style-attr': {
      pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
      inside: {
        'attr-name': {
          pattern: /^\s*style/i,
          inside: Prism.languages.markup.tag.inside
        },
        'punctuation': /^\s*=\s*['"]|['"]\s*$/,
        'attr-value': {
          pattern: /.+/i,
          inside: Prism.languages.css
        }
      },
      alias: 'language-css'
    }
  }, Prism.languages.markup.tag);
};
Prism.languages.clike = {
  'comment': [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: true
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true
  }],
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'class-name': {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: true,
    inside: {
      punctuation: /[.\\]/
    }
  },
  'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  'boolean': /\b(?:true|false)\b/,
  'function': /[a-z0-9_]+(?=\()/i,
  'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
  'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  'punctuation': /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend('clike', {
  'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  'number': /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*\()/i,
  'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: /(^|[^/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
    lookbehind: true,
    greedy: true
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  'function-variable': {
    pattern: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)\s*=>))/i,
    alias: 'function'
  }
});

Prism.languages.insertBefore('javascript', 'string', {
  'template-string': {
    pattern: /`(?:\\[\s\S]|[^\\`])*`/,
    greedy: true,
    inside: {
      'interpolation': {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      'string': /[\s\S]+/
    }
  }
});

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'script': {
      pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript,
      alias: 'language-javascript'
    }
  });
}

Prism.languages.js = Prism.languages.javascript;

Prism.languages.apacheconf = {
  'comment': /#.*/,
  'directive-inline': {
    pattern: /^(\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|AddAlt|AddAltByEncoding|AddAltByType|AddCharset|AddDefaultCharset|AddDescription|AddEncoding|AddHandler|AddIcon|AddIconByEncoding|AddIconByType|AddInputFilter|AddLanguage|AddModuleInfo|AddOutputFilter|AddOutputFilterByType|AddType|Alias|AliasMatch|Allow|AllowCONNECT|AllowEncodedSlashes|AllowMethods|AllowOverride|AllowOverrideList|Anonymous|Anonymous_LogEmail|Anonymous_MustGiveEmail|Anonymous_NoUserID|Anonymous_VerifyEmail|AsyncRequestWorkerFactor|AuthBasicAuthoritative|AuthBasicFake|AuthBasicProvider|AuthBasicUseDigestAlgorithm|AuthDBDUserPWQuery|AuthDBDUserRealmQuery|AuthDBMGroupFile|AuthDBMType|AuthDBMUserFile|AuthDigestAlgorithm|AuthDigestDomain|AuthDigestNonceLifetime|AuthDigestProvider|AuthDigestQop|AuthDigestShmemSize|AuthFormAuthoritative|AuthFormBody|AuthFormDisableNoStore|AuthFormFakeBasicAuth|AuthFormLocation|AuthFormLoginRequiredLocation|AuthFormLoginSuccessLocation|AuthFormLogoutLocation|AuthFormMethod|AuthFormMimetype|AuthFormPassword|AuthFormProvider|AuthFormSitePassphrase|AuthFormSize|AuthFormUsername|AuthGroupFile|AuthLDAPAuthorizePrefix|AuthLDAPBindAuthoritative|AuthLDAPBindDN|AuthLDAPBindPassword|AuthLDAPCharsetConfig|AuthLDAPCompareAsUser|AuthLDAPCompareDNOnServer|AuthLDAPDereferenceAliases|AuthLDAPGroupAttribute|AuthLDAPGroupAttributeIsDN|AuthLDAPInitialBindAsUser|AuthLDAPInitialBindPattern|AuthLDAPMaxSubGroupDepth|AuthLDAPRemoteUserAttribute|AuthLDAPRemoteUserIsDN|AuthLDAPSearchAsUser|AuthLDAPSubGroupAttribute|AuthLDAPSubGroupClass|AuthLDAPUrl|AuthMerging|AuthName|AuthnCacheContext|AuthnCacheEnable|AuthnCacheProvideFor|AuthnCacheSOCache|AuthnCacheTimeout|AuthnzFcgiCheckAuthnProvider|AuthnzFcgiDefineProvider|AuthType|AuthUserFile|AuthzDBDLoginToReferer|AuthzDBDQuery|AuthzDBDRedirectQuery|AuthzDBMType|AuthzSendForbiddenOnFailure|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferedLogs|BufferSize|CacheDefaultExpire|CacheDetailHeader|CacheDirLength|CacheDirLevels|CacheDisable|CacheEnable|CacheFile|CacheHeader|CacheIgnoreCacheControl|CacheIgnoreHeaders|CacheIgnoreNoLastMod|CacheIgnoreQueryString|CacheIgnoreURLSessionIdentifiers|CacheKeyBaseURL|CacheLastModifiedFactor|CacheLock|CacheLockMaxAge|CacheLockPath|CacheMaxExpire|CacheMaxFileSize|CacheMinExpire|CacheMinFileSize|CacheNegotiatedDocs|CacheQuickHandler|CacheReadSize|CacheReadTime|CacheRoot|CacheSocache|CacheSocacheMaxSize|CacheSocacheMaxTime|CacheSocacheMinTime|CacheSocacheReadSize|CacheSocacheReadTime|CacheStaleOnError|CacheStoreExpired|CacheStoreNoStore|CacheStorePrivate|CGIDScriptTimeout|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|DeflateBufferSize|DeflateCompressionLevel|DeflateFilterNote|DeflateInflateLimitRequestBody|DeflateInflateRatioBurst|DeflateInflateRatioLimit|DeflateMemLevel|DeflateWindowSize|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DTracePrivileges|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtendedStatus|ExtFilterDefine|ExtFilterOptions|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|HeartbeatAddress|HeartbeatListen|HeartbeatMaxServers|HeartbeatStorage|HeartbeatStorage|HostnameLookups|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|IndexHeadInsert|IndexIgnore|IndexIgnoreReset|IndexOptions|IndexOrderDefault|IndexStyleSheet|InputSed|ISAPIAppendLogToErrors|ISAPIAppendLogToQuery|ISAPICacheFile|ISAPIFakeAsync|ISAPILogNotSupported|ISAPIReadAheadBuffer|KeepAlive|KeepAliveTimeout|KeptBodySize|LanguagePriority|LDAPCacheEntries|LDAPCacheTTL|LDAPConnectionPoolTTL|LDAPConnectionTimeout|LDAPLibraryDebug|LDAPOpCacheEntries|LDAPOpCacheTTL|LDAPReferralHopLimit|LDAPReferrals|LDAPRetries|LDAPRetryDelay|LDAPSharedCacheFile|LDAPSharedCacheSize|LDAPTimeout|LDAPTrustedClientCert|LDAPTrustedGlobalCert|LDAPTrustedMode|LDAPVerifyServerCert|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldSize|LimitRequestLine|LimitXMLRequestBody|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|LuaHookAccessChecker|LuaHookAuthChecker|LuaHookCheckUserID|LuaHookFixups|LuaHookInsertFilter|LuaHookLog|LuaHookMapToStorage|LuaHookTranslateName|LuaHookTypeChecker|LuaInherit|LuaInputFilter|LuaMapHandler|LuaOutputFilter|LuaPackageCPath|LuaPackagePath|LuaQuickHandler|LuaRoot|LuaScope|MaxConnectionsPerChild|MaxKeepAliveRequests|MaxMemFree|MaxRangeOverlaps|MaxRangeReversals|MaxRanges|MaxRequestWorkers|MaxSpareServers|MaxSpareThreads|MaxThreads|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|MMapFile|ModemStandard|ModMimeUsePathInfo|MultiviewsMatch|Mutex|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|ProxyAddHeaders|ProxyBadHeader|ProxyBlock|ProxyDomain|ProxyErrorOverride|ProxyExpressDBMFile|ProxyExpressDBMType|ProxyExpressEnable|ProxyFtpDirCharset|ProxyFtpEscapeWildcards|ProxyFtpListOnWildcard|ProxyHTMLBufSize|ProxyHTMLCharsetOut|ProxyHTMLDocType|ProxyHTMLEnable|ProxyHTMLEvents|ProxyHTMLExtended|ProxyHTMLFixups|ProxyHTMLInterp|ProxyHTMLLinks|ProxyHTMLMeta|ProxyHTMLStripComments|ProxyHTMLURLMap|ProxyIOBufferSize|ProxyMaxForwards|ProxyPass|ProxyPassInherit|ProxyPassInterpolateEnv|ProxyPassMatch|ProxyPassReverse|ProxyPassReverseCookieDomain|ProxyPassReverseCookiePath|ProxyPreserveHost|ProxyReceiveBufferSize|ProxyRemote|ProxyRemoteMatch|ProxyRequests|ProxySCGIInternalRedirect|ProxySCGISendfile|ProxySet|ProxySourceAddress|ProxyStatus|ProxyTimeout|ProxyVia|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIPHeader|RemoteIPInternalProxy|RemoteIPInternalProxyList|RemoteIPProxiesHeader|RemoteIPTrustedProxy|RemoteIPTrustedProxyList|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|RewriteBase|RewriteCond|RewriteEngine|RewriteMap|RewriteOptions|RewriteRule|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScoreBoardFile|Script|ScriptAlias|ScriptAliasMatch|ScriptInterpreterSource|ScriptLog|ScriptLogBuffer|ScriptLogLength|ScriptSock|SecureListen|SeeRequestTail|SendBufferSize|ServerAdmin|ServerAlias|ServerLimit|ServerName|ServerPath|ServerRoot|ServerSignature|ServerTokens|Session|SessionCookieName|SessionCookieName2|SessionCookieRemove|SessionCryptoCipher|SessionCryptoDriver|SessionCryptoPassphrase|SessionCryptoPassphraseFile|SessionDBDCookieName|SessionDBDCookieName2|SessionDBDCookieRemove|SessionDBDDeleteLabel|SessionDBDInsertLabel|SessionDBDPerUser|SessionDBDSelectLabel|SessionDBDUpdateLabel|SessionEnv|SessionExclude|SessionHeader|SessionInclude|SessionMaxAge|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIETag|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSLCACertificateFile|SSLCACertificatePath|SSLCADNRequestFile|SSLCADNRequestPath|SSLCARevocationCheck|SSLCARevocationFile|SSLCARevocationPath|SSLCertificateChainFile|SSLCertificateFile|SSLCertificateKeyFile|SSLCipherSuite|SSLCompression|SSLCryptoDevice|SSLEngine|SSLFIPS|SSLHonorCipherOrder|SSLInsecureRenegotiation|SSLOCSPDefaultResponder|SSLOCSPEnable|SSLOCSPOverrideResponder|SSLOCSPResponderTimeout|SSLOCSPResponseMaxAge|SSLOCSPResponseTimeSkew|SSLOCSPUseRequestNonce|SSLOpenSSLConfCmd|SSLOptions|SSLPassPhraseDialog|SSLProtocol|SSLProxyCACertificateFile|SSLProxyCACertificatePath|SSLProxyCARevocationCheck|SSLProxyCARevocationFile|SSLProxyCARevocationPath|SSLProxyCheckPeerCN|SSLProxyCheckPeerExpire|SSLProxyCheckPeerName|SSLProxyCipherSuite|SSLProxyEngine|SSLProxyMachineCertificateChainFile|SSLProxyMachineCertificateFile|SSLProxyMachineCertificatePath|SSLProxyProtocol|SSLProxyVerify|SSLProxyVerifyDepth|SSLRandomSeed|SSLRenegBufferSize|SSLRequire|SSLRequireSSL|SSLSessionCache|SSLSessionCacheTimeout|SSLSessionTicketKeyFile|SSLSRPUnknownUserSeed|SSLSRPVerifierFile|SSLStaplingCache|SSLStaplingErrorCacheTimeout|SSLStaplingFakeTryLater|SSLStaplingForceURL|SSLStaplingResponderTimeout|SSLStaplingResponseMaxAge|SSLStaplingResponseTimeSkew|SSLStaplingReturnResponderErrors|SSLStaplingStandardCacheTimeout|SSLStrictSNIVHostCheck|SSLUserName|SSLUseStapling|SSLVerifyClient|SSLVerifyDepth|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|VirtualDocumentRoot|VirtualDocumentRootIP|VirtualScriptAlias|VirtualScriptAliasIP|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/mi,
    lookbehind: true,
    alias: 'property'
  },
  'directive-block': {
    pattern: /<\/?\b(?:AuthnProviderAlias|AuthzProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|RequireAll|RequireAny|RequireNone|VirtualHost)\b *.*>/i,
    inside: {
      'directive-block': {
        pattern: /^<\/?\w+/,
        inside: {
          'punctuation': /^<\/?/
        },
        alias: 'tag'
      },
      'directive-block-parameter': {
        pattern: /.*[^>]/,
        inside: {
          'punctuation': /:/,
          'string': {
            pattern: /("|').*\1/,
            inside: {
              'variable': /[$%]\{?(?:\w\.?[-+:]?)+\}?/
            }
          }
        },
        alias: 'attr-value'
      },
      'punctuation': />/
    },
    alias: 'tag'
  },
  'directive-flags': {
    pattern: /\[(?:\w,?)+\]/,
    alias: 'keyword'
  },
  'string': {
    pattern: /("|').*\1/,
    inside: {
      'variable': /[$%]\{?(?:\w\.?[-+:]?)+\}?/
    }
  },
  'variable': /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
  'regex': /\^?.*\$|\^.*\$?/
};

Prism.languages.c = Prism.languages.extend('clike', {
  'keyword': /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  'operator': /-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/]/,
  'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i
});

Prism.languages.insertBefore('c', 'string', {
  'macro': {
    // allow for multiline macro definitions
    // spaces after the # character compile fine with gcc
    pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
    lookbehind: true,
    alias: 'property',
    inside: {
      // highlight the path of the include statement as a string
      'string': {
        pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
        lookbehind: true
      },
      // highlight macro directives as keywords
      'directive': {
        pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
        lookbehind: true,
        alias: 'keyword'
      }
    }
  },
  // highlight predefined macros as constants
  'constant': /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
});

delete Prism.languages.c['class-name'];
delete Prism.languages.c['boolean'];

(function(Prism) {
  var insideString = {
    variable: [
      // Arithmetic Environment
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        inside: {
          // If there is a $ sign at the beginning highlight $(( and )) as variable
          variable: [{
              pattern: /(^\$\(\([\s\S]+)\)\)/,
              lookbehind: true
            },
            /^\$\(\(/
          ],
          number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
          // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
          operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
          // If there is no $ sign at the beginning highlight (( and )) as punctuation
          punctuation: /\(\(?|\)\)?|,|;/
        }
      },
      // Command Substitution
      {
        pattern: /\$\([^)]+\)|`[^`]+`/,
        inside: {
          variable: /^\$\(|^`|\)$|`$/
        }
      },
      /\$(?:[\w#?*!@]+|\{[^}]+\})/i
    ]
  };

  Prism.languages.bash = {
    'shebang': {
      pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
      alias: 'important'
    },
    'comment': {
      pattern: /(^|[^"{\\])#.*/,
      lookbehind: true
    },
    'string': [
      //Support for Here-Documents https://en.wikipedia.org/wiki/Here_document
      {
        pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      }, {
        pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
        greedy: true,
        inside: insideString
      }
    ],
    'variable': insideString.variable,
    // Originally based on http://ss64.com/bash/
    'function': {
      pattern: /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
      lookbehind: true
    },
    'keyword': {
      pattern: /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
      lookbehind: true
    },
    'boolean': {
      pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,
      lookbehind: true
    },
    'operator': /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
    'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
  };

  var inside = insideString.variable[1].inside;
  inside['function'] = Prism.languages.bash['function'];
  inside.keyword = Prism.languages.bash.keyword;
  inside.boolean = Prism.languages.bash.boolean;
  inside.operator = Prism.languages.bash.operator;
  inside.punctuation = Prism.languages.bash.punctuation;
})(Prism);

Prism.languages.cpp = Prism.languages.extend('c', {
  'keyword': /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
  'boolean': /\b(?:true|false)\b/,
  'operator': /--?|\+\+?|!=?|<{1,2}=?|>{1,2}=?|->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|\|?|\?|\*|\/|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
});

Prism.languages.insertBefore('cpp', 'keyword', {
  'class-name': {
    pattern: /(class\s+)\w+/i,
    lookbehind: true
  }
});
Prism.languages.csharp = Prism.languages.extend('clike', {
  'keyword': /\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,
  'string': [{
    pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
    greedy: true
  }, {
    pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
    greedy: true
  }],
  'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+f?)\b/i
});

Prism.languages.insertBefore('csharp', 'keyword', {
  'generic-method': {
    pattern: /[a-z0-9_]+\s*<[^>\r\n]+?>\s*(?=\()/i,
    alias: 'function',
    inside: {
      keyword: Prism.languages.csharp.keyword,
      punctuation: /[<>(),.:]/
    }
  },
  'preprocessor': {
    pattern: /(^\s*)#.*/m,
    lookbehind: true,
    alias: 'property',
    inside: {
      // highlight preprocessor directives as keywords
      'directive': {
        pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
        lookbehind: true,
        alias: 'keyword'
      }
    }
  }
});

/**
 * Original by Samuel Flores
 *
 * Adds the following new token classes:
 *    constant, builtin, variable, symbol, regex
 */
(function(Prism) {
  Prism.languages.ruby = Prism.languages.extend('clike', {
    'comment': [
      /#(?!\{[^\r\n]*?\}).*/,
      /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m
    ],
    'keyword': /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
  });

  var interpolation = {
    pattern: /#\{[^}]+\}/,
    inside: {
      'delimiter': {
        pattern: /^#\{|\}$/,
        alias: 'tag'
      },
      rest: Prism.util.clone(Prism.languages.ruby)
    }
  };

  Prism.languages.insertBefore('ruby', 'keyword', {
    'regex': [{
      pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
      greedy: true,
      inside: {
        'interpolation': interpolation
      }
    }, {
      pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
      greedy: true,
      inside: {
        'interpolation': interpolation
      }
    }, {
      // Here we need to specifically allow interpolation
      pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
      greedy: true,
      inside: {
        'interpolation': interpolation
      }
    }, {
      pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
      greedy: true,
      inside: {
        'interpolation': interpolation
      }
    }, {
      pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
      greedy: true,
      inside: {
        'interpolation': interpolation
      }
    }, {
      pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: true,
      greedy: true
    }],
    'variable': /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
    'symbol': /:[a-zA-Z_]\w*(?:[?!]|\b)/
  });

  Prism.languages.insertBefore('ruby', 'number', {
    'builtin': /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
    'constant': /\b[A-Z]\w*(?:[?!]|\b)/
  });

  Prism.languages.ruby.string = [{
    pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
    greedy: true,
    inside: {
      'interpolation': interpolation
    }
  }, {
    pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
    greedy: true,
    inside: {
      'interpolation': interpolation
    }
  }, {
    // Here we need to specifically allow interpolation
    pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
    greedy: true,
    inside: {
      'interpolation': interpolation
    }
  }, {
    pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
    greedy: true,
    inside: {
      'interpolation': interpolation
    }
  }, {
    pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
    greedy: true,
    inside: {
      'interpolation': interpolation
    }
  }, {
    pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
    inside: {
      'interpolation': interpolation
    }
  }];
}(Prism));
Prism.languages.css.selector = {
  pattern: /[^{}\s][^{}]*(?=\s*\{)/,
  inside: {
    'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    'pseudo-class': /:[-\w]+(?:\(.*\))?/,
    'class': /\.[-:.\w]+/,
    'id': /#[-:.\w]+/,
    'attribute': /\[[^\]]+\]/
  }
};

Prism.languages.insertBefore('css', 'function', {
  'hexcode': /#[\da-f]{3,8}/i,
  'entity': /\\[\da-f]{1,8}/i,
  'number': /[\d%.]+/
});
Prism.languages.git = {
  /*
   * A simple one line comment like in a git status command
   * For instance:
   * $ git status
   * # On branch infinite-scroll
   * # Your branch and 'origin/sharedBranches/frontendTeam/infinite-scroll' have diverged,
   * # and have 1 and 2 different commits each, respectively.
   * nothing to commit (working directory clean)
   */
  'comment': /^#.*/m,

  /*
   * Regexp to match the changed lines in a git diff output. Check the example below.
   */
  'deleted': /^[-–].*/m,
  'inserted': /^\+.*/m,

  /*
   * a string (double and simple quote)
   */
  'string': /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,

  /*
   * a git command. It starts with a random prompt finishing by a $, then "git" then some other parameters
   * For instance:
   * $ git add file.txt
   */
  'command': {
    pattern: /^.*\$ git .*$/m,
    inside: {
      /*
       * A git command can contain a parameter starting by a single or a double dash followed by a string
       * For instance:
       * $ git diff --cached
       * $ git log -p
       */
      'parameter': /\s--?\w+/m
    }
  },

  /*
   * Coordinates displayed in a git diff command
   * For instance:
   * $ git diff
   * diff --git file.txt file.txt
   * index 6214953..1d54a52 100644
   * --- file.txt
   * +++ file.txt
   * @@ -1 +1,2 @@
   * -Here's my tetx file
   * +Here's my text file
   * +And this is the second line
   */
  'coord': /^@@.*@@$/m,

  /*
   * Match a "commit [SHA1]" line in a git log output.
   * For instance:
   * $ git log
   * commit a11a14ef7e26f2ca62d4b35eac455ce636d0dc09
   * Author: lgiraudel
   * Date:   Mon Feb 17 11:18:34 2014 +0100
   *
   *     Add of a new line
   */
  'commit_sha1': /^commit \w{40}$/m
};

Prism.languages.java = Prism.languages.extend('clike', {
  'keyword': /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
  'number': /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
  'operator': {
    pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
    lookbehind: true
  }
});

Prism.languages.insertBefore('java', 'function', {
  'annotation': {
    alias: 'punctuation',
    pattern: /(^|[^.])@\w+/,
    lookbehind: true
  }
});

Prism.languages.json = {
  'property': /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
  'string': {
    pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    greedy: true
  },
  'number': /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][+-]?\d+)?)\b/,
  'punctuation': /[{}[\]);,]/,
  'operator': /:/g,
  'boolean': /\b(?:true|false)\b/i,
  'null': /\bnull\b/i
};

Prism.languages.jsonp = Prism.languages.json;

Prism.languages.markdown = Prism.languages.extend('markup', {});
Prism.languages.insertBefore('markdown', 'prolog', {
  'blockquote': {
    // > ...
    pattern: /^>(?:[\t ]*>)*/m,
    alias: 'punctuation'
  },
  'code': [{
    // Prefixed by 4 spaces or 1 tab
    pattern: /^(?: {4}|\t).+/m,
    alias: 'keyword'
  }, {
    // `code`
    // ``code``
    pattern: /``.+?``|`[^`\n]+`/,
    alias: 'keyword'
  }],
  'title': [{
    // title 1
    // =======

    // title 2
    // -------
    pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
    alias: 'important',
    inside: {
      punctuation: /==+$|--+$/
    }
  }, {
    // # title 1
    // ###### title 6
    pattern: /(^\s*)#+.+/m,
    lookbehind: true,
    alias: 'important',
    inside: {
      punctuation: /^#+|#+$/
    }
  }],
  'hr': {
    // ***
    // ---
    // * * *
    // -----------
    pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
    lookbehind: true,
    alias: 'punctuation'
  },
  'list': {
    // * item
    // + item
    // - item
    // 1. item
    pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
    lookbehind: true,
    alias: 'punctuation'
  },
  'url-reference': {
    // [id]: http://example.com "Optional title"
    // [id]: http://example.com 'Optional title'
    // [id]: http://example.com (Optional title)
    // [id]: <http://example.com> "Optional title"
    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
    inside: {
      'variable': {
        pattern: /^(!?\[)[^\]]+/,
        lookbehind: true
      },
      'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
      'punctuation': /^[\[\]!:]|[<>]/
    },
    alias: 'url'
  },
  'bold': {
    // **strong**
    // __strong__

    // Allow only one line break
    pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: true,
    inside: {
      'punctuation': /^\*\*|^__|\*\*$|__$/
    }
  },
  'italic': {
    // *em*
    // _em_

    // Allow only one line break
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: true,
    inside: {
      'punctuation': /^[*_]|[*_]$/
    }
  },
  'url': {
    // [example](http://example.com "Optional title")
    // [example] [id]
    pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      'variable': {
        pattern: /(!?\[)[^\]]+(?=\]$)/,
        lookbehind: true
      },
      'string': {
        pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
      }
    }
  }
});

Prism.languages.markdown['bold'].inside['url'] = Prism.util.clone(Prism.languages.markdown['url']);
Prism.languages.markdown['italic'].inside['url'] = Prism.util.clone(Prism.languages.markdown['url']);
Prism.languages.markdown['bold'].inside['italic'] = Prism.util.clone(Prism.languages.markdown['italic']);
Prism.languages.markdown['italic'].inside['bold'] = Prism.util.clone(Prism.languages.markdown['bold']);
Prism.languages.nginx = Prism.languages.extend('clike', {
  'comment': {
    pattern: /(^|[^"{\\])#.*/,
    lookbehind: true
  },
  'keyword': /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types)\b/i
});

Prism.languages.insertBefore('nginx', 'keyword', {
  'variable': /\$[a-z_]+/i
});
/**
 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
 * Modified by Miles Johnson: http://milesj.me
 *
 * Supports the following:
 *    - Extends clike syntax
 *    - Support for PHP 5.3+ (namespaces, traits, generators, etc)
 *    - Smarter constant and function matching
 *
 * Adds the following new token classes:
 *    constant, delimiter, variable, function, package
 */

Prism.languages.php = Prism.languages.extend('clike', {
  'keyword': /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
  'constant': /\b[A-Z0-9_]{2,}\b/,
  'comment': {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true
  }
});

// Shell-like comments are matched after strings, because they are less
// common than strings containing hashes...
Prism.languages.insertBefore('php', 'class-name', {
  'shell-comment': {
    pattern: /(^|[^\\])#.*/,
    lookbehind: true,
    alias: 'comment'
  }
});

Prism.languages.insertBefore('php', 'keyword', {
  'delimiter': {
    pattern: /\?>|<\?(?:php|=)?/i,
    alias: 'important'
  },
  'variable': /\$\w+\b/i,
  'package': {
    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
    lookbehind: true,
    inside: {
      punctuation: /\\/
    }
  }
});

// Must be defined after the function pattern
Prism.languages.insertBefore('php', 'operator', {
  'property': {
    pattern: /(->)[\w]+/,
    lookbehind: true
  }
});

// Add HTML support if the markup language exists
if (Prism.languages.markup) {

  // Tokenize all inline PHP blocks that are wrapped in <?php ?>
  // This allows for easy PHP + markup highlighting
  Prism.hooks.add('before-highlight', function(env) {
    if (env.language !== 'php' || !/(?:<\?php|<\?)/ig.test(env.code)) {
      return;
    }

    env.tokenStack = [];

    env.backupCode = env.code;
    env.code = env.code.replace(/(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/ig, function(match) {
      var i = env.tokenStack.length;
      // Check for existing strings
      while (env.backupCode.indexOf('___PHP' + i + '___') !== -1)
        ++i;

      // Create a sparse array
      env.tokenStack[i] = match;

      return '___PHP' + i + '___';
    });

    // Switch the grammar to markup
    env.grammar = Prism.languages.markup;
  });

  // Restore env.code for other plugins (e.g. line-numbers)
  Prism.hooks.add('before-insert', function(env) {
    if (env.language === 'php' && env.backupCode) {
      env.code = env.backupCode;
      delete env.backupCode;
    }
  });

  // Re-insert the tokens after highlighting
  Prism.hooks.add('after-highlight', function(env) {
    if (env.language !== 'php' || !env.tokenStack) {
      return;
    }

    // Switch the grammar back
    env.grammar = Prism.languages.php;

    for (var i = 0, keys = Object.keys(env.tokenStack); i < keys.length; ++i) {
      var k = keys[i];
      var t = env.tokenStack[k];

      // The replace prevents $$, $&, $`, $', $n, $nn from being interpreted as special patterns
      env.highlightedCode = env.highlightedCode.replace('___PHP' + k + '___',
        "<span class=\"token php language-php\">" +
        Prism.highlight(t, env.grammar, 'php').replace(/\$/g, '$$$$') +
        "</span>");
    }

    env.element.innerHTML = env.highlightedCode;
  });
};
Prism.languages.insertBefore('php', 'variable', {
  'this': /\$this\b/,
  'global': /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
  'scope': {
    pattern: /\b[\w\\]+::/,
    inside: {
      keyword: /static|self|parent/,
      punctuation: /::|\\/
    }
  }
});
(function(Prism) {
  Prism.languages.sass = Prism.languages.extend('css', {
    // Sass comments don't need to be closed, only indented
    'comment': {
      pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
      lookbehind: true
    }
  });

  Prism.languages.insertBefore('sass', 'atrule', {
    // We want to consume the whole line
    'atrule-line': {
      // Includes support for = and + shortcuts
      pattern: /^(?:[ \t]*)[@+=].+/m,
      inside: {
        'atrule': /(?:@[\w-]+|[+=])/m
      }
    }
  });
  delete Prism.languages.sass.atrule;


  var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
  var operator = [
    /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
      pattern: /(\s+)-(?=\s)/,
      lookbehind: true
    }
  ];

  Prism.languages.insertBefore('sass', 'property', {
    // We want to consume the whole line
    'variable-line': {
      pattern: /^[ \t]*\$.+/m,
      inside: {
        'punctuation': /:/,
        'variable': variable,
        'operator': operator
      }
    },
    // We want to consume the whole line
    'property-line': {
      pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
      inside: {
        'property': [
          /[^:\s]+(?=\s*:)/, {
            pattern: /(:)[^:\s]+/,
            lookbehind: true
          }
        ],
        'punctuation': /:/,
        'variable': variable,
        'operator': operator,
        'important': Prism.languages.sass.important
      }
    }
  });
  delete Prism.languages.sass.property;
  delete Prism.languages.sass.important;

  // Now that whole lines for other patterns are consumed,
  // what's left should be selectors
  delete Prism.languages.sass.selector;
  Prism.languages.insertBefore('sass', 'punctuation', {
    'selector': {
      pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
      lookbehind: true
    }
  });

}(Prism));
Prism.languages.scss = Prism.languages.extend('css', {
  'comment': {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true
  },
  'atrule': {
    pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
    inside: {
      'rule': /@[\w-]+/
        // See rest below
    }
  },
  // url, compassified
  'url': /(?:[-a-z]+-)*url(?=\()/i,
  // CSS selector regex is not appropriate for Sass
  // since there can be lot more things (var, @ directive, nesting..)
  // a selector must start at the end of a property or after a brace (end of other rules or nesting)
  // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
  // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
  // can "pass" as a selector- e.g: proper#{$erty})
  // this one was hard to do, so please be careful if you edit this one :)
  'selector': {
    // Initial look-ahead is used to prevent matching of blank selectors
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
    inside: {
      'parent': {
        pattern: /&/,
        alias: 'important'
      },
      'placeholder': /%[-\w]+/,
      'variable': /\$[-\w]+|#\{\$[-\w]+\}/
    }
  }
});

Prism.languages.insertBefore('scss', 'atrule', {
  'keyword': [
    /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
      pattern: /( +)(?:from|through)(?= )/,
      lookbehind: true
    }
  ]
});

Prism.languages.scss.property = {
  pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
  inside: {
    'variable': /\$[-\w]+|#\{\$[-\w]+\}/
  }
};

Prism.languages.insertBefore('scss', 'important', {
  // var and interpolated vars
  'variable': /\$[-\w]+|#\{\$[-\w]+\}/
});

Prism.languages.insertBefore('scss', 'function', {
  'placeholder': {
    pattern: /%[-\w]+/,
    alias: 'selector'
  },
  'statement': {
    pattern: /\B!(?:default|optional)\b/i,
    alias: 'keyword'
  },
  'boolean': /\b(?:true|false)\b/,
  'null': /\bnull\b/,
  'operator': {
    pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
    lookbehind: true
  }
});

Prism.languages.scss['atrule'].inside.rest = Prism.util.clone(Prism.languages.scss);
Prism.languages.twig = {
  'comment': /\{#[\s\S]*?#\}/,
  'tag': {
    pattern: /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/,
    inside: {
      'ld': {
        pattern: /^(?:\{\{-?|\{%-?\s*\w+)/,
        inside: {
          'punctuation': /^(?:\{\{|\{%)-?/,
          'keyword': /\w+/
        }
      },
      'rd': {
        pattern: /-?(?:%\}|\}\})$/,
        inside: {
          'punctuation': /.*/
        }
      },
      'string': {
        pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        inside: {
          'punctuation': /^['"]|['"]$/
        }
      },
      'keyword': /\b(?:even|if|odd)\b/,
      'boolean': /\b(?:true|false|null)\b/,
      'number': /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][-+]?\d+)?)\b/,
      'operator': [{
          pattern: /(\s)(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
          lookbehind: true
        },
        /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/
      ],
      'property': /\b[a-zA-Z_]\w*\b/,
      'punctuation': /[()\[\]{}:.,]/
    }
  },

  // The rest can be parsed as HTML
  'other': {
    // We want non-blank matches
    pattern: /\S(?:[\s\S]*\S)?/,
    inside: Prism.languages.markup
  }
};

Prism.languages.yaml = {
  'scalar': {
    pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
    lookbehind: true,
    alias: 'string'
  },
  'comment': /#.*/,
  'key': {
    pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
    lookbehind: true,
    alias: 'atrule'
  },
  'directive': {
    pattern: /(^[ \t]*)%.+/m,
    lookbehind: true,
    alias: 'important'
  },
  'datetime': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
    lookbehind: true,
    alias: 'number'
  },
  'boolean': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
    lookbehind: true,
    alias: 'important'
  },
  'null': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
    lookbehind: true,
    alias: 'important'
  },
  'string': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}))/m,
    lookbehind: true,
    greedy: true
  },
  'number': {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+\-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
    lookbehind: true
  },
  'tag': /![^\s]+/,
  'important': /[&*][\w]+/,
  'punctuation': /---|[:[\]{}\-,|>?]|\.\.\./
};

(function() {

  if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
    return;
  }

  function $$(expr, con) {
    return Array.prototype.slice.call((con || document).querySelectorAll(expr));
  }

  function hasClass(element, className) {
    className = " " + className + " ";
    return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1
  }

  // Some browsers round the line-height, others don't.
  // We need to test for it to position the elements properly.
  var isLineHeightRounded = (function() {
    var res;
    return function() {
      if (typeof res === 'undefined') {
        var d = document.createElement('div');
        d.style.fontSize = '13px';
        d.style.lineHeight = '1.5';
        d.style.padding = 0;
        d.style.border = 0;
        d.innerHTML = '&nbsp;<br />&nbsp;';
        document.body.appendChild(d);
        // Browsers that round the line-height should have offsetHeight === 38
        // The others should have 39.
        res = d.offsetHeight === 38;
        document.body.removeChild(d);
      }
      return res;
    }
  }());

  function highlightLines(pre, lines, classes) {
    var ranges = lines.replace(/\s+/g, '').split(','),
      offset = +pre.getAttribute('data-line-offset') || 0;

    var parseMethod = isLineHeightRounded() ? parseInt : parseFloat;
    var lineHeight = parseMethod(getComputedStyle(pre).lineHeight);

    for (var i = 0, range; range = ranges[i++];) {
      range = range.split('-');

      var start = +range[0],
        end = +range[1] || start;

      var line = document.createElement('div');

      line.textContent = Array(end - start + 2).join(' \n');
      line.setAttribute('aria-hidden', 'true');
      line.className = (classes || '') + ' line-highlight';

      //if the line-numbers plugin is enabled, then there is no reason for this plugin to display the line numbers
      if (!hasClass(pre, 'line-numbers')) {
        line.setAttribute('data-start', start);

        if (end > start) {
          line.setAttribute('data-end', end);
        }
      }

      line.style.top = (start - offset - 1) * lineHeight + 'px';

      //allow this to play nicely with the line-numbers plugin
      if (hasClass(pre, 'line-numbers')) {
        //need to attack to pre as when line-numbers is enabled, the code tag is relatively which screws up the positioning
        pre.appendChild(line);
      } else {
        (pre.querySelector('code') || pre).appendChild(line);
      }
    }
  }

  function applyHash() {
    var hash = location.hash.slice(1);

    // Remove pre-existing temporary lines
    $$('.temporary.line-highlight').forEach(function(line) {
      line.parentNode.removeChild(line);
    });

    var range = (hash.match(/\.([\d,-]+)$/) || [, ''])[1];

    if (!range || document.getElementById(hash)) {
      return;
    }

    var id = hash.slice(0, hash.lastIndexOf('.')),
      pre = document.getElementById(id);

    if (!pre) {
      return;
    }

    if (!pre.hasAttribute('data-line')) {
      pre.setAttribute('data-line', '');
    }

    highlightLines(pre, range, 'temporary ');

    document.querySelector('.temporary.line-highlight').scrollIntoView();
  }

  var fakeTimer = 0; // Hack to limit the number of times applyHash() runs

  Prism.hooks.add('before-sanity-check', function(env) {
    var pre = env.element.parentNode;
    var lines = pre && pre.getAttribute('data-line');

    if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
      return;
    }

    /*
     * Cleanup for other plugins (e.g. autoloader).
     *
     * Sometimes <code> blocks are highlighted multiple times. It is necessary
     * to cleanup any left-over tags, because the whitespace inside of the <div>
     * tags change the content of the <code> tag.
     */
    var num = 0;
    $$('.line-highlight', pre).forEach(function(line) {
      num += line.textContent.length;
      line.parentNode.removeChild(line);
    });
    // Remove extra whitespace
    if (num && /^( \n)+$/.test(env.code.slice(-num))) {
      env.code = env.code.slice(0, -num);
    }
  });

  Prism.hooks.add('complete', function(env) {
    var pre = env.element.parentNode;
    var lines = pre && pre.getAttribute('data-line');

    if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
      return;
    }

    clearTimeout(fakeTimer);
    highlightLines(pre, lines);

    fakeTimer = setTimeout(applyHash, 1);
  });

  window.addEventListener('hashchange', applyHash);

})();

;
(function($) {
  $(document).ready(function() {

    // put your code here

  });
})(jQuery);;
