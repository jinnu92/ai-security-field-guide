#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

LINK_RE = re.compile(r'(?<!\!)\[[^\]]+\]\(([^)]+)\)')
HEADING_RE = re.compile(r'^(#{1,6})\s+(.+?)\s*$')


def slugify(text: str) -> str:
    text = text.strip().lower()
    # Remove inline code ticks and emphasis markers for anchor parity.
    text = re.sub(r'[`*_~]+', '', text)
    # Replace non-alphanum with hyphens.
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text


def collect_anchors(md_path: Path) -> set[str]:
    anchors: set[str] = set()
    for line in md_path.read_text(encoding="utf-8").splitlines():
        m = HEADING_RE.match(line)
        if not m:
            continue
        anchors.add(slugify(m.group(2)))
    return anchors


def is_external(target: str) -> bool:
    return (
        target.startswith("http://")
        or target.startswith("https://")
        or target.startswith("mailto:")
    )


def split_target(target: str) -> tuple[str, str | None]:
    if "#" in target:
        path, anchor = target.split("#", 1)
        return path, anchor
    return target, None


def main() -> int:
    errors: list[str] = []
    for md in DOCS.rglob("*.md"):
        text = md.read_text(encoding="utf-8")
        for match in LINK_RE.finditer(text):
            target = match.group(1).strip()
            if not target or is_external(target) or target.startswith("#"):
                continue
            path, anchor = split_target(target)
            target_path = (md.parent / path).resolve()
            if not target_path.exists():
                errors.append(f"{md}: missing file link: {target}")
                continue
            if anchor:
                anchors = collect_anchors(target_path)
                if slugify(anchor) not in anchors:
                    errors.append(f"{md}: missing anchor in {path}: #{anchor}")

    if errors:
        print("Link check failed:\n")
        for err in errors:
            print(f"- {err}")
        return 1

    print("Link check passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
