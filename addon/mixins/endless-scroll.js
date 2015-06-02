import Ember from 'ember';
const computed = Ember.computed;
const observer = Ember.observer;

export default Ember.Mixin.create( {
    current_page: 1,
    page: 1,
    per_page: 20,
    queryParams: [ 'page', 'per_page' ],
    loadingRecords: false,

    hasMorePages: computed( 'total_pages', 'current_page', function(){
        return this.get( 'current_page' ) < this.get( 'total_pages' );
    } ),

    actions: {
        next: function( model, params ){
            var _this = this;
            if( this.get( 'hasMorePages' ) ){
                var currentPage = _this.incrementProperty( 'current_page' );
                var model = this.get( 'model' );

                _this.set( 'loadingRecords', true );

                this.store.find( model, params )
                    .then( function( result ){
                        var resultModel = [];
                        resultModel.pushObjects( model.toArray() );
                        resultModel.pushObjects( result.toArray() );
                        _this.set( 'model', resultModel );
                    } )
                    .finally( function(){
                        _this.set( 'loadingRecords', false );
                    } );
            }
        }
    }
} );
