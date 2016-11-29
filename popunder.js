if( typeof popunderUrl !== 'undefined' ) {
    var starUrl = popunderUrl;

    if( typeof popunderPeriod === 'undefined' ) {
        var popunderPeriod = 24;
    }

    var cookieName = 'xnxx';
    var starPop = 0;
    Date.prototype.addHours = function (h) {
        this.setHours(this.getHours() + h);
        return this
    };

    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.addHours( popunderPeriod );
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value
    }

    function getCookie(c_name) {
        var i, x, y, STARcookies = document.cookie.split(";");
        for (i = 0; i < STARcookies.length; i++) {
            x = STARcookies[i].substr(0, STARcookies[i].indexOf("="));
            y = STARcookies[i].substr(STARcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y)
            }
        }
    }

    function preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault()
        }
        e.returnValue = false;
        return false
    }

    function openWindow(url) {
        var w = window.open(url, "_blank").focus();
        return false
    }

    function mobilePop() {
        var targ;
        var e = window.event || arguments.callee.caller.arguments[0];
        if (typeof e != "undefined") {
            if (e.target) {
                targ = e.target
            } else if (e.srcElement) {
                targ = e.srcElement
            }
            var stop = false;
            var element = targ;
            if (targ.nodeType == 3 || targ.tagName != 'A') {
                do {
                    element = element.parentNode;
                    if (element.tagName == "HTML") {
                        stop = true
                    }
                } while (element.tagName != 'A' && stop == false)
            }
            if (getCookie(cookieName)) {
                starPop = 1
            }
            var ios = false;
            if (navigator.platform == "iPad" || navigator.platform == "iPhone" || navigator.platform == "iPod") {
                ios = true
            }
            if (!stop) {
                if (starPop == 0) {
                    if (ios && typeof element.href != "undefined" && element.href != "" && element.href != "#") {
                        openWindow(element.href)
                    }
                    element.target = '_blank';
                    starPop = 1;

                    setCookie(cookieName, 1, 1);
                    document.location.assign(starUrl);
                    if (ios) {
                        return preventDefault(e)
                    }
                }
            }
        }
    }

    function callback(e) {
        mobilePop();
    }

    if (document.addEventListener)
        document.addEventListener('click', callback, false);
    else
        document.attachEvent('onclick', callback);
}