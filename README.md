# Oefening 05

## Voorbereiding:
Clone de git-repository uit github en maak je eigen branch.
1. Kopieer de url via github naar je klembord:  
   ![Copy url](https://raw.githubusercontent.com/SyntraFSD-JS/ex-01/master/images/copy_github.png "Copy url to clipboard")

Gebruik de terminal uit VSCode 
(zorg dat je in de juiste folder, die waar je alle oefeningen opslaat, zit in VSCode)
 om de volgende commands uit te voeren.
(vervang `[naam]` door je eigen naam)

1. `git clone https://github.com/SyntraFSD-JS/ex-05.git ex-05`
2. `cd ex-05`
3. `git checkout -b [naam]`
4. `git push --set-upstream origin [naam]`

Push regelmatig de changes die je maakt naar github

1. Commit je changes:
   1. Druk `Ctrl-Shift-G` om de Source Control tab te openen
   2. Geef een beschrijving van de changes die je deed en duw `Ctrl-Enter`
2. Push je changes:
   1. Druk `Ctrl-Shift-P` om het Command Palette te openen
   2. Zoek naar `Git: Push` en druk op `Enter` om uit te voeren 
   
Pull regelmatig om opmerkingen of aanpassingen van mij binnen te halen
1. Druk `Ctrl-Shift-P` om het Command Palette te openen
2. Zoek naar `Git: Pull` en druk op `Enter` om uit te voeren 
     
## Structuur
De oefeningen bevinden zich in een aparte map met de naam `ex[oef. nummer]_[oef. naam]`
Daarin zitten alle bestanden die je nodig hebt om de oefening te maken, meestal is dit een `index.html` en een `super-slider.js` bestand.
Het script bestand zal al gelinkt zijn aan het html bestand. Zie:
```html
<script src="super-slider.js"></script>
```
Normaal moet je niet in het html bestand meer werken maar enkel in `super-slider.js`.
Ook daar zal meestal al een basisstructuur aanwezig zijn waarbij in comments staat waar je zelf dingen moet aanvullen.

Om het resultaat van je oefening te bekijken open je het `index.html` bestand in chrome.
In deze module gebruiken we allemaal chrome zodat we allemaal hetzelfde resultaat hebben.

## Oefeningen:
### Oefening 05: Super Slider
#### Doel:
Een afbeelding slider.
- Het is de bedoeling dat we een slider programmeren die heel makkelijk kan herbruikt worden op 
verschillende plaatsen (plugin).
- We verwachten van onze gebruiker dat hij de volgende structuur hanteert in zijn html:  
  ```html
  <section>
      <img src="path/img.jpg" alt="">
      <img src="path/img.jpg" alt="">
      <img src="path/img.jpg" alt="">
      <img src="path/img.jpg" alt="">
      <img src="path/img.jpg" alt="">
  </section>
  ```
- De eerste stap die ons script moet doen is bovenstaande HTML aanpassen tot:
  ```html
  <section class="ss-container">
    <div class="ss-arrow ss-left"><i class="fas fa-angle-left fa-5x"></i></div>
    <div class="ss-arrow ss-right"><i class="fas fa-angle-right fa-5x"></i></div>
    <div class="ss-bullets">
      <div class="ss-bullet active" data-index="0"></div>
      <div class="ss-bullet" data-index="1"></div>
      <div class="ss-bullet" data-index="2"></div>
      <div class="ss-bullet" data-index="3"></div>
      <div class="ss-bullet" data-index="4></div>
    </div>
    <div class="ss-slide" data-index="0">
      <img src="path/img.jpg" alt="">
      <img src="path/img.jpg" alt="">
      <img src="path/img.jpg" alt="">
      <img src="path/img.jpg" alt="">
      <img src="path/img.jpg" alt="">
    </div>
  </section>
  ```
- Er kan zowel genavigeerd worden door op de pijlen (`.ss-arrow`) te klikken, 
als op een `ss-bullet` te klikken.




   
      
