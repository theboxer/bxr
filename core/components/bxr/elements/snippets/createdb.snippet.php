<?php
$bxr = $modx->getService('bxr','BXR',$modx->getOption('bxr.core_path',null,$modx->getOption('core_path').'components/bxr/').'model/bxr/',$scriptProperties);
if (!($bxr instanceof BXR)) return '';


$m = $modx->getManager();
$m->createObjectContainer('BXRItem');
return 'Table created.';