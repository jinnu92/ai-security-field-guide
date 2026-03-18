#!/bin/sh
set -eu

if ! command -v pandoc >/dev/null 2>&1; then
  echo "pandoc not found. Install it first (brew install pandoc)." >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MANIFEST="$ROOT/book/manifest.txt"
META="$ROOT/book/metadata.yml"
EPUB_CSS="$ROOT/book/epub.css"
COVER_TEX="$ROOT/book/cover.tex"
OUT_DIR="$ROOT/dist"

mkdir -p "$OUT_DIR"

TMP_MD="$(mktemp)"
cat "$MANIFEST" | while read -r file; do
  [ -z "$file" ] && continue
  echo "" >> "$TMP_MD"
  cat "$ROOT/$file" >> "$TMP_MD"
  echo "" >> "$TMP_MD"
done

# EPUB
pandoc "$TMP_MD" \
  --from=markdown+smart \
  --metadata-file="$META" \
  --css="$EPUB_CSS" \
  --toc \
  --toc-depth=3 \
  --metadata=cover-image:"$ROOT/docs/assets/cover.png" \
  --output "$OUT_DIR/ai-security-field-guide.epub"

# PDF (requires LaTeX engine)
if command -v xelatex >/dev/null 2>&1; then
  PDF_ENGINE="xelatex"
elif command -v pdflatex >/dev/null 2>&1; then
  PDF_ENGINE="pdflatex"
else
  echo "No LaTeX engine found (xelatex/pdflatex). Skipping PDF build." >&2
  echo "Install MacTeX or TinyTeX to enable PDF output." >&2
  rm -f "$TMP_MD"
  exit 0
fi

pandoc "$TMP_MD" \
  --from=markdown+smart \
  --metadata-file="$META" \
  --include-before-body="$COVER_TEX" \
  --toc \
  --toc-depth=3 \
  --pdf-engine="$PDF_ENGINE" \
  --variable=papersize:a4 \
  --variable=geometry:margin=1in \
  --output "$OUT_DIR/ai-security-field-guide.pdf"

rm -f "$TMP_MD"
echo "Build complete: $OUT_DIR"
