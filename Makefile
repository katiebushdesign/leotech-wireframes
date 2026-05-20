# Delegates to .wireframe-kit/
.PHONY: help parse-copy sync link-skills validate-blocks

KIT_DIR := ./.wireframe-kit

help parse-copy sync link-skills validate-blocks:
	@$(MAKE) -C $(KIT_DIR) $@
