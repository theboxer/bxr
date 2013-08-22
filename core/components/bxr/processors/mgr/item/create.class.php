<?php
/**
 * Create an Item
 * 
 * @package bxr
 * @subpackage processors
 */
class BXRCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'BXRItem';
    public $languageTopics = array('bxr:default');
    public $objectType = 'bxr.items';

    public function beforeSet(){
        $items = $this->modx->getCollection($this->classKey);

        $this->setProperty('position', count($items));

        return parent::beforeSet();
    }

    public function beforeSave() {
        $name = $this->getProperty('name');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('bxr.item_err_ns_name'));
        } else if ($this->doesAlreadyExist(array('name' => $name))) {
            $this->addFieldError('name',$this->modx->lexicon('bxr.item_err_ae'));
        }
        return parent::beforeSave();
    }
}
return 'BXRCreateProcessor';
