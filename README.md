# TedMovies

# Comment faire fonctionner notre application ?

### Pré-requis
Avoir installé sur son PC :
- nodeJS
- Meteor

### Récupérer Les fichiers :

Dans un premier temps, il est nécessaire de se rendre sur le lien du repository GIT afin d'aller chercher le lien https du clone de notre application.<br>
Il faut ensuite de rendre dans un terminal à l'emplacement voulu pour pouvoir installer notre application et run la commande :<br>
<br>``git clone https://github.com/Naylink-x/TedMovies.git`` <br>

<br>Vous avez tout à fait la possibilité de mettre un autre nom à la suite de cette commande pour rename le dossier de notre application comme vous le souhaitez.<br>

<br>Enfin, il ne faut pas oublier de télécharger le fichier join dans le mail qui se nomme <b>api-url.js</b>, fichier qui contient le lien et la clé pour accéder à l'api theMovieDb. Nous avons fait cela dans le but de sécuriser notre application et ne pas donner accès à n'importe qui avec nos identifiants à l'API theMovieDb.


### Installation de notre application :

Maintenant, il est nécessaire de déplacer le fichier téléchargé <b>api-url.js</b> dans le dossier <b>ted-movies-app/server</b> au côté des fichiers <b>db-access.js</b>, <b>functions.js</b>, <b>local-data.js</b>, <b>main.js</b><br>
Une fois cela fait, une commandes sera à taper dans un terminal présent sur le dossier <b>ted-movies-app</b> que voici :<br>

``npm install`` <br>
Celle-ci va installer l'ensemble des dépendances mentionner dans le fichier package.json.

### Lancement de l'application :

Pour lancer notre application, il suffit maintenant de lancer la commande :<br>
<br> ``meteor`` <br>
Cette commande va pouvoir lancer le proxy, HMR server, MongoDB, et lancer l'application.
Il ne manque plus qu'à cliquer sur le lien que le terminal vous donne, à savoir http://localhost:3000/ et vous êtes sur notre application !

Merci pour votre lecture et bonne navigation sur notre application ! =)