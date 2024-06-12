const yatranslate = {
    lang: "ru",
};

document.addEventListener('DOMContentLoaded', function () {
    yaTranslateInit();
});

function yaTranslateInit() {
    let script = document.createElement('script');
    script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yatranslate.lang}&widgetTheme=light&autoMode=false`;
    document.getElementsByTagName('head')[0].appendChild(script);

    let code = yaTranslateGetCode();
    yaTranslateHtmlHandler(code);
    yaTranslateEventHandler('click', '[data-ya-lang]', function (el) {
        yaTranslateSetLang(el.getAttribute('data-ya-lang'));
        window.location.reload();
    });
}

function yaTranslateSetLang(lang) {
    localStorage.setItem('yt-widget', JSON.stringify({
        "lang": lang,
        "active": true
    }));

    let script = document.createElement('script');
    script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${lang}&widgetTheme=light&autoMode=false`;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function yaTranslateGetCode() {
    return (localStorage["yt-widget"] != undefined && JSON.parse(localStorage["yt-widget"]).lang != undefined) ? JSON.parse(localStorage["yt-widget"]).lang : yatranslate.lang;
}

function yaTranslateHtmlHandler(code) {
    document.querySelector('[data-lang-active]').innerHTML = `<img class="lang__img lang__img_select" src="./images/lang/lang__${code}.png" alt="${code}">`;
    document.querySelector(`[data-ya-lang="${code}"]`).remove();
}

function yaTranslateEventHandler(event, selector, handler) {
    document.addEventListener(event, function (e) {
        let el = e.target.closest(selector);
        if (el) handler(el);
    });
}
