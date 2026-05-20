# Delegates to .wireframe-kit/
.PHONY: help parse-copy sync link-skills validate-blocks setup-github clean-content serve serve-stop serve-status

KIT_DIR := ./.wireframe-kit

help parse-copy sync link-skills validate-blocks setup-github clean-content serve serve-stop serve-status:
	@$(MAKE) -C $(KIT_DIR) $@
