# UISS merch image assets

Prepared with the built-in image generation/editing tool in edit mode. Source files were inspected as lossless PNG previews of the supplied AVIFs. Originals were left unchanged.

- White source: `/Users/air/Downloads/1090-white.avif`
- Black source: `/Users/air/Downloads/tshirts.avif`
- White page asset: `public/merch/uiss-polo-white-front-v2.png`
- Black page asset: `public/merch/uiss-polo-black-front.png`

The page uses transparent front-only mockups. The back shirt and decorative background are excluded. As edited mockups, these are visual previews of the supplied designs, rather than original production artwork.

## Initial white edit prompt

Use case: background-extraction. Asset type: transparent front-only polo product cutout for UISS merchandise page. Edit the supplied image, do not redesign. Remove the rear-facing shirt and every background panel, texture, border and shadow. Keep only the complete front-facing polo, centered in a portrait composition with roughly 8% transparent margin on all sides. Preserve the exact original shirt silhouette, collar, three buttons, fabric shading, chest crest and UISS chest artwork and its placement. Reconstruct only any shirt edge obscured by overlap. Both sleeves and bottom hem must be complete. No back view, hanger, person, added writing, ground shadow or watermark. Preserve the genuine transparent alpha background. Subject: the WHITE polo in the foreground. Keep the UDSM colored crest on image-left chest and the black UISS emblem/text on image-right chest exactly as supplied.

## Initial black edit prompt

Use case: background-extraction. Asset type: transparent front-only polo product cutout for UISS merchandise page. Edit the supplied image, do not redesign. Remove the rear-facing shirt and every background panel, texture, border and shadow. Keep only the complete front-facing polo, centered in a portrait composition with roughly 8% transparent margin on all sides. Preserve the exact original shirt silhouette, collar, three buttons, fabric shading, chest crest and UISS chest artwork and its placement. Reconstruct only any shirt edge obscured by overlap. Both sleeves and bottom hem must be complete. No back view, hanger, person, added writing, ground shadow or watermark. Preserve the genuine transparent alpha background. Subject: the BLACK/charcoal polo in the foreground. Keep the UDSM colored crest on image-left chest and the gold emblem with white UISS text on image-right chest exactly as supplied.

## Final refinement prompt (both colors)

Use case: precise-object-edit. Image 1 is the front-only cutout to refine; image 2 is the ORIGINAL approved UISS product artwork. Make a very localized correction: restore the two chest logos from the front shirt of image 2 exactly, matching the source design, artwork, color, text, relative size and placement. Copy the source crest and UISS mark faithfully; do not invent a new crest, reinterpret the emblem, or retype logo lettering. Keep the rest of the front-only shirt from image 1 unchanged, including color, collar, 3 buttons, silhouette and shading. Clean alpha edges to remove all white flecks, halos, or stray pixels outside the shirt; use a smooth antialiased cutout edge. No back shirt or background elements. Genuine transparent background. Center the complete front-only polo with transparent margin; do not clip sleeves or hem.

## White crest motto correction

Use case: text-localization / precise-object-edit. Make ONE tiny correction to image 1, the transparent white polo cutout. On the ribbon beneath the UDSM crest on the image-left chest, replace the current ribbon lettering with the EXACT original motto from image 2: "HEKIMA NI UHURU". Spell H E K I M A  N I  U H U R U. Use the source crest's small dark-blue uppercase lettering on the gold-edged ribbon. Do not write UNIVERSITY OF DAR ES SALAAM there. Keep everything else in image 1 unchanged: chest logo size and position, the crest illustration, the black UISS emblem and lettering, collar, three buttons, white fabric, shape, sleeves, hem, transparent background and framing. No extra text or image elements. Preserve transparency.
