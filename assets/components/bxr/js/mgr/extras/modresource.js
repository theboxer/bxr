Ext.override(MODx.panel.Resource, {
    bxrOriginals: {
        getFields: MODx.panel.Resource.prototype.getFields,
        getMainRightFields: MODx.panel.Resource.prototype.getMainRightFields
    }

    ,getFields: function(config) {
        var fields = this.bxrOriginals.getFields.call(this, config);

        fields.splice(2, 0, {
            xtype: 'bxr-grid-items'
            ,preventRender: true
            ,cls: 'main-wrapper'
            ,anchor: '100%'
        });

        return fields;
    }

    ,getMainRightFields: function(config) {
        var fields = this.bxrOriginals.getMainRightFields.call(this, config);

        var authorField = {
            xtype: 'modx-combo-user'
            ,fieldLabel: _('resource_createdby')
            ,name: 'created_by'
            ,hiddenName: 'createdby'
            ,fields: ['fullname','id']
            ,displayField: 'fullname'
            ,editable: false
            ,anchor: '100%'
        };

        Ext.each(fields, function (field, index) {
            if (field.name == 'link_attributes') {
                fields.splice(index + 1, 0, authorField);

                return false;
            }
        });

        return fields;
    }
});