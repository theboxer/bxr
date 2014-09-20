<?php
require_once dirname(dirname(__FILE__)) . '/index.class.php';

/**
 * Loads the home page.
 *
 * @package bxr
 * @subpackage controllers
 */
class BXRHomeManagerController extends BXRBaseManagerController {
    public function process(array $scriptProperties = array()) {

    }

    public function getPageTitle() { return $this->modx->lexicon('bxr'); }

    public function loadCustomCssJs() {
        $jsUrl = $this->bxr->getOption('jsUrl');

        $this->addJavascript($jsUrl .'mgr/widgets/items.window.js');
        $this->addJavascript($jsUrl .'mgr/widgets/items.grid.js');
        $this->addJavascript($jsUrl . 'mgr/widgets/home.panel.js');
        $this->addLastJavascript($jsUrl . 'mgr/sections/home.js');
    }

    public function getTemplateFile() {
        return $this->bxr->getOption('templatesPath') . 'home.tpl';
    }
}