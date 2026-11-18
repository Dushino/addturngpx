# Test importu FIT do Garmin Connect (2026-11-18)

Problém: po importu FIT z AddTurn ukazuje Garmin Connect v „Body trasy“ jen začátek a konec;
ručně přidaný bod (Kemp) Garmin Connect zapíše do FIT jako `course_point` typu `campsite`
(`COURSE_531083917.fit`, export z Garmin Connect).

Oba testovací soubory mají stejnou trasu (Vracov 5km) a 14 bodů kurzu, každý jiného typu.
Název říká typ: T01 generic, T02 summit, T03 water, T04 food, T05 danger, T06 campsite, T07 info,
T08 left, T09 right, T10 straight, T11 leftFork, T12 slightLeft, T13 sharpRight, T14 uTurn.

| Soubor | Zápis |
|---|---|
| `AddTurn test A.fit` | současný export AddTurn (výrobce development, časy u bodů, body za záznamy) |
| `AddTurn test B.fit` | napodobuje export Garmin Connect (výrobce garmin / connect, bez časů, message_index, body proložené mezi záznamy podle vzdálenosti, stop_disable_all) |

Postup: v Garmin Connect importovat **oba** soubory jako kurz (Trénink a plánování → Kurzy → Importovat)
a u každého zapsat, které body T01–T14 jsou v „Body trasy“.

Vyhodnocení:
- v A i B jen body zájmu (T01–T07) → Garmin Connect odbočky při importu zahazuje (hledat jinou cestu: USB, GPX);
- v B víc než v A → rozhoduje zápis (výrobce / časy / pořadí) → export upravit podle B;
- v obou všechny → chyba byla jinde (porovnat s posledním exportem z aplikace).
