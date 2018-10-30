var cookie_lang = 'fr';
var cookie_banner_config = {
    "domain": "biosample.fr",
    "subdomain": "www.biosample.fr",
    "cookiename": "cookie_banner_biosample"
};
var cookie_banner_data = [
    {
        fr: {
            popincookie: {
                title: "Vos choix en matière de cookies",
                description:
                    "Le terme « cookies » couvre l’ensemble des traceurs déposés sur votre ordinateur et/ou lus depuis celui-ci lors de la consultation d’un site internet ou d’une application mobile ou lors de la consultation d’une publicité. Ils ont notamment pour but de collecter des informations relatives à votre navigation sur les sites et de vous adresser des services personnalisés. <a href='/politique-en-matière-de-cookies'>Consultez notre politique en matière de cookies</a>",
                labelbutton: "Fermer",
                mandatorycookie: {
                    title: "1/4. Cookies obligatoires",
                    description:
                        "Ces cookies sont nécessaires au bon fonctionnement du site. Les données stockées dans ces cookies ne sont pas partagées avec des tiers.",
                    toggle: {
                        title: "En savoir plus sur les cookies obligatoires",
                        content:
                            "Ce sont des cookies temporaires qui sont la pour permettre au site de fonctionner correctement. Présent dans les entêtes des requêtes que vous envoyez au serveur, ils nous permettent de vous renvoyer la bonne page."
                    },
                    state: "Activés",
                    gtm: {
                        toggle: "_detail_cookies_mandatory"
                    }
                },
                functionalcookie: {
                    title: "2/4. Cookies fonctionnels",
                    description:
                        "Ces cookies permettent au site de se souvenir de vos préférences et réglages (langue, devise, connexion à un compte, etc.). En savoir plus sur les cookies fonctionnels",
                    toggle: {
                        title: "En savoir plus sur les cookies fonctionnels",
                        content:
                            "Ce sont des cookies qui restent sur votre ordinateur afin que nous puissions nous souvenirs de vos paramètres personnalisés. Sans eux, vous devrez retaper vos identifiants de cessions à chaque venu et reconfigurer vos paramètres personnels."
                    },
                    state: "Activés",
                    gtm: {
                        toggle: "_detail_cookies_fonc",
                        radio: "consent_cookie_fonc",
                        label : "consent_cookies_fonc_change"
                    }
                },
                performancecookie: {
                    title: "3/4. Cookies de performance",
                    description:
                        "Ces cookies nous permettent d’améliorer les performances de ce site. En savoir plus sur les cookies de performance",
                    toggle: {
                        title: "En savoir plus sur les cookies de performance",
                        content:
                            "Ils peuvent être sous différents formats. Ce sont des cours fichiers textes contenant soit du javascript, utile pour animer des éléments sur votre écran, soit du css, qui sert à faire le graphisme. Refuser ces cookies vous oblige à recharger à chaque changement de page l'ensemble des scripts javascript et css lié à la page, augmentant par conséquent le temps de navigation"
                    },
                    state: "Activés",
                    gtm: {
                        toggle: "_detail_cookies_perf",
                        radio: "consent_cookie_stats",
                        label : "consent_cookies_stats_change"
                    }
                },
                adscookie: {
                    title: "4/4. Cookies publicitaires",
                    description:
                        "Ces cookies permettent de vous présenter des publicités adaptées à vos centres d'intérêt et à mesurer l'efficacité des campagnes publicitaires. Le fait de refuser la publicité ciblée n'entraîne pas l'arrêt de son affichage mais de ne plus tenir compte de vos usages. En savoir plus sur les cookies publicitaires",
                    toggle: {
                        title: "En savoir plus sur les cookies publicitaires",
                        content:
                            "Ces cookies nous servent à savoir à obtenir des statistiques sur les pages les plus fréquentées et sur vos choix de consommation. Sans ces données, nous serons moins à même de vous proposer des produits et des prix en mesure de ce que vous consultez mais n'achetez pas."
                    },
                    state: "Activés",
                    gtm: {
                        toggle: "_detail_cookies_marketing",
                        radio: "consent_cookie_mkg",
                        label : "consent_cookies_mkg"
                    }
                }
            },
            bannercookie: {
                title:
                    "Nous autorisez-vous à traiter vos informations et à stocker des cookies sur votre ordinateur&nbsp;?",
                info:
                    "Ces informations seront utilisées uniquement dans le cadre de BioSample et des différents services que la société propose.",
                cta1: "Accepter",
                cta2: "Non je personnalise"
            }
        },
    }
];