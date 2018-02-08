Changement configuration d’administration Drupal 7 :

-------------------------------------------------------------------------------------------------------

- Si, la table users_extra_fields n’est pas créée alors, faire :
        - drush dis bsconnexion
        - drush pm-uninstall bsconnexion
        - drush en bsconnexion

-------------------------------------------------------------------------------------------------------

- Administration > Configuration > Personnes > Paramètres de compte
        - Qui peut enregistrer des comptes : Visiteurs
        - Exiger la vérification de  l’adresse électronique quand un
          visiteur créé un compte : Require a verification e-mail,
          but wait for the approval e-mail to let user set their password.
        - Personnalisation : Décocher les 2 cases.

-------------------------------------------------------------------------------------------------------

- Administration > Modules :

        - Activer le module CAPTCHA :

        - Configurer :
            - Type de défi par défaut : Math

            - Type de défi pour tous les FORM_ID : -- Aucun Défi –
              Pour user_register_form : Math (du module Captcha)

            - Ajouter un FORM_ID :  webform_client_form_110
              Mettre le Type de défi à : Math (du module Captcha)

            - Validation du CAPTCHA par défaut :
              Validation insensible à la casse : les erreurs de minuscules / majuscules sont ignorées.

            - Persistance :
              Ne plus demander le CAPTCHA dans un formulaire en plusieurs
              étapes/lors d'une prévisualisation si l'utilisateur a déjà validé un CAPTCHA précédemment.

-------------------------------------------------------------------------------------------------------

- Administration > Modules :
    - Rechercher le module : @Font-Your-Face
    - Activer :
        - @font-your-face
        - @font-your-face UI
        - Google Fonts API
        - WYSIWYG for @font-your-face

-------------------------------------------------------------------------------------------------------

- Module > WYSIWYG > Configurer :
    - Cocher la case : fontYourFace
    - Cocher la case : Tableau
    - Cocher la case : Coller à partir de Word
    - Cocher la case : Table des caractères
    - Enregistrer

-------------------------------------------------------------------------------------------------------

- Le webform du formulaire de contact :
    - Remplacer “Formulaire de contact”par “CONTACTEZ-NOUS”
    - Mettre :
        - font-size : 45px
        - text-transform:uppercase

-------------------------------------------------------------------------------------------------------

- Structure > Taxonomie > Ajouter un vocabulaire :
    Créer une taxonomie :
    Nom : Catalogue général
    Nom du système : catalogue_general

-------------------------------------------------------------------------------------------------------