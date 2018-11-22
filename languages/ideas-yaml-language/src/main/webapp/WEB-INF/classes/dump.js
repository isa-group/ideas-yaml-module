var newUri = EditorManager.currentUri.substring(0, EditorManager.currentUri.lastIndexOf('/')) + '/plans';
var relativePath = 'https://designer.governify.io:10843/DemoMaster/sla4oaiDemo3/sla4oaiDemo';
var accessToken = '165a1761634db1e9bd304ea6f3ffcf2b';
var plansAgContent = '';
var plansCtlContent = '';
var plansAngContent = '';
var swagger = jsyaml.safeLoad(EditorManager.getCurrentEditorContent());
if (newUri + '.oai-at' in EditorManager.tabsMap)
    EditorManager.deleteNode(newUri + '.oai-at', false, function () {});
if (newUri + '.ctl' in EditorManager.tabsMap)
    EditorManager.deleteNode(newUri + '.ctl', false, function () {});
if (newUri + '.ang' in EditorManager.tabsMap)
    EditorManager.deleteNode(newUri + '.ang', false, function () {});
if (EditorManager.currentUri.substring(0, EditorManager.currentUri.lastIndexOf('/')) + 'access-token.json' in EditorManager.tabsMap)
    EditorManager.deleteNode(EditorManager.currentUri.substring(0, EditorManager.currentUri.lastIndexOf('/')) + '/access-token.json', false, function () {});
$.ajax({
    url: relativePath + '/plans.oai-at?accessToken=' + accessToken,
    method: 'GET',
    timeout: 3600000
}).done(function (data, textStatus, jqXHR) {
    if (jqXHR.status !== 200) {
        console.error(jqXHR)
    } else {
        plansAgContent = data;
        $.ajax({
            url: relativePath + '/plans.ctl?accessToken=' + accessToken,
            method: 'GET',
            timeout: 3600000
        }).done(function (data, textStatus, jqXHR) {
            if (jqXHR.status !== 200) {
                console.error(jqXHR)
            } else {
                plansCtlContent = data;
                $.ajax({
                    url: relativePath + '/plans.ang?accessToken=' + accessToken,
                    method: 'GET',
                    timeout: 3600000
                }).done(function (data, textStatus, jqXHR) {
                    if (jqXHR.status !== 200) {
                        console.error(jqXHR)
                    } else {
                        plansAngContent = data;
                        $.ajax({
                            url: relativePath + '/access-token.json?accessToken=' + accessToken,
                            method: 'GET',
                            timeout: 3600000
                        }).done(function (data, textStatus, jqXHR) {
                            if (jqXHR.status !== 200) {
                                console.error(jqXHR)
                            } else {
                                var accessTokenContent = data;
                                console.info('access',accessTokenContent);
                                EditorManager.createNode(EditorManager.currentUri.substring(0, EditorManager.currentUri.lastIndexOf('/')) + '/access-token.json', 'access-token', '.json', function () {
                                    EditorManager.saveFile(EditorManager.currentUri.substring(0, EditorManager.currentUri.lastIndexOf('/')) + '/access-token.json', accessTokenContent, function () {
                                        EditorManager.createNode(newUri + '.oai-at', 'plans', '.oai-at', function () {
                                            var c = jsyaml.safeLoad(plansAgContent);
                                            c['context']['api'] = 'https://designer.governify.io:10843/' + principalUserName + '/' + EditorManager.currentUri + '?accessToken=' + accessToken
                                            EditorManager.saveFile(newUri + '.oai-at', jsyaml.safeDump(c), function () {
                                                EditorManager.createNode(newUri + '.ctl', 'plans', '.ctl', function () {
                                                    EditorManager.saveFile(newUri + '.ctl', plansCtlContent, function () {
                                                        EditorManager.createNode(newUri + '.ang', 'plans', '.ang', function () {
                                                            EditorManager.saveFile(newUri + '.ang', plansAngContent, function () {
                                                                delete swagger['host'];
                                                                delete swagger['basePath'];
                                                                swagger['info']['x-sla'] = 'https://designer.governify.io:10843/' + principalUserName + '/' + EditorManager.currentUri.substring(0, EditorManager.currentUri.lastIndexOf('/')) + '/plans.oai-at?accessToken=' + accessToken;
                                                                document.editor.setValue(jsyaml.safeDump(swagger));
                                                                console.info('ok');
                                                                setTimeout(function () {
                                                                    EditorManager.openFile(newUri + '.oai-at');
                                                                }, 1150);
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                            console.error(errorThrown)
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                            console.error(errorThrown)
                        })
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.error(errorThrown)
                })
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown)
        })
    }
});