package es.us.isa.ideas.util.yaml;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.HashMap;
import java.util.Map;
import org.yaml.snakeyaml.Yaml;

/**
 * Applied Software Engineering Research Group (ISA Group) University of
 * Sevilla, Spain
 *
 * @author Manuel Arenillas <marenillas@us.es>
 * @version 1.0
 */

public class Util {
        public static String convertToJson(String yamlString) {
        Yaml yaml = new Yaml();
        Map<String, String> obj = (Map<String, String>) yaml.load(yamlString);

        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(obj);
        return json;
    }

    public static String convertToYaml(String jsonContent) {
        Gson gson = new Gson();
        Map<String, String> map = new HashMap<String, String>();
        map = (Map<String, String>) gson.fromJson(jsonContent, map.getClass());

        Yaml yaml = new Yaml();
        String output = yaml.dump(map);
        return output;
    }
}
