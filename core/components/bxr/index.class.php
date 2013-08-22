<?php
require_once dirname(__FILE__) . '/model/bxr/bxr.class.php';
/**
 * @package bxr
 */
class IndexManagerController extends BXRBaseManagerController {
    public static function getDefaultController() { return 'home'; }
}

abstract class BXRBaseManagerController extends modExtraManagerController {
    /** @var BXR $bxr */
    public $bxr;
    public function initialize() {
        $this->bxr = new BXR($this->modx);

        $this->addCss($this->bxr->config['cssUrl'].'mgr.css');
        $this->addJavascript($this->bxr->config['jsUrl'].'mgr/bxr.js');
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            BXR.config = '.$this->modx->toJSON($this->bxr->config).';
            BXR.config.connector_url = "'.$this->bxr->config['connectorUrl'].'";
        });
        </script>');
        return parent::initialize();
    }
    public function getLanguageTopics() {
        return array('bxr:default');
    }
    public function checkPermissions() { return true;}
}