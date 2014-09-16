<?php
$corePath = $modx->getOption('bxr.core_path', null, $modx->getOption('core_path', null, MODX_CORE_PATH) . 'components/bxr/');
/** @var BXR $bxr */
$bxr = $modx->getService('bxr', 'BXR', $corePath . 'model/bxr/', array('core_path' => $corePath));

$eventName = $modx->event->name;
switch($eventName) {
    case 'OnDocFormPrerender':
        $jsUrl = $bxr->getOption('jsUrl');

        $modx->regClientCSS($bxr->getOption('cssUrl') . 'mgr.css');
        $modx->regClientStartupScript($jsUrl . 'mgr/bxr.js');
        $modx->regClientStartupHTMLBlock('<script type="text/javascript">
            BXR.config = ' . $modx->toJSON($bxr->options) . ';
            BXR.config.connector_url = "' . $bxr->getOption('connectorUrl') . '";
        </script>');

        $modx->regClientStartupScript($jsUrl .'mgr/widgets/items.grid.js');

        $modx->controller->addLexiconTopic('bxr:default');

        $modx->regClientStartupScript($jsUrl . 'mgr/extras/modresource.js');

        break;
}