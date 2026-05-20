# Delegates to .wireframe-kit/
.PHONY: help parse-copy sync link-skills validate-blocks setup-github clean-content

KIT_DIR := ./.wireframe-kit

help parse-copy sync link-skills validate-blocks setup-github clean-content:
	@$(MAKE) -C $(KIT_DIR) $@
