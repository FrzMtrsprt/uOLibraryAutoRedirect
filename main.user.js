// ==UserScript==
// @name         uOLibraryAutoRedirect
// @version      1
// @description  Auto redirect database links to uOttawa library proxy.
// @author       FrzMtrsprt
// @homepage     https://github.com/FrzMtrsprt/uOLibraryAutoRedirect
// @include      https://scholar.google.*/*
// ==/UserScript==

(function () {
    'use strict';

    const proxyPrefix = "https://login.proxy.bib.uottawa.ca/login?url=";

    const blacklist = [
        `^${proxyPrefix}.*`,
        '^\/.*',
        '^#.*',
        '^javascript:.*',
        '.*scholar\.google.*',
        '.*arxiv\.org.*',
        '.*openaccess.*',
    ];

    function rewriteLinks() {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || blacklist.some(pattern => new RegExp(pattern).test(href))) {
                console.log('Skipping link:', href);
                return;
            }
            link.setAttribute('href', proxyPrefix + href);
        });
    }

    rewriteLinks();

    const observer = new MutationObserver(rewriteLinks);
    observer.observe(document.body, { childList: true, subtree: true });
})();
