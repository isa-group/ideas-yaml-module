# IDEAS-YAML-MODULE

IDEAS-YAML-MODULE is a web project that provides a languague for ideas-studio.

##YAML

Let change to JSON.

## How to create a new version

1. Import in your Java IDE (i.e., Netbeans) the following projects:
    1. https://github.com/isa-group/ideas-yaml-module (import all Maven subprojects)
    2. https://github.com/isa-group/ideas-base-module
2. Start developing
3. Build all the WAR artifacts
4. Create a new Docker image with the updated WARs by running:
    1. `docker build -t isagroup/governify-designer-modules-yaml .`
    2. `docker push isagroup/governify-designer-modules-yaml`

If you wonder how to edit button operations, they are defined at `languages/ideas-oai-spec-language/src/main/webapp/WEB-INF/classes/language_manifest.json`.

## Requirements

Mandatory requirements:
* [Java SE Development Kit 7 or newer](http://www.oracle.com/technetwork/es/java/javase/downloads/index.html)
