# Wireframe kit commands (run from repo root via top-level Makefile, or here)

KIT_ROOT := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
REPO_ROOT := $(abspath $(KIT_ROOT)/..)
DOCX ?= $(KIT_ROOT)content/source/copy.docx

.PHONY: help parse-copy sync link-skills validate-blocks setup-github

help:
	@echo ".wireframe-kit targets:"
	@echo "  make parse-copy        — docx → content/pages/*.json"
	@echo "  make sync              — sync nav + footer HTML"
	@echo "  make link-skills       — symlink skills for Cursor / Claude / OpenClaw"
	@echo "  make validate-blocks   — block classes exist in css/style.css"
	@echo "  make setup-github      — create katiebushdesign/{SLUG}-wireframes + Pages (SLUG= client name, e.g. 212-visual)"

parse-copy:
	python3 $(KIT_ROOT)scripts/parse-copy-docx.py $(DOCX)

sync:
	python3 $(KIT_ROOT)scripts/sync-nav.py
	python3 $(KIT_ROOT)scripts/sync-footer.py

link-skills:
	$(KIT_ROOT)scripts/link-agent-skills.sh

validate-blocks:
	python3 $(KIT_ROOT)scripts/validate-block-classes.py

setup-github:
	@test -n "$(SLUG)" || (echo "Usage: make setup-github SLUG=clientname [NAME='Client Name'] [YES=1]" >&2; exit 1)
	$(KIT_ROOT)scripts/setup-github-repo.sh --slug "$(SLUG)" $(if $(NAME),--name "$(NAME)",) $(if $(YES),--yes,)
