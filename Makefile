.PHONY: create_component
create_component:
	echo "Creating component..."
	read -p "Enter component name: " component_name; \
	read -p "Enter directory name (default: Elements): " directory_name; \
	if [ -z "$$directory_name" ]; then \
		directory_name="Elements"; \
	fi; \
	mkdir -p src/components/$$directory_name/$$component_name; \
	touch src/components/$$directory_name/$$component_name/$$component_name.tsx; \
	touch src/components/$$directory_name/$$component_name/$$component_name.module.css; \
	echo -e "import styles from './$$component_name.module.css' \n\nexport const $$component_name = () => {\n\treturn (\n\t\t<>\n\t\t\t\n\t\t</>\n\t)\n}\n\nexport default $$component_name" > src/components/$$directory_name/$$component_name/$$component_name.tsx; \
	echo "Component created successfully!"