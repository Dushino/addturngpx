# Test T6 – `<trk>` vs `<rte>` (Test 042, 2026-10-22)

Soubory vznikly ze `samples/Test 042 - pridany.gpx` (stejná čára 2,16 km, stejný zápis,
creator „Sports Tracker“). Název trasy v aplikaci Suunto = název souboru (z `metadata/name`).
Odbočky: 249 m Slight_left_turn (bez názvu) · 566 m Right_turn „Napravo“ · 1449 m Left_turn „Nalevo“.

| Soubor | Čára | Odbočky zapsané jako | Co test zjistí |
|---|---|---|---|
| **Test 042 trk body** | `<trk>` | name/type přímo v `trkpt` (jako „pridany“, jen trk) | Bere aplikace name/type z `trkpt`, když z `rtept` ne? |
| **Test 042 trk wpt** | `<trk>` | `<wpt>` na bodech čáry | Chová se `trk` + wpt jinak než `rte` + wpt (TbT, pole č. 4)? |
| **Test 042 rte wpt** | `<rte>` | `<wpt>` na bodech čáry (= formát AddTurn) | Kontrola na stejné trase |

## Co sledovat
- Po importu: stav „Navigace krok za krokem“ (sama zapnutá/vypnutá?), jsou odbočky vidět na mapě v aplikaci?
- V hodinkách: odbočky na mapě, notifikace, **pole č. 4 „Zbývající vzdálenost k místu zájmu / waypointu“** – ukazuje vzdálenost k odbočce z dálky, nebo až po notifikaci?
- Ideálně „trk wpt“ a „rte wpt“ projít se zapnutou i vypnutou Navigací krok za krokem (zároveň T5).

## T7 – `<desc>Auto-generated</desc>` u odboček (2026-10-22)
- **Test 042 rte autogen** = „Test 042 rte wpt“ + `<desc>Auto-generated</desc>` u všech tří odboček (jako mají Begin/End).

### Pevný postup (aby se neměnilo víc věcí najednou)
1. Starou trasu stejného jména v aplikaci smazat.
2. U naposledy použité trasy mít „Navigace krok za krokem“ **zapnutou** (nová trasa stav přebírá).
3. Importovat, zkontrolovat, že je volba u nové trasy zapnutá a odbočky jsou vidět v aplikaci.
4. Vynutit synchronizaci, počkat na dokončení.
5. Projít **za první odbočku (~300 m)** a zapsat: pole č. 4 před notifikací / po ní, notifikace, mapa.

Pořadí: nejdřív **„rte wpt“ znovu podle tohoto postupu** (kontrola – odpovídá T2b mix?), pak **„rte autogen“**. Liší se jen `desc`.
