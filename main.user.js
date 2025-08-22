// ==UserScript==
// @name         uOLibraryAutoRedirect
// @version      1
// @description  Auto redirect database links to uOttawa library proxy.
// @authoe       FrzMtrsprt
// @homepage     https://github.com/FrzMtrsprt/uOLibraryAutoRedirect
// @include      https://scholar.google.*/*
// ==/UserScript==

(function () {
    'use strict';

    const proxyPrefix = "https://login.proxy.bib.uottawa.ca/login?url=";

    function rewriteLinks() {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('/') || href.startsWith('#') || href.startsWith('javascript') || href.includes('scholar.google') || href.startsWith(proxyPrefix)) {
                return;
            }
            link.setAttribute('href', proxyPrefix + href);
        });
    }

    rewriteLinks();

    const observer = new MutationObserver(rewriteLinks);
    observer.observe(document.body, { childList: true, subtree: true });
})();
