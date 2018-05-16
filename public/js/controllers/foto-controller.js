angular.module('alurapic').controller('FotoController', 
	//function($scope, cadastroDeFotos, recursoFoto, $routeParams, $rootScope) {
	['$scope', 'recursoFoto', '$routeParams', 'cadastroDeFotos', '$rootScope',
	function($scope, recursoFoto, $routeParams, cadastroDeFotos, $rootScope) {

	$scope.foto = {};
	$scope.mensagem = '';

	var evento = 'focarSalvar';

	if ($routeParams.fotoId) {
		recursoFoto.get({fotoId : $routeParams.fotoId}, function(foto) {
			$scope.foto = foto;

			$rootScope.$broadcast(evento);
			//$scope.$broadcast(evento);
		}, function(erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível obter a foto.';
		});
		/*$http.get('v1/fotos/' + $routeParams.fotoId)
		.success(function(foto) {
			$scope.foto = foto;
		})
		.error(function(erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível obter a foto.';
		});*/
	}

	$scope.submeter = function() {
		if ($scope.formulario.$valid) {

			cadastroDeFotos.cadastrar($scope.foto)
			.then(function(dados) {
				$scope.mensagem = dados.mensagem;
				if (dados.inclusao) {
					$scope.foto = {};
					$scope.focado = true;
				}
			})
			.catch(function(dados) {
				$scope.mensagem = dados.mensagem;
			});
		}
		
	};

}]);