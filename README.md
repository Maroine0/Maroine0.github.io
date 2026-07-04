# Portfolio — Maroine Imounane

Site statique (HTML/CSS/JS vanilla), sans build ni dépendance. Ouvrir `index.html` dans un navigateur suffit.

## Structure

```
portfolio/
├── index.html          # Structure de la page (hero, à-propos, compétences, parcours, projets, contact)
├── css/
│   ├── base.css        # Variables (:root), reset, typographie, boutons, chips, reveal
│   ├── layout.css      # Header/nav, hero, divider Pac-Man, marquee, footer
│   └── sections.css    # À-propos, compétences, parcours, projets (carte terminal), contact
├── js/
│   └── main.js         # Interactions : header au scroll, rotation des rôles, marquee, Pac-Man, reveal
└── archive/            # Ancienne version monolithique (un seul fichier HTML)
```

## Développement local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```
