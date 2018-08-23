# Cookie_banner and popin - RGPD

Ce script cookie_banner inject un bandeaux et une popin de personalisation de cookies.
Les evènements d'ouverture et de fermeture du bandeaux et de la popin sont envoyés dans Google Tag Manager

## Installation et prérequis

#### Node doit être installé sur votre machine

    node -v

### Install du projet

    npm install

### Lancer un serveur en local

    npm run dev && npm run watch

### Générer un build de prod

    npm run build:prod

### Utilisation

En bas de page à l'aide d'une balise script vous devez déclarer 2 objets appelés 'configcookie' et 'data'.

    var cookie_banner_config = {
      "domain": "",
      "subdomain": "",
      "cookiename": "COOKIE_BANNER"
    };

    var cookie_banner_data = {
            "fr": {
                "popincookie": {
                    "title": "Vos choix en matière de cookies",
                    "description": "Le terme « cookies » couvre l’ensemble des traceurs déposés sur votre ordinateur et/ou lus depuis celui-ci lors de la consultation d’un site internet ou d’une application mobile ou lors de la consultation d’une publicité. Ils ont notamment pour but de collecter des informations relatives à votre navigation sur les sites et de vous adresser des services personnalisés. <a href=''>En savoir plus sur les cookies</a>",
                    "labelbutton" : "Fermer",
                    "mandatorycookie": {
                        "title": "1/4. Cookies obligatoires",
                        "description": "Ces cookies sont nécessaires au bon fonctionnement du site. Les données stockées dans ces cookies ne sont pas partagées avec des tiers.",
                        "toggle" : {
                            "title" : "En savoir plus sur les cookies obligatoires",
                            "content" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores deserunt non, id quia, consequuntur possimus laborum velit illum autem repellendus cupiditate sapiente odit amet aspernatur!"
                        },
                        "state": "Activés",
                        "gtm" : {
                            "toggle" : "_detail_cookies_mandatory"
                        }

                    },
                    "functionalcookie": {
                        "title": "2/4. Cookies fonctionnels",
                        "description": "Ces cookies permettent au site de se souvenir de vos préférences et réglages (langue, devise, connexion à un compte, etc.). En savoir plus sur les cookies fonctionnels",
                        "toggle" : {
                            "title" : "En savoir plus sur les cookies obligatoires",
                            "content" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores deserunt non, id quia, consequuntur possimus laborum velit illum autem repellendus cupiditate sapiente odit amet aspernatur!"
                        },
                        "state": "Activés",
                        "gtm" : {
                            "toggle" : "_detail_cookies_fonc",
                            "radio" : "consent_cookie_fonc"
                        },
                    },
                    "performancecookie": {
                        "title": "3/4. Cookies de performance",
                        "description": "Ces cookies nous permettent d’améliorer les performances de ce site. En savoir plus sur les cookies de performance",
                        "toggle" : {
                            "title" : "En savoir plus sur les cookies obligatoires",
                            "content" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores deserunt non, id quia, consequuntur possimus laborum velit illum autem repellendus cupiditate sapiente odit amet aspernatur!"
                        },
                        "state": "Activés",
                        "gtm" : {
                            "toggle" : "_detail_cookies_perf",
                            "radio" : "consent_cookie_perf"
                        }
                    },
                    "adscookie": {
                        "title": "4/4. Cookies publicitaires",
                        "description": "Ces cookies permettent de vous présenter des publicités adaptées à vos centres d'intérêt et à mesurer l'efficacité des campagnes publicitaires. Le fait de refuser la publicité ciblée n'entraîne pas l'arrêt de son affichage mais de ne plus tenir compte de vos usages. En savoir plus sur les cookies publicitaires",
                        "toggle" : {
                            "title" : "En savoir plus sur les cookies obligatoires",
                            "content" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores deserunt non, id quia, consequuntur possimus laborum velit illum autem repellendus cupiditate sapiente odit amet aspernatur!"
                        },
                        "state": "Activés",
                        "gtm" : {
                            "toggle" : "_detail_cookies_marketing",
                            "radio" : "consent_cookie_mkg"
                        }
                    }
                },
                "bannercookie": {
                    "title": "Est-ce que vous nous autorisez à traiter vos informations et à stocker des cookies&nbsp;?",
                    "info": "Vos information seront utilisées pour l'analyse, le livechat et la publicité.",
                    "cta1": "Accepter",
                    "cta2": "Non je personnalise"
                }

            }
        };

Dans le dossier ./dist/assets/js, vous pouvez récuperer le script js "cookie_banner.js"
Ce script est a placer en bas de votre page HTML avant la fermeture du tag body

### Ajouter un bouton pour ouvrir la popin

Si vous avez besoin d'avoir un bouton pour relancer l'ouverture de la popin celui devra imperativement
avoir la class css suivante : "CookieBtn" (Il peut sagir d'un tag "a" ou "button").