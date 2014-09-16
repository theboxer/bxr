<?php
require_once dirname(__FILE__) . '/model/bxr/bxr.class.php';
/**
 * @package bxr
 */
abstract class BXRBaseManagerController extends modExtraManagerController {
    /** @var BXR $bxr */
    public $bxr;

    public function initialize() {
        $this->bxr = new BXR($this->modx);

        $this->addCss($this->bxr->getOption('cssUrl') . 'mgr.css');
        $this->addJavascript($this->bxr->getOption('jsUrl') . 'mgr/bxr.js');

        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            BXR.config = ' . $this->modx->toJSON($this->bxr->options) . ';
            BXR.config.connector_url = "' . $this->bxr->getOption('connectorUrl') . '";
        });
        </script>');

        parent::initialize();
    }

    public function getLanguageTopics() {
        return array('bxr:default');
    }

    public function checkPermissions() {
        return true;
    }
}