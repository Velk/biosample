export const createCookie = (name, value, days) => {
  let expires;
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }
  document.cookie = name + '=' + value + expires + ';path=/;';
  ;
};

export const getCookie = (name) => {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(name + '=');
    if (c_start !== -1) {
      c_start = c_start + name.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
};


export const popinTmpl = (data) => {
  const body = document.getElementsByTagName("body")[0];
  const tpl = `
<div class="CookieOverlay hidden">
  <section class="CookieModal">
     <div class="CookieModal-inner">
        <button class="CookieModal-close">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"/>
           </svg>
           ${data.popincookie.labelbutton}
        </button>
        <header class="CookieModal-header">
           <h1 class="CookieModal-title">${data.popincookie.title}
           </h1>
           <p>${data.popincookie.description}</p>
        </header>
        <div class="CookieModal-content">
           <ul class="CookieModal-paramList">
              <li class="CookieParam" data-id="mandatorycookie">
                 <div class="CookieParam-head">
                    <h2 class="CookieParam-title">${data.popincookie.mandatorycookie.title
                       }
                    </h2>
                    <div class="CookieCheck">
                       <div class="CookieCheck-statut is-active">${data.popincookie.mandatorycookie.state
                          }
                       </div>
                    </div>
                 </div>
                 <p class="CookieParam-info">${
                    data.popincookie.mandatorycookie
                    .description
                    }
                 </p>
                 <button class="CookieToogle-btn">
                    ${
                    data.popincookie.mandatorycookie.toggle
                    .title
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                       <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/>
                    </svg>
                 </button>
                 <div class="CookieToogle-content" aria-hidden="true">
                    <p>${
                       data.popincookie.mandatorycookie.toggle
                       .content
                       }
                    </p>
                 </div>
              </li>
              <li class="CookieParam" data-id="functionalcookie">
                 <div class="CookieParam-head">
                    <h2 class="CookieParam-title">${
                       data.popincookie.functionalcookie.title
                       }
                    </h2>
                    <div class="CookieCheck">
                       <input type="checkbox" id="consent_cookie_fonc" class="CookieCheck-input">
                       <label for="consent_cookie_fonc" class="CookieCheck-label" aria-label="Un texte ici"></label>
                       <div class="CookieCheck-statut">${
                          data.popincookie.functionalcookie
                          .state
                          }
                       </div>
                    </div>
                 </div>
                 <p class="CookieParam-info">${
                    data.popincookie.functionalcookie
                    .description
                    }
                 </p>
                 <button class="CookieToogle-btn">
                    ${
                    data.popincookie.functionalcookie.toggle
                    .title
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                       <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/>
                    </svg>
                 </button>
                 <div class="CookieToogle-content" aria-hidden="true">
                    <p>${
                       data.popincookie.functionalcookie.toggle
                       .content
                       }
                    </p>
                 </div>
              </li>
              <li class="CookieParam" data-id="performancecookie">
                 <div class="CookieParam-head">
                    <h2 class="CookieParam-title">${
                       data.popincookie.performancecookie
                       .title
                       }
                    </h2>
                    <div class="CookieCheck">
                       <input type="checkbox" id="consent_cookie_stats" class="CookieCheck-input">
                       <label for="consent_cookie_stats" class="CookieCheck-label" aria-label="Un texte ici"></label>
                       <div class="CookieCheck-statut">${
                          data.popincookie.performancecookie
                          .state
                          }
                       </div>
                    </div>
                 </div>
                 <p class="CookieParam-info">${
                    data.popincookie.performancecookie
                    .description
                    }
                 </p>
                 <button class="CookieToogle-btn">
                    ${
                    data.popincookie.performancecookie
                    .toggle.title
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                       <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/>
                    </svg>
                 </button>
                 <div class="CookieToogle-content" aria-hidden="true">
                    <p>${
                       data.popincookie.performancecookie.toggle
                       .content
                       }
                    </p>
                 </div>
              </li>
              <li class="CookieParam" data-id="adscookie">
                 <div class="CookieParam-head">
                    <h2 class="CookieParam-title">${
                       data.popincookie.adscookie.title
                       }
                    </h2>
                    <div class="CookieCheck">
                       <input type="checkbox" id="consent_cookie_mkg" class="CookieCheck-input">
                       <label for="consent_cookie_mkg" class="CookieCheck-label" aria-label="Un texte ici"></label>
                       <div class="CookieCheck-statut">${
                          data.popincookie.adscookie.state
                          }
                       </div>
                    </div>
                 </div>
                 <p class="CookieParam-info">${
                    data.popincookie.adscookie.description
                    }
                 </p>
                 <button class="CookieToogle-btn">
                    ${
                    data.popincookie.adscookie.toggle.title
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                       <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/>
                    </svg>
                 </button>
                 <div class="CookieToogle-content" aria-hidden="true">
                    <p>${
                       data.popincookie.adscookie.toggle
                       .content
                       }
                    </p>
                 </div>
              </li>
           </ul>
        </div>
     </div>
     <footer class="CookieModal-actions">
        <button class="CookieBtn">${
        data.popincookie.labelbutton
        }</button>
     </footer>
  </section>
</div>`;
return tpl;
}

export const bannerTmpl = (data) => {
  let {title, info, cta1, cta2} = data.bannercookie;
const bannerTmpl = `<div class="CookieBanner">
      <div class="CookieBanner-inner">
      <div class="CookieBanner-text">
          <div class="CookieBanner-title">${title}</div>
          <p class="CookieBanner-info">${info}</p>
      </div>
      <div class="CookieBanner-actions">
          <button class="CookieBtn">${cta1}</button>
          <button class="CookieBtn is-alt">${cta2}</button>
      </div>
      </div>
  </div>`;
return bannerTmpl;
}