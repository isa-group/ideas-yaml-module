FROM tomcat:7.0.69-jre7

LABEL maintainer="ISA Research Group <isagroup.us@gmail.com>"

ENV CATALINA_OPTS="-XX:PermSize=256m -XX:MaxPermSize=768m -server -Xms256m -Xmx1g -XX:SurvivorRatio=6 -XX:+UseConcMarkSweepGC -XX:+CMSParallelRemarkEnabled -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=68 -XX:+ScavengeBeforeFullGC -XX:+CMSScavengeBeforeRemark -XX:+HeapDumpOnOutOfMemoryError"

# Create keystore
RUN /usr/lib/jvm/java-7-openjdk-amd64/jre/bin/keytool -genkey -alias tomcat -keyalg RSA -storepass changeit -dname "cn=Mark Jones, ou=JavaSoft, o=Sun, c=US" -keypass changeit -keystore ./.keystore

# Configure tomcat with ssl and modify tomcat user
ADD ./tomcat-config/tomcat-users.xml ./conf/tomcat-users.xml
ADD ./tomcat-config/server.xml ./conf/server.xml
ADD ./tomcat-config/web.xml ./conf/web.xml

# Add war to webapps
ADD ./languages/ideas-oai-spec-language/target/ideas-oai-spec-language-1.0.0.war ./webapps/ideas-oai-spec-language.war
ADD ./languages/ideas-yaml-language/target/ideas-yaml-language-1.0.0.war ./webapps/ideas-yaml-language.war

EXPOSE 80 443
CMD cd /usr/local/tomcat && ./bin/catalina.sh run