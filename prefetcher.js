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
	PREFETCHER.prototype.listComplete = function(status, data){};

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

		if(_self._loadedcount == _self._prefetch.length){
			_self.loadComplete();
		}
	};

	/**
	 * Busca a lista de arquivos
	 */
	PREFETCHER.prototype.getList = function(url){
		var _self = this;
		_self.listBegin();

		var xmlhttp = new XMLHttpRequest(); 

	    xmlhttp.onreadystatechange = function(data) {
	        if (xmlhttp.readyState == XmlHttpRequest.DONE){
	        	_self._prefetch = JSON.parse(xmlhttp.responseText);
	            _self.listComplete(xmlhttp.status, xmlhttp.responseText);
	        }
	    }

	    xmlhttp.open("GET", url, true);
	    xmlhttp.send();
	};

	/**
	 * Responsavel por carrega os arquivos
	 */
	PREFETCHER.prototype.loadPrefetch = function(){
		var _self = this;		
		_self._loadedcount = 0;	
		_self.loadBegin();
		
		for (i = 0, max = _self._prefetch.length; i < max; i += 1) {
	        //if (!_self.isIE) {
	            var img = new Image();
	            
	            img.onerror = function(){
	            	_self._loaded();
        			_self.loadItemError();
        		};

        		img.onload = function(){
	            	_self._loaded();
        			_self.loadItemComplete();
        		};

	            img.src = _self._prefetch[i];
	            
	        //    continue;
	        //}

        	// obj = document.createElement('object');
        	// obj.onload = function(event){
        	// 	_self._loaded();
        	// 	_self.loadItemComplete();
        	// };
        	// obj.onerror = function(){
        	// 	_self._loaded();
        	// 	_self.loadItemError();
        	// };
        	// obj.data = _self._prefetch[i];
        	// obj.width  = 0;
        	// obj.height = 0;
	        // document.body.appendChild(obj);
    	}
	};

})(window);