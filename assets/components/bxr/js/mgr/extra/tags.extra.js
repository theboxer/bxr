BXR.extra.Tags = function(config) {
    config = config || {};
    Ext.apply(config,{
        ignoreCase: true
        ,valueField: 'tag'
        ,displayField: 'tag'
        ,minChars: 3
//        ,listeners: {
//            change: this.autoComplete
//        }
    });
    BXR.extra.Tags.superclass.constructor.call(this,config);
};
Ext.extend(BXR.extra.Tags,Ext.form.ComboBox,{
    mode: 'local'
    ,hideTrigger: true

    ,defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "on"}

    ,myStore: new Ext.data.ArrayStore({
        autoDestroy: true,
        storeId: 'tagsStore',
        idIndex: 0,
        fields: ['tag']
    })

    ,store: new Ext.data.ArrayStore({
        autoDestroy: true,
        storeId: 'autoCompleteStore',
        idIndex: 0,
        fields: ['tag'],
        data: [
            ['cool tag 1'],
            ['second tag 2'],
            ['third tag 3'],
            ['cool tag 4'],
            ['cool tag 5']
        ]
    })

    ,onRender : function(ct, position){
            if(this.hiddenName && !Ext.isDefined(this.submitValue)){
                this.submitValue = false;
            }
            Ext.form.ComboBox.superclass.onRender.call(this, ct, position);

            this.el.parent().wrap({
                tag: 'div'
                ,id: 'bxr-field-tags'
            });

            this.el.parentNode = this.el.parent().parent();

            Ext.DomHelper.insertAfter(this.el.parent(), {tag: 'ul'});
            Ext.DomHelper.insertAfter(this.el.parent(), {tag: 'button', html: 'Add'});

            this.addButton = this.el.parentNode.child('button');
            this.insertedTagsEl = this.el.parentNode.child('ul');

            this.insertedTagsEl.wrap({tag: 'div', class: 'inserted-tags'});

            this.addButton.on('click', function(){
                var values = this.getValue().split(',');
                Ext.each(values, function (value) {
                    if(this.ignoreCase){
                        value = value.toLowerCase();
                    }

                    value = value.replace(/^\s+|\s+$/g, '');

                    if(value == ''){
                        return;
                    }

                    var item = new BXR.extra.TagsItem({
                        owner: this,
                        renderTo: this.insertedTagsEl,
                        value: value
                    });
                    item.render();
                }, this);
                this.setValue();
            }, this);

            if(this.hiddenName){
                this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName,
                    id: (this.hiddenId || Ext.id())}, 'before', true);

            }
            if(Ext.isGecko){
                this.el.dom.setAttribute('autocomplete', 'off');
            }

            if(!this.lazyInit){
                this.initList();
            }else{
                this.on('focus', this.initList, this, {single: true});
            }
        }

    ,doQuery : function(q, forceAll){
        q = Ext.isEmpty(q) ? '' : q;
        q = q.split(',');
        q = q[q.length - 1];
        q = q.replace(/^\s+|\s+$/g, '');

        var qe = {
            query: q,
            forceAll: forceAll,
            combo: this,
            cancel:false
        };
        if(this.fireEvent('beforequery', qe)===false || qe.cancel){
            return false;
        }
        q = qe.query;
        console.log(q.length);
        console.log((q.length >= this.minChars));
        forceAll = qe.forceAll;
        if(forceAll === true || (q.length >= this.minChars)){
            if(this.lastQuery !== q){
                this.lastQuery = q;
                if(this.mode == 'local'){
                    this.selectedIndex = -1;
                    if(forceAll){
                        this.store.clearFilter();
                    }else{
                        this.store.filter(this.displayField, q);
                    }
                    this.onLoad();
                }else{
                    this.store.baseParams[this.queryParam] = q;
                    this.store.load({
                        params: this.getParams(q)
                    });
                    this.expand();
                }
            }else{
                this.selectedIndex = -1;
                this.onLoad();
            }
        }
    }

    ,onSelect : function(record, index){
        if(this.fireEvent('beforeselect', this, record, index) !== false){
            var values;
            if(this.getValue() == ''){
                values = [];
            }else{
                values = this.getValue().split(',');
            }

            values.push(record.data[this.valueField || this.displayField]);
            this.setValue(values.join(','));
            this.collapse();
            this.fireEvent('select', this, record, index);
        }
    }

});
Ext.reg('bxr-field-tags',BXR.extra.Tags);


BXR.extra.TagsItem = function(config){
    Ext.apply(this,config);
    Ext.ux.form.SuperBoxSelectItem.superclass.constructor.call(this);
};
Ext.extend(BXR.extra.TagsItem,Ext.Component, {
    renderCurrentItem: true
    ,initComponent : function(){
        BXR.extra.TagsItem.superclass.initComponent.call(this);
        this.renderCurrentItem = true;

        var itemsCount = this.owner.myStore.getCount();
        var record = new Ext.data.Record({tag: this.value}, this.value);
        this.owner.myStore.add([record]);

        if(itemsCount == this.owner.myStore.getCount()) this.renderCurrentItem = false;
    },
    onRender : function(ct, position){
        if(!this.renderCurrentItem) return true;
        BXR.extra.TagsItem.superclass.onRender.call(this, ct, position);

        var el = this.el;
        if(el){
            el.remove();
        }

        this.el = el = ct.createChild({ tag: 'li' }, ct.last());
        el.addClass('x-superboxselect-item');

        var btnEl = this.owner.navigateItemsWithTab ? ( Ext.isSafari ? 'button' : 'a') : 'span';

        Ext.apply(el, {
            focus: function(){
                var c = this.down(btnEl +'.x-superboxselect-item-close');
                if(c){
                    c.focus();
                }
            },
            preDestroy: function(){
                this.preDestroy();
            }.createDelegate(this)
        });

        el.update(this.value);

        var cfg = {
            tag: btnEl,
            'class': 'x-superboxselect-item-close',
            tabIndex : this.owner.navigateItemsWithTab ? '0' : '-1'
        };
        if(btnEl === 'a'){
            cfg.href = '#';
        }

        this.lnk = el.createChild(cfg);
        this.lnk.on('click', function(){
            var record = new Ext.data.Record({tag: this.value}, this.value);
            this.el.remove();
            this.owner.myStore.remove(this.owner.myStore.getById(this.value));
        }, this);
    },
    onDestroy : function() {
        Ext.destroy(
            this.lnk,
            this.el
        );

        BXR.extra.TagsItem.superclass.onDestroy.call(this);
    }
});