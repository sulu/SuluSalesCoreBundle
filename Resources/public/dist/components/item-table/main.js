define(["text!sulusalescore/components/item-table/item.form.html","text!sulusalescore/components/item-table/item.row.html","text!sulusalescore/components/item-table/item.row-head.html","text!sulusalescore/components/item-table/item.overlay.html","config"],function(a,b,c,d,e){"use strict";var f={formId:"item-table-form",data:[],isEditable:!0,columns:["name","number","settings","quantity","quantityUnit","price","discount","totalPrice"],hasNestedItems:!1,defaultData:{},columnCallbacks:{},rowCallback:null,showSettings:!1},g={listClass:".item-table-list",formSelector:".item-table-list-form",productSearchClass:".product-search",rowIdPrefix:"item-table-row-",productUrl:"/admin/api/products/",rowClass:".item-table-row",quantityRowClass:".item-quantity",quantityInput:".item-quantity input",priceRowClass:".item-price",priceInput:".item-price input",discountRowClass:".item-discount",discountInput:".item-discount input",globalPriceTableClass:".global-price-table",overallEmptyString:"-",loaderSelector:".item-table-loader",loaderClass:"item-table-loader"},h={rowClass:null,id:null,rowNumber:null,address:null,addressObject:null,description:null,rowId:"",name:"",number:"",quantity:"",quantityUnit:"",price:"",discount:null,overallPrice:"",currency:"EUR",useProductsPrice:!1,tax:0,supplierName:""},i={priceRow:function(a,b){return["<tr>","   <td>",a,"   </td>","   <td>",b,"   </td>","</tr>"].join("")},loader:function(a){return'<div style="display:hidden" class="grid-row '+a+'"></div>'}},j="sulu.item-table.",k=function(){return j+"changed"},l=function(){return n.call(this,"set-default-data")},m=function(){return n.call(this,"change-currency")},n=function(a){return j+this.options.instanceName+"."+a},o=function(){return{rowClass:"header",name:this.sandbox.translate("salescore.item.product"),number:this.sandbox.translate("salescore.item.number"),address:this.sandbox.translate("address.delivery"),description:this.sandbox.translate("salescore.item.description"),quantity:this.sandbox.translate("salescore.item.quantity"),quantityUnit:this.sandbox.translate("salescore.item.unit"),price:this.sandbox.translate("salescore.item.price"),discount:this.sandbox.translate("salescore.item.discount"),overallPrice:this.sandbox.translate("salescore.item.overall-value")}},p=function(){this.sandbox.on(l.call(this),z.bind(this)),this.sandbox.on(m.call(this),r.bind(this))},q=function(){this.sandbox.dom.on(this.$el,"click",S.bind(this),".add-row"),this.sandbox.dom.on(this.$el,"click",P.bind(this),".remove-row"),this.sandbox.dom.on(this.$el,"click",A.bind(this),".item-table-row"),this.sandbox.dom.on(this.$el,"click",B.bind(this),".item-table-row td"),this.sandbox.dom.on(this.$el,"data-changed",function(a){var b=a.items||[];$.call(this,b)}.bind(this)),this.sandbox.dom.on(this.$el,"change",C.bind(this),g.quantityInput),this.sandbox.dom.on(this.$el,"change",D.bind(this),g.priceInput),this.sandbox.dom.on(this.$el,"change",E.bind(this),g.discountInput)},r=function(a){var b,c,d=new this.sandbox.data.deferred;this.currency=a,b=y.call(this,this.items),b&&b.length>0&&(w.call(this,d),c=u.call(this,b),this.sandbox.dom.when(c,d).done(function(a){s.call(this,a),H.call(this),v.call(this)}.bind(this)).fail(function(a,b,c){this.sandbox.emit("sulu.labels.error.show",this.sandbox.translate("salescore.item-table.error.changing-currency"),"labels.error",""),this.sandbox.logger.error(a,b,c)}.bind(this)))},s=function(a){var b,c,d,e=t.call(this,a._embedded.products);for(d in this.items)this.items.hasOwnProperty(d)&&(c=this.items[d],c.price=e[c.product.id]&&e[c.product.id][this.currency]?e[c.product.id][this.currency]:0,b=this.sandbox.dom.find(g.priceInput,this.sandbox.dom.find("#"+d,this.$list)),this.sandbox.dom.val(b,this.sandbox.numberFormat(c.price,"n")),G.call(this,d))},t=function(a){var b={};return this.sandbox.util.foreach(a,function(a){b[a.id]={},this.sandbox.util.foreach(a.prices,function(c){b[a.id][c.currency.code]=c.price||0}.bind(this))}.bind(this)),b},u=function(a){var b="/admin/api/products?ids="+a.join(",");return this.sandbox.util.load(b)},v=function(){this.sandbox.stop(this.$loader),this.sandbox.dom.show(this.$list)},w=function(a){x.call(this),this.sandbox.start([{name:"loader@husky",options:{el:this.$loader,size:"40px",hidden:!1}}]).done(function(){a.resolve()}.bind(this))},x=function(){var a=this.sandbox.dom.height(this.$el);this.$loader=this.sandbox.dom.createElement(i.loader.call(this,g.loaderClass)),this.$list=this.sandbox.dom.find(g.formSelector,this.$el),this.sandbox.dom.append(this.$el,this.$loader),this.sandbox.dom.height(this.$loader,a),this.sandbox.dom.hide(this.$list),this.sandbox.dom.show(this.$loader)},y=function(a){var b,c=[];for(b in a)a[b].hasOwnProperty("product")&&c.push(a[b].product.id);return c},z=function(a,b){this.options.defaultData[a]=b},A=function(a){if("INPUT"!==a.target.tagName.toUpperCase()&&"A"!==a.target.tagName.toUpperCase()){var b=this.sandbox.dom.data(a.currentTarget,"id");this.options.rowCallback&&this.options.rowCallback.call(this,b,this.items[b]),(this.options.showSettings===!0||"true"===this.options.showSettings)&&bb.call(this,this.items[b])}},B=function(a){var b=this.sandbox.dom.data(a.currentTarget,"name"),c=this.sandbox.dom.data(this.sandbox.dom.parent(),"id");b&&this.options.columnCallbacks.hasOwnProperty(b)&&this.options.columnCallbacks[b].call(this,a.currentTarget,c)},C=function(a){var b=F.call(this,a).id;this.items[b].quantity=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),db.call(this),G.call(this,b),H.call(this),this.sandbox.emit(k.call(this))},D=function(a){var b=F.call(this,a).id;this.items[b].price=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),db.call(this),G.call(this,b),H.call(this),this.sandbox.emit(k.call(this))},E=function(a){var b=F.call(this,a).id;this.items[b].discount=this.sandbox.parseFloat(this.sandbox.dom.val(a.target)),db.call(this),G.call(this,b),H.call(this),this.sandbox.emit(k.call(this))},F=function(a){var b=this.sandbox.dom.closest(a.target,".item-table-row"),c=this.sandbox.dom.attr(b,"id");return{row:b,id:c}},G=function(a){var b=this.$find("#"+a),c=this.items[a],d=this.sandbox.dom.find(".item-overall-price span",b);this.sandbox.dom.html(d,J.call(this,c))},H=function(){var a,b,c,d,e,f={},h=0,i=0;for(var j in this.items)b=this.items[j],c=parseFloat(L.call(this,b)),d=0,b.tax&&b.tax>0&&b.tax<=100&&(a=parseFloat(b.tax),d=c/100*a,f[a]=f[a]?f[a]+d:d),h+=c,i+=c+d;if(e=this.$find(g.globalPriceTableClass),this.sandbox.dom.html(e,""),Object.keys(this.items).length>0){I.call(this,e,this.sandbox.translate("salescore.item.net-price"),K.call(this,h));for(var j in f)I.call(this,e,this.sandbox.translate("salescore.item.vat")+".("+j+"%)",K.call(this,f[j]));I.call(this,e,this.sandbox.translate("salescore.item.overall-price"),K.call(this,i))}},I=function(a,b,c){var d=this.sandbox.dom.createElement(i.priceRow.call(this,b,c));this.sandbox.dom.append(a,d)},J=function(a,b){return K.call(this,L.call(this,a,b),M.call(this,a))},K=function(a,b){return b=b?b:this.currency,this.sandbox.numberFormat(a,"n")+" "+b},L=function(a,b){var c=0;return b&&"default"!==b||a.price&&a.quantity&&(c=a.price*a.quantity,a.discount&&a.discount>0&&a.discount<=100&&(c-=c/100*a.discount)),c},M=function(a){return a.currency?a.currency:this.currency},N=function(a,b){var c=this.sandbox.dom.closest(b.currentTarget,g.rowClass),d=this.sandbox.dom.attr(c,"id"),e={};this.sandbox.start([{name:"loader@husky",options:{el:this.sandbox.dom.find(g.productSearchClass,c),size:"15px"}}]),this.sandbox.util.load(g.productUrl+a.id).then(function(a){e=ab.call(this,a),W.call(this,d,e)}.bind(this)).fail(function(a,b,c){this.sandbox.emit("sulu.labels.error.show",this.sandbox.translate("salescore.item-table.error.loading-product"),"labels.error",""),this.sandbox.logger.error(a,b,c)}.bind(this))},O=function(a){var b=e.get("suluproduct.components.autocomplete.default");b.el=this.sandbox.dom.find(g.productSearchClass,a),b.selectCallback=N.bind(this),this.sandbox.start([{name:"auto-complete@husky",options:b}])},P=function(a){a.preventDefault(),a.stopPropagation();var b=this.sandbox.dom.closest(a.currentTarget,".item-table-row"),c=this.sandbox.dom.attr(b,"id");T.call(this,c,b)},Q=function(a){delete this.items[a],db.call(this)},R=function(a,b){this.items[a]=b,db.call(this)},S=function(a){a.preventDefault(),Z.call(this)},T=function(a,b){this.sandbox.dom.remove(b),Q.call(this,a),Y.call(this,b),H.call(this),this.sandbox.emit(k.call(this))},U=function(a,c){c!==!1&&this.rowCount++;var d,e,f=this.sandbox.util.extend({},h,this.options.defaultData,a,{isEditable:this.options.isEditable,columns:this.options.columns,rowId:g.rowIdPrefix+this.rowCount,rowNumber:this.rowCount});return f.address&&"object"==typeof f.address&&(f.addressObject=f.address,f.address=this.sandbox.sulu.createAddressString(f.address)),f.currency=this.currency,f.overallPrice=this.sandbox.numberFormat(J.call(this,f)),f.discount=this.sandbox.numberFormat(f.discount,"n"),f.price=this.sandbox.numberFormat(f.price,"n"),f.quantity=this.sandbox.numberFormat(f.quantity,"n"),d=this.sandbox.util.template(b,f),e=this.sandbox.dom.createElement(d)},V=function(a){var b,c;return this.options.hasNestedItems&&(c=a,a=this.sandbox.util.extend({},a.item,c),delete a.item),b=U.call(this,a),this.sandbox.dom.append(this.$find(g.listClass),b),b},W=function(a,b){var c=U.call(this,b,!1);return this.sandbox.dom.replaceWith(this.$find("#"+a),c),R.call(this,a,b),X.call(this,c),this.sandbox.emit(k.call(this)),c},X=function(a){this.options.columns.indexOf("quantity")>0&&this.sandbox.form.addField(this.selectorFormId,this.sandbox.dom.find(g.quantityInput,a)),this.options.columns.indexOf("price")>0&&this.sandbox.form.addField(this.selectorFormId,this.sandbox.dom.find(g.priceInput,a)),this.options.columns.indexOf("discount")>0&&this.sandbox.form.addField(this.selectorFormId,this.sandbox.dom.find(g.discountInput,a))},Y=function(a){this.options.columns.indexOf("quantity")>0&&this.sandbox.form.removeField(this.selectorFormId,this.sandbox.dom.find(g.quantityInput,a)),this.options.columns.indexOf("price")>0&&this.sandbox.form.removeField(this.selectorFormId,this.sandbox.dom.find(g.priceInput,a)),this.options.columns.indexOf("discount")>0&&this.sandbox.form.removeField(this.selectorFormId,this.sandbox.dom.find(g.discountInput,a))},Z=function(){var a,b={rowClass:"new"};a=V.call(this,b),O.call(this,a)},$=function(a){this.items={},this.sandbox.dom.empty(this.$find(g.listClass)),_.call(this,a)},_=function(a){var b,c,d,e,f;for(b=-1,c=a.length;++b<c;)d=a[b],e=V.call(this,a[b]),f=this.sandbox.dom.attr(e,"id"),this.items[f]=d;db.call(this)},ab=function(a){var b,c,d=this.sandbox.util.extend({},h,this.options.defaultData,{name:a.name,number:a.number,description:a.shortDescription,product:a,quantityUnit:a.orderUnit?a.orderUnit.name:""});if(a.prices&&a.prices.length>0)for(b=-1,c=a.prices.length;++b<c;)a.prices[b].currency.code===this.currency&&(d.price=a.prices[b].price);return a.supplierName&&(d.supplierName=a.supplierName),d},bb=function(a){var b,c;a=this.sandbox.util.extend({columns:[]},a),this.sandbox.stop(this.sandbox.dom.find(g.overlayClassSelector,this.$el)),this.sandbox.dom.remove(this.sandbox.dom.find(g.overlayClassSelector,this.$el)),c=this.sandbox.util.template(d,a),b=this.sandbox.dom.createElement('<div class="'+g.overlayClass+'"></div>'),this.sandbox.dom.append(this.$el,b),this.sandbox.start([{name:"overlay@husky",options:{el:b,title:this.sandbox.translate("test 123"),openOnStart:!0,removeOnClose:!1,skin:"wide",data:c,okCallback:function(){}.bind(this)}}])},cb=function(){var a=this.sandbox.util.extend({},h,this.options,{header:o.call(this)}),b=this.sandbox.util.template(c,a);this.sandbox.dom.append(this.$find(g.listClass),b)},db=function(){this.sandbox.dom.data(this.$el,"items",this.getItems())},eb=function(){this.sandbox.form.create(this.selectorFormId)};return{initialize:function(){this.options=this.sandbox.util.extend({},f,this.options),this.selectorFormId="#"+this.options.formId,this.items={},this.rowCount=0,this.table=null,this.currency=this.options.currency||h.currency,this.isEmpty=this.items.length;var a=this.sandbox.dom.data(this.$el,"items");0===this.options.data.length&&a&&a.length>0&&(this.options.data=a),this.render(),p.call(this),q.call(this)},render:function(){var b=this.sandbox.util.extend({},{formId:this.options.formId,addText:this.sandbox.translate("salescore.item.add"),isEditable:this.options.isEditable,columns:this.options.columns});this.table=this.sandbox.util.template(a,b),this.html(this.table),cb.call(this),_.call(this,this.options.data),eb.call(this),H.call(this)},getItems:function(){var a,b=[];for(a in this.items)b.push(this.items[a]);return b}}});