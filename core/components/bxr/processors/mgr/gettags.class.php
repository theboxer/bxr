<?php
class BXRGetTagsProcessor extends modObjectProcessor {
    /**
     * Run the processor and return the result. Override this in your derivative class to provide custom functionality.
     * Used here for pre-2.2-style processors.
     *
     * @return mixed
     */
    public function process() {

        $tags = array();

        for($i = 1; $i <= 1000; $i++){
            $tags[] = array('cool tag ' . $i);
        }

        return $this->success('', $tags);
    }
}

return 'BXRGetTagsProcessor';