# Pravidla spolupráce

- Claude nikdy sám neprovádí operace s git repozitářem (commit, push, add, branch…).
- Postupuje se po cyklech podle feature: vyjasnění specifikace → implementace →
  test → odstranění chyb → potvrzení od uživatele, že lze pokračovat.
- Při nejasnostech se Claude ptá před dalším krokem.
- Claude vede poznámky v `docs/dev/`: DESIGN.md (design), PROGRESS.md (postup),
  TODO.md (úkoly), RULES.md (tato pravidla).
