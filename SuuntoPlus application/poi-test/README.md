# POI test – diagnostická SuuntoPlus aplikace (v0.1)

Cíl: zjistit, zda `/Navigation/Poi/Count` a `/Navigation/Poi/<index>/…`
vracejí jen knihovnu POI, nebo i waypointy (a odbočky) právě navigované trasy.

## Co obrazovka ukazuje

| Řádek    | Zdroj                                         |
|----------|-----------------------------------------------|
| St / Pos | `/Navigation/State`, `…/NavigatedRoute/Position` (0–1) |
| Count    | `/Navigation/Poi/Count`                       |
| A:       | `/Navigation/Poi/Active/Name`                 |
| A dist   | `/Navigation/Poi/Active/Distance` (vzdušně, m) |
| 0:       | `/Navigation/Poi/0/Name` + `/0/Coordinates`   |
| 1:, 2:   | `/Navigation/Poi/1/Coordinates`, `/2/Coordinates` |

`--` znamená, že zdroj zatím nic neposlal (nebo neexistuje).
Neznámý tvar souřadnic se zobrazí jako JSON.

## Postup testu

1. Otevři složku ve VS Code, v `t.html` si u cest `/Navigation/Poi/…`
   projdi napovídání (intellisense) – pokud nabízí jiné názvy
   (např. pro jméno POI podle indexu), oprav je i v `manifest.json`.
2. Simulátor: ověř, že se obrazovka vykreslí a v panelu Input jsou vidět vstupy.
3. Hodinky, cvičení **bez navigace**: poznamenej si `Count` a záznamy 0–2.
4. Totéž **s navigovanou trasou s odbočkami** (a pomocným WP typu Waypoint).
   - `Count` se zvýšil o počet waypointů trasy → seznam obsahuje i trasu.
   - Dívej se, zda `A:` někdy ukáže jméno odbočky („Turn left“ …),
     nebo jen běžné waypointy.
5. Pozor: aplikace nahraná z editoru může zmizet po synchronizaci
   se Suunto aplikací – před testem nesynchronizuj.

## Nejistoty (neověřeno)

- Cesty `/Navigation/Poi/Count` a `/Navigation/Poi/<index>/Coordinates`
  jsou nedokumentované, popsané jen na Suunto fóru.
- `/Navigation/Poi/0/Name` je odhad analogicky k `Active/Name`.
- CSS třídy a umístění jsou převzaté z existujících aplikací; na tvém
  displeji může být potřeba doladit `top:` hodnoty.
- Limit je 10 vstupů v manifestu; aplikace jich používá 9.
