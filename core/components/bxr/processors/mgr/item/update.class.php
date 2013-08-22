<?php
/**
 * Update an Item
 * 
 * @package bxr
 * @subpackage processors
 */

class BXRUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'BXRItem';
    public $languageTopics = array('bxr:default');
    public $objectType = 'bxr.items';

    public function beforeSet() {
        $name = $this->getProperty('name');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('bxr.item_err_ns_name'));

        } else if ($this->modx->getCount($this->classKey, array('name' => $name)) && ($this->object->name != $name)) {
            $this->addFieldError('name',$this->modx->lexicon('bxr.item_err_ae'));
        }
        return parent::beforeSet();
    }

}
return 'BXRUpdateProcessor';