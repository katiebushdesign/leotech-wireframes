# Delegates to .wireframe-kit/
.PHONY: help parse-copy sync link-skills validate-blocks setup-github

KIT_DIR := ./.wireframe-kit

help parse-copy sync link-skills validate-blocks setup-github:
	@$(MAKE) -C $(KIT_DIR) $@
