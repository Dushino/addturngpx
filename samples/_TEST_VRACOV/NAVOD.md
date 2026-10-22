# Testy na hodinkách – Vracov 5km (2026-10-22)

Všechny soubory vytvořila aplikace AddTurn GPX (formát exportu z aplikace Suunto,
jeden řádek, waypointy přesně na bodech trasy, s výškou). Trasa je stejná jako
`samples/Vracov 5km.gpx` (5,06 km, okruh ze severu proti směru hodinek – začátek a
konec u Lesní ulice). Liší se jen waypointy. Název trasy v aplikaci Suunto = název souboru.

| Soubor / trasa v aplikaci | Waypointy (vzdálenost od startu) | Co test zjistí |
|---|---|---|
| **Vracov T2 AddTurn** | 8 odboček z generátoru, typy odboček, **bez názvů**: 558 m Bear left, 708 m Keep left at fork, 1195 m Keep left at fork, 1944 m Turn left, 2481 m Turn left, 3236 m Bear left, 4111 m Keep right at fork, 4532 m Bear left | Jak se chová současný výstup AddTurn (T2) |
| **Vracov T2 names** | stejných 8 odboček, typy odboček, **s názvy** „1 Bear left“ … „8 Bear left“ | Pomůže název? |
| **Vracov T2 POI** | stejných 8 míst, typ **Waypoint** (obecný bod zájmu), s názvy „1 Bear left“ … | Počítá pole body zájmu jinak než odbočky? |
| **Vracov T2b mix** | 1195 m (a) Keep left at fork bez názvu · 1944 m (b) Turn left s názvem „B Turn left“ · 3236 m (c) Waypoint „C Waypoint“ · 4111 m (d) Crossroads „D Crossroads“ | Porovnání typů a názvu na jedné trase; body jsou 750–1300 m od sebe, takže jde vidět pole i mimo dosah notifikace (T1) |

## Co sledovat u každé trasy
Na datové obrazovce mít vedle sebe pole **Distance to waypoint** a **Distance to next turn**
(případně i **Distance to POI**). Hlavně:
1. **Mimo notifikaci** (daleko od bodu, bez modrého pole dole): ukazuje pole vzdálenost
   k dalšímu bodu, nebo do cíle? (T1)
2. U kterého bodu se hodnota přepne na další bod – tj. **které body pole započítá**
   a které přeskočí. (T2, T2b)
3. Jaká přijde notifikace (ikona, text, vzdálenost) a kdy.
4. Jestli je bod vidět na mapě v hodinkách.

Stačí projít první 2 km (do 1944 m jsou body všech variant) a pak trasy přepínat.
V T2b mix je zajímavý celý okruh (body c a d jsou za 3 km).

## Nastavení (zapsat ke každé variantě)
- Aplikace Suunto: „Navigace krok za krokem“ u trasy zapnuto / vypnuto.
- Hodinky: NOTIFICATIONS → Turn by turn zapnuto / vypnuto (T5 – zkusit obojí aspoň na jedné trase).
- Fotky v okamžiku, kdy se hodnota pole přepne.

## Další testy z TODO (nejsou soubory)
- **T3:** sdílený soubor `samples/_FUNKCNI/test51-test1.gpx` naimportovat jako novou trasu – chová se stejně?
- **T4:** trasu už nahranou v hodinkách upravit v aplikaci (přidat bod) → znovu synchronizovat / uložit jako kopii – započítá se nový bod?
