---
name: design-system-covers
description: Make or revise a README cover / social preview for a Zeabur open-source repository with the covers/ system (render.ts). Use when a repository needs a cover, when its product wording changes the quoted lines on an existing cover, or when reviewing an illustration for generic "AI-made" look.
---

# Covers

`covers/README.md` has the canvas, frame, lockup and rules; read it first.

1. **Pick one true moment of the product** a user meets: a real file it reads or writes, a
   real command and its real output, a real page state. Annotate it; do not decorate it.
   Every quoted line (`data-quote`) must exist in the source files named in `cover.ts`
   (`sources`); render.ts checks this, so a wording change in the product can fail a cover.
2. **Copy** follows the product's wording guide: a headline that states what it does for the
   reader, a tagline with the mechanism, alt text that describes the plate's content.
3. **Render** inside `nix develop` (`bun render.ts <name> --out <repo>/docs/images`) and look at
   both themes at full size and at 830 px, plus `social-preview.png`.
4. **Refuse the generic look.** render.ts rejects window chrome, three dots, floating cards,
   shadows, gradients, "…" and icons on the plate. Beyond the checks: no dot-grid + glow, no
   invented terminal session, no stock "dashboard" mock. Zeabur's own character is the frame of
   hairlines and crosses, hatched gutters, Geist, and the product's real text.
5. Commit the AVIFs in the product repository; the social preview is uploaded in the
   repository's GitHub settings by a maintainer.
