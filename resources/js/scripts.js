var screenSaverTimer = 0;
var screenSaverLoaded = false;

/**
 * Convert url string to url with sanjab route prefix.
 */
window.sanjabUrl = function (url = '') {
    return '/' + sanjab.config.route + '/' + url.replace(/^\//g, '');
}

/**
 * Show a success message.
 */
window.sanjabSuccess = function (title, message = '') {
    return Swal.fire(
        title,
        message,
        'success'
    );
}

/**
 * Show a error message.
 */
window.sanjabError = function (title, message = '') {
    return Swal.fire(
        title,
        message,
        'error'
    );
}

/**
 * Get Http error text by status code.
 */
window.sanjabHttpErrorMessage = function (status) {
    if (status == 403) {
        return sanjabTrans('you_are_not_allowed_to_perform_this');
    } else if (status == 500) {
        return sanjabTrans('server_error');
    } else {
        return sanjabTrans('some_error_happend');
    }
}

/**
 * Show http error by status code.
 */
window.sanjabHttpError = function (status) {
    return sanjabError(sanjabHttpErrorMessage(status));
}

/**
 * Show Success toast.
 */
window.sanjabSuccessToast = function (title = '') {
    return Swal.fire({
        title: title,
        type: 'success',
        toast: true,
        position: document.dir == 'rtl' ? 'bottom-end' : 'bottom-start',
        showConfirmButton: false,
        timer: 3000
    });
}

/**
 * Screen saver setup.
 */
function loadScreenSaver() {
    if (!screenSaverLoaded) {
        setInterval(function () {
            var time = new Date();
            $(".screen-saver-content h1").text(('0' + time.getHours()).slice(-2) + ":" + ('0' + time.getMinutes()).slice(-2));
            screenSaverTimer += 1;
            if (screenSaverTimer > 300) {
                $("body").addClass("screen-saver");
            }
            ['mousemove', 'keypress', 'touchstart', 'touchmove']
            .forEach((e) => document.addEventListener(e, function () {
                if (screenSaverTimer >= 300) {
                    // To refresh lock screen session.
                    fetch(sanjabUrl());
                }
                screenSaverTimer = 0;
            }));
        }, 1000);
        screenSaverLoaded = true;
    }
}

$('body').on('focus', '.bmd-form-group > input.form-control', (e) =>  $(e.target).parent().addClass("is-focused"));
$('body').on('blur', '.bmd-form-group > input.form-control', (e) =>  $(e.target).parent().removeClass("is-focused"));
$('body').on('focus', '.bmd-form-group > textarea.form-control', (e) =>  $(e.target).parent().addClass("is-focused"));
$('body').on('blur', '.bmd-form-group > textarea.form-control', (e) =>  $(e.target).parent().removeClass("is-focused"));

$('body').on('change', '.bmd-form-group > input.form-control', (e) =>  e.target.value.length > 0 ? $(e.target).parent().addClass("is-filled") : $(e.target).parent().removeClass("is-filled"));
$('body').on('change', '.bmd-form-group > textarea.form-control', (e) => e.target.value.length > 0 ? $(e.target).parent().addClass("is-filled") : $(e.target).parent().parent().removeClass("is-filled"));

$(document).ready(function () {
    $(document).on("click", ".screen-saver-content h1", function () {
        $("body").removeClass("screen-saver");
        loadScreenSaver();
        // To refresh lock screen session.
        fetch(sanjabUrl());
    });
    if ($(".screen-saver-content h1").text().length == 0) {
        loadScreenSaver();
    }
});
