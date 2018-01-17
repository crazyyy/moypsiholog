jQuery,jQuery.extend({debug:function(){if(window.debug=window.debug||[],args=jQuery.makeArray(arguments),"object"==typeof this)var e=args.length?args[0]:window.debug.length,g=this;else var e=args.length>1?args.pop():window.debug.length,g=args[0];return window.debug[e]=g,"undefined"!=typeof console&&console.log(e,g),this}}),jQuery.fn.debug=jQuery.debug;
//# sourceMappingURL=maps/jq-debug.js.map
