// ==UserScript==
// @name         Deezer Onboarding Auto
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Monitor Deezer for onboarding artists selection, auto pick 15 artists then go to next page
// @author       tmxkwpn
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deezer.com
// @namespace    https://github.com/DJDoubleD/UserScripts
// @homepageURL  https://github.com/DJDoubleD/UserScripts
// @match        https://www.deezer.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function checkForOnboardingItem() {
        const items = document.querySelectorAll('.onboarding-screen-artist-item');
        if (items.length > 0) {
            showMessage();
            clickItems(items);
        }
    }

    function showMessage() {
        if (!document.getElementById('tampermonkey-alert')) {
            let alertBox = document.createElement('div');
            alertBox.id = 'tampermonkey-alert';
            alertBox.innerText = 'Onboarding artist list detected!';
            alertBox.style.position = 'fixed';
            alertBox.style.top = '20px';
            alertBox.style.left = '50%';
            alertBox.style.transform = 'translateX(-50%)';
            alertBox.style.backgroundColor = 'red';
            alertBox.style.color = 'white';
            alertBox.style.padding = '10px';
            alertBox.style.borderRadius = '5px';
            alertBox.style.zIndex = '10000';
            document.body.appendChild(alertBox);

            setTimeout(() => {
                alertBox.remove();
            }, 5000);
        }
    }

    function clickItems(items) {
        let maxClicks = 15;
        let selectedItems = Array.from(items).slice(0, maxClicks);

        selectedItems.forEach(item => {
            item.click();
        });
        setTimeout(clickButton, 15);
    }

    function clickButton() {
        const button = document.querySelector('.chakra-button.css-12jil43');
        if (button) {
            button.click();
        }
    }

    const observer = new MutationObserver(checkForOnboardingItem);
    observer.observe(document.body, { childList: true, subtree: true });

    checkForOnboardingItem();
})();
