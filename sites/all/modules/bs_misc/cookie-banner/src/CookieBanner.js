import { createCookie, getCookie, popinTmpl, bannerTmpl } from "./helpers";
/**
 * * Cookie factory js is for handling banner and popin cookie client management.
 * * This object inject a banner and popin.
 * * Read and update GTM infos and client cookie
 * @param data Object
 * @param config Object
 * @param lang String
 */

function CookieBanner(data, config, lang = "fr") {
  // Config params
  this.data = data;
  this.config = config;
  this.lang = lang;
  this.cookie = {
    cookie_consent: 0,
    consent_cookie_fonc: 0,
    consent_cookie_stats: 0,
    consent_cookie_mkg: 0
  };

  this.init = function () {
    this.initGtm();
    this.initCookie();
    this.trigerPopinFromBtns();
    this.injectBanner();
    this.injectPopin();

  },
  // Config methods
  this.initGtm = function () {
    window.dataLayer = window.dataLayer || [];
    if (dataLayer || window.dataLayer) {
      dataLayer.push(this.cookie);
      // Create uniq cookieGtm obj
      this.cookieGtm = Object.assign({}, dataLayer[1]);
    }
  },

  this.parseCookie = function (cookie) {
    return JSON.parse(cookie);
  },

  this.stringifyCookie = function (cookie) {
    return JSON.stringify(cookie);
  },

  this.updateCookie = function (cookie) {
    if (typeof cookie !== 'object')
      throw new Error("UpdateCookie must have a Object param");
    const newObj = Object.assign({}, this.cookieGtm);
    const cookieKeys = Object.keys(cookie);
    for (let index in cookie) {
      if (cookieKeys[0] in cookie)
        newObj[index] = cookie[index];
    }
    // Update cookieGtm with data from cookie param
    this.cookieGtm = newObj;
    // Update cookie with new value from cookieGtm
    createCookie(this.config.cookiename, this.stringifyCookie(this.cookieGtm), 395);
    // Finally send to GTM
    this.pushDatalayer(this.cookieGtm);
  },

  this.initCookie = function () {
    // Read cookie and create
    if (getCookie(this.config.cookiename) == "")
      createCookie(this.config.cookiename, this.stringifyCookie(this.cookieGtm), 395);
      dataLayer.push(this.cookieGtm);

    // Update cookie val if present to cookieGtm
    if (getCookie(this.config.cookiename))
      this.cookieGtm = this.parseCookie(getCookie(this.config.cookiename));
      dataLayer.push(this.cookieGtm);
  },

  this.pushDatalayer = function (cookie) {
    dataLayer.push(cookie);
  },

  this.triggerGtmEventCustom = function (message) {
    dataLayer.push(message);
  },

  this.updateRadioInputs = function (cookie){
    const CookieParams = document.querySelectorAll(".CookieParam .CookieParam-head .CookieCheck .CookieCheck-input");
    CookieParams.forEach((elm, i) => {
        if(elm.getAttribute('id') in cookie) {
          switch (cookie[elm.getAttribute('id')]) {
            case 1:
              elm.setAttribute("checked", "");
              break;
            case 0:
              elm.removeAttribute("checked");
              break;
            default:
          }
        }
    })
  }

  this.buildElementsPopin = function() {
    const CookieParams = document.querySelectorAll(".CookieParam");
    let { domain, subdomain, cookiename } = this.config;
    CookieParams.forEach(elm => {
      let id = elm.getAttribute("data-id");
      let datauid = this.data[0][this.lang]["popincookie"][id];
      let gtmlabel = this.data[0][this.lang]["popincookie"][id]["gtm"]["radio"];
      let switchCount = true;
      let stateToggle = "close";
      let inputRadioElm = elm.querySelector(
        ".CookieParam-head .CookieCheck .CookieCheck-input"
      );
     
      // Init value radio from cookie
      if (this.cookieGtm !== undefined) {
        if(typeof this.cookieGtm[gtmlabel] === 'number') {
          switch (this.cookieGtm[gtmlabel]) {
            case 1:
              inputRadioElm.setAttribute("checked", "");
              break;
            case 0:
              inputRadioElm.removeAttribute("checked");
              break;
            default:
          }
        }
        
      }

      // Toogle radio + send gtm value
      if (inputRadioElm !== null) {
        let radioState = false;
        let gtmValRadio = null;
        let gtmLabelRadio = datauid.gtm.radio;
        let gtmLabelRadioEvent = datauid.gtm.label;
        inputRadioElm.addEventListener("change", e => {
          radioState = !radioState;
          radioState  ? inputRadioElm.setAttribute("checked", "") : inputRadioElm.removeAttribute("checked");
          inputRadioElm.checked ? gtmValRadio = 1 : gtmValRadio = 0;
          let updateObj = {};
          updateObj[gtmLabelRadio] = gtmValRadio;
          const eventObj = {}
          eventObj.event = gtmLabelRadioEvent;
          eventObj[gtmLabelRadio] = gtmValRadio;
          this.updateCookie(updateObj);  
          this.triggerGtmEventCustom(eventObj);
        });
      }

      // Toggle content and push gtm custom label
      elm.querySelector(".CookieToogle-btn").addEventListener("click", e => {
        let target = e.target || e.srcElement;
        target.classList.toggle("is-toggle");
        var toggleTarget = target.nextElementSibling;
        if (!toggleTarget) {
          return false;
        }
        switchCount = !switchCount;
        switchCount ? stateToggle = "close" : stateToggle = "open";
        e.preventDefault;
        setTimeout(() => {
          toggleTarget.setAttribute("aria-hidden", switchCount.toString());
          this.triggerGtmEventCustom({'event': `${stateToggle}${datauid.gtm.toggle}`})
        }, 100);
      });
    });
  },

  this.trigerPopinFromBtns = function () {
    const btns = Array.from(document.querySelectorAll('.CookieBtn'));
    btns.map((elm, i) => {
      elm.addEventListener('click', (e) => {
        this.triggerGtmEventCustom({event:'open_popin_cookies_consent',clic_origin:'link'})
        this.showPopin();

      })
    })
  },

  this.injectBanner = function () {
    const body = document.getElementsByTagName("body")[0];
    body.insertAdjacentHTML("beforeend", bannerTmpl(this.data[0][this.lang]));
    const btnsBanner = [
      document.querySelectorAll(".CookieBanner .CookieBanner-actions button")[0],
      document.querySelectorAll(".CookieBanner .CookieBanner-actions button")[1]
    ];
    btnsBanner[0].addEventListener("click", evt => {
      evt.preventDefault;
      this.updateCookie({
        cookie_consent: 1,
        consent_cookie_fonc: 1,
        consent_cookie_stats: 1,
        consent_cookie_mkg: 1
      });
      this.hideBanner();
      this.triggerGtmEventCustom({'event': 'accept_all_cookies','consent_cookie_fonc' : 1,'consent_cookie_stats':1,'consent_cookie_mkg': 1});
    });
    btnsBanner[1].addEventListener("click", evt => {
      evt.preventDefault;
      this.updateCookie({
        cookie_consent: 1,
      });
      this.triggerGtmEventCustom({event:'open_popin_cookies_consent',clic_origin :'banner'})
      this.showPopin();
    });
  },

  this.injectPopin = function () {
    const body = document.getElementsByTagName("body")[0];
    body.insertAdjacentHTML("beforeend", popinTmpl(this.data[0][this.lang]));
    const elm = document.querySelectorAll(".CookieOverlay")[0];
    const btns = [elm.querySelectorAll(".CookieModal-actions button")[0], elm.querySelectorAll(".CookieModal .CookieModal-inner .CookieModal-close")[0]]
    btns.forEach(elm => {
      elm.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementsByClassName('CookieModal-inner')[0].scrollTop = 0;
        this.triggerGtmEventCustom({event:'close_popin_cookies_consent'});
        this.hidePopin();
      })
    });
    this.buildElementsPopin();
  },

  this.hidePopin = function () {
    let elm = document.querySelectorAll(".CookieOverlay")[0];
    elm.classList.add('hidden');
  },
  this.showPopin = function () {
    let elm = document.querySelectorAll(".CookieOverlay")[0];
    elm.classList.remove('hidden');
    this.updateRadioInputs(this.cookieGtm);
  },
  this.hideBanner = function () {
    document.querySelectorAll(".CookieBanner")[0].classList.add('hidden');
  }

  // Trigger methods
  this.init();
  if (this.cookieGtm.cookie_consent == 1) {
    this.hideBanner();
  }
}

export default CookieBanner;