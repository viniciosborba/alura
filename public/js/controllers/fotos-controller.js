angular.module('alurapic').controller('FotosController', function($scope, recursoFoto, $timeout) {
	
	$scope.fotos = [];
	$scope.filtro = '';
	$scope.mensagem = '';

	recursoFoto.query(function(fotos) {
		$scope.fotos = fotos;
	}, function(erro) {
		console.log(erro);
	});

	/*$http.get('v1/fotos')
	.success(function(fotos) {
		$scope.fotos = fotos;
	})
	.error(function(erro) {
		console.log(erro);
	});*/

	$scope.remover = function(foto)	{

		$scope.exibeBotaoDesfazer = true;
		$scope.timeout = $timeout(function() {

			recursoFoto.delete({fotoId : foto._id}, function() {
				$scope.mensagem = 'Foto ' + foto.titulo + ' foi removida com sucesso.';

				var indiceFoto = $scope.fotos.indexOf(foto);
				$scope.fotos.splice(indiceFoto, 1);

				$scope.$emit('fotoRemovida', foto); 

				$scope.exibeBotaoDesfazer = false;
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível remover a foto ' + foto.titulo;
			});
		}, 3000);
	};

	// aqui é nosso método que desfaz:
    $scope.desfazer = function() {

        // Eu chamo o serviço $timeout.cancel que precisa receber uma referência do timer que criamos. 
        // Lembre-se que guardamos a referência em $scope.timeout    
        $timeout.cancel($scope.timeout);
        $scope.mensage = 'Operação desfeita com sucesso';
        $scope.exibeBotaoDesfazer = false;
    }

});