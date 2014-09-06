<?php
if ($object->xpdo) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            /** @var modX $modx */
            $modx =& $object->xpdo;

            $modelPath = $modx->getOption('bxr.core_path',null,$modx->getOption('core_path').'components/bxr/').'model/';
            $modx->addPackage('bxr',$modelPath);

            $manager = $modx->getManager();
            $manager->createObjectContainer('BXRItem');

            break;
    }
}
return true;
