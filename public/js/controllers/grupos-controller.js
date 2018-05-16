angular.module('alurapic').controller('GruposController', function($scope, recursoGrupo) {

	$scope.grupos = [];

	recursoGrupo.query(function(grupos) {
		$scope.grupos = grupos;
	}, function(erro) {
		console.log(erro);
	});

	/*$http.get('v1/grupos')
	.success(function(grupos) {
		$scope.grupos = grupos;
	})
	.error(function(erro) {
		console.log(erro);
	});*/

});