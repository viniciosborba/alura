angular.module('minhasDiretivas', [])
.directive('meuPainel', function() {

	var ddo = {};

	ddo.restrict = "AE";
	ddo.transclude = true;

	ddo.scope = {
		titulo: '@titulo' //ou
		//titulo: '@'  // quando os nomes forem iguais
	};

	ddo.templateUrl = 'js/directives/meu-painel.html';

	return ddo;
})

.directive('minhaFoto', function() {

	var ddo = {};

	ddo.restrict = "AE";
	ddo.transclude = true;

	ddo.scope = {
		//url: '@url', //ou
		url: '@',  // quando os nomes forem iguais
		titulo: '@'
	};

	ddo.templateUrl = 'js/directives/minha-foto.html';

	return ddo;
})

.directive('meuBotaoPerigo', function() {

	var ddo = {};

	ddo.restrict = 'E';

	ddo.scope = {
		nome: '@',
		acao: '&'
	};

	//ddo.template = '<button ng-click="acao(foto)" class="btn btn-danger btn-block">{{nome}}</button>';
	ddo.templateUrl = 'js/directives/meu-botao-perigo.html';

	return ddo;
})

.directive('meuFocus', function() {

	var ddo = {};

	ddo.restrict = 'A';

	ddo.scope = {
		//evento: '@'
        focado : '='
        // torna o atributo bidirecional, o controller e a diretiva por manipular.
    };

	// somente na fase de link podemos colocar observadores
	ddo.link = function(scope, element) {
		/*scope.$on(scope.evento, function() {
			element[0].focus();
		});*/

		scope.$watch('focado', function() {
            if (scope.focado) {
                element[0].focus();
                scope.focado = false;
            } 
        });
	}

	return ddo;
})

.directive('meusTitulos', function() {

	var ddo = {};

	ddo.restrict = 'E';

	ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';

	ddo.controller = function($scope, recursoFoto) {
		recursoFoto.query(function(fotos) {
            $scope.titulos = fotos.map(function(foto) {
            	return foto.titulo;
            });
        });

		$scope.$on('fotoRemovida', function(event, foto) {
            $scope.titulos = $scope.titulos.filter(function(titulo) {
                return titulo !== foto.titulo;
            });
        })

	}

	return ddo;
});