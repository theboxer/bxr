<?php
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
        $this->addJavascript($this->bxr->config['jsUrl'].'mgr/extra/griddraganddrop.js');
        $this->addJavascript($this->bxr->config['jsUrl'].'mgr/extra/tags.extra.js');
        $this->addJavascript($this->bxr->config['jsUrl'].'mgr/widgets/items.grid.js');
        $this->addJavascript($this->bxr->config['jsUrl'].'mgr/widgets/home.panel.js');
        $this->addLastJavascript($this->bxr->config['jsUrl'].'mgr/sections/home.js');
    }
    public function getTemplateFile() { return $this->bxr->config['templatesPath'].'home.tpl'; }
}