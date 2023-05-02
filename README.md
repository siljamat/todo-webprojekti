# todo-webprojekti

Tämä projekti on osana Metropolian ohjelmistotuotannon web-projekti-kurssia. Teimme Todo-appin jossa pystyy listaamaan 
erilaisia tapahtumia ja tehtäviä sekä kategorisoimaan niitä.

Projektin tekoon on käytetty MERN-stackia ja REST-rajapintaa. 

REST-rajapinnan kuvaus:

Rest-rajapinta käyttää kategorioille ja tehtäville POST, PUT, GET ja DELETE toimintoja, jotka kaikki ovat HTTP-pyyntöjä.

POST: käytetään uuden kategorian tai tapahtuman lisäämiseen tietokantaan. Kategorian tai tapahtuman tiedot lähetetään pyynnön rungossa JSON-muodossa.

GET: käytetään kaikkien kategorioiden ja tapahtumien hakemiseen tietokannasta. Kategoriat palautetaan JSON-muodossa vastauksessa.

GET: käytetään tietyn kategorian tai tapahtuman hakemiseen tietokannasta. 
Kategorian tai tapahtuman tunniste (userId) annetaan pyynnön URL-parametrina. Palautetaan JSON-muotoinen vastaus.

DELETE: käytetään tietyn kategorian tai tapahtuman poistamiseen tietokannasta. 
Tunniste (userId) annetaan pyynnön URL-parametrina. Poistettu kategoria palautetaan JSON-muodossa vastauksessa.

PUT: käytetään tietyn kategorian päivittämiseen tietokannassa. 
Kategorian tunniste (userId) annetaan pyynnön URL-parametrina ja päivitettävät tiedot pyynnön rungossa JSON-muodossa. 
Päivitetty kategoria palautetaan JSON-muodossa vastauksessa.
