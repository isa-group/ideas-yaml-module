package es.us.isa.ideas.controller.sample;

import es.us.isa.ideas.module.common.AppResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import es.us.isa.ideas.module.controller.BaseLanguageController;
import es.us.isa.ideas.util.yaml.Util;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Applied Software Engineering Research Group (ISA Group) University of
 * Sevilla, Spain
 *
 * @author Manuel Arenillas <marenillas@us.es>
 * @version 1.0
 */

@Controller
@RequestMapping("/language")
public class YamlLanguageController extends BaseLanguageController {

    @RequestMapping(value = "/operation/{id}/execute", method = RequestMethod.POST)
    @ResponseBody
    @Override
    public AppResponse executeOperation(String id, String content, String fileUri, String data, HttpServletRequest request) {
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    @RequestMapping(value = "/format/{format}/checkLanguage", method = RequestMethod.POST)
    @ResponseBody
    @Override
    public AppResponse checkLanguage(String format, String content, String fileUri, HttpServletRequest request) {
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    @RequestMapping(value = "/convert", method = RequestMethod.POST)
    @ResponseBody
    @Override
    public AppResponse convertFormat(String currentFormat, String desiredFormat, String fileUri, String content, HttpServletRequest request) {

        AppResponse appResponse = new AppResponse();
        appResponse.setFileUri(fileUri);

        if (currentFormat.equals("json") && desiredFormat.equals("yaml")) {
            appResponse.setStatus(AppResponse.Status.OK);
            appResponse.setData(Util.convertToYaml(content));
        } else if (currentFormat.equals("yaml") && desiredFormat.equals("json")) {
            appResponse.setStatus(AppResponse.Status.OK);
            appResponse.setData(Util.convertToJson(content));
        }
        return appResponse;

    }

}
