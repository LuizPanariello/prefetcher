/**
 * PREFETCHER
 * @luizpanariello - lfilho@directtalk.com.br
 * 24/05/2014
 * v: 1.0.0
 */
(function(window){

	/**
	 * [PREFETCHER]
	 * Classe responsavel para fazer o download em prefetch.
	 */
	window.PREFETCHER = function(arr){
		this._isIE = navigator.appName.indexOf('Microsoft') === 0;
		this._loadedcount = 0;
		this._prefetch = arr || [];
	};

	/**
	 * Inicia o download da lista
	**/
	PREFETCHER.prototype.listBegin = function(){};
	
	/**
	 * Lista recebida
	**/
	PREFETCHER.prototype.listComplete = function(status){};

	/**
	 * Inicio do download
	 */
	PREFETCHER.prototype.loadBegin = function(){};

	/**
	 * Um item concluido com sucesso
	 */
	PREFETCHER.prototype.loadItemComplete = function(status){};

	/**
	 * Um item concluido com erro
	 */
	PREFETCHER.prototype.loadItemError = function(status){};

	/**
	 * Todos os itens foram concluidos
	 */
	PREFETCHER.prototype.loadComplete = function(status){};

	/**
	 * Count dos downloads
	 */
	PREFETCHER.prototype._loaded = function(status){
		var _self = this;
		_self._loadedcount ++;
		if(_self._loadedcount == _self._prefetch.length - 1){
			_self.loadComplete();
		}
	};

	/**
	 * Busca a lista de arquivos
	 */
	PREFETCHER.prototype.getList = function(url){
		this.listBegin();
	};

	/**
	 * Responsavel por carrega os arquivos
	 */
	PREFETCHER.prototype.loadPrefetch = function(){
		var _self = this;		
		_self._loadedcount = 0;	
		_self.loadBegin();
		
		var last = _self._prefetch.length - 1;
		for (i = 0, max = _self._prefetch.length; i < max; i += 1) {
	        if (_self.isIE) {
	            var img = new Image();
	            img.src = _self._prefetch[i];
	            img.onload = function(){
	            	_self._loaded(200);
        			_self.loadItemComplete(200);
        		};

        		img.onerror = function(){
	            	_self._loaded(404);
        			_self.loadItemError(400);
        		};

	            continue;
	        }

        	obj = document.createElement('object');
        	obj.data = _self._prefetch[i];
        	obj.width  = 0;
        	obj.height = 0;
        	obj.onload = function(event){
        		_self._loaded(404);
        		_self.loadItemComplete(200);
        	};
        	
        	obj.onerror = function(){
        		_self._loaded(404);
        		_self.loadItemError(404);
        	};

	        document.body.appendChild(obj);
    	}
	};
})(window);