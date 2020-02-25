const Commander = require('commander')

const Database = require('./database')

const Heroi = require('./heroi')

async function main(){

	Commander
	
		.version('v1')
		.option('-n, --nome [value]',"Nome do Heroi")
		.option('-p, --poder [value]',"Poder do Heroi")
		.option('-i, --id [value]',"Id do Heroi")
		.option('',"----------------")
		.option('-c, --cadastrar',"Cadastrar um Heroi")
		.option('-l, --listar',"Listar Herois Todos")
		.option('-r, --remover',"Remover Heroi Pelo Id")
		.option('-a, --atualizar [value]',"Atualizar Heroi Pelo Id")

		.parse(process.argv)

		const heroi = new Heroi(Commander)

	try{

		//If do Cadastrar
		if (Commander.cadastrar) {

			const resultado = await Database.cadastrar(heroi)

			if(!resultado){
				
				console.error('Heroi não foi Cadastrado')
				
				return;

			}
			else{
				
				console.log('Heroi Cadastrado Com Sucesso')

			}
		}

		//If do Listar
		if(Commander.listar){

			const resultado = await Database.listar()

			console.log(resultado)

			return;

		}

		//If Remover
		if (Commander.remover) {

			const resultado = await Database.remover(heroi.id)

			if(!resultado){

				console.error('Não foi possivel remover o Heroi')
			}
			else{

				console.log('Heroi Removido Com Sucesso')
			}
		}

		//If Atualizar

		if (Commander.atualizar) {

			const idParaAtualizar = parseInt(Commander.atualizar);

			const dado  = JSON.stringify(heroi)

			const heroiAtualizar = JSON.parse(dado)

			const resultado = await Database.atualizar(idParaAtualizar,heroiAtualizar)

			if (!resultado) {

				console.error('Erro na Atualização')
			}
			else{

				console.log('Heroi Atualizado Com Sucesso!')
			}
		}

	}catch(error){console.error('DEU RUIM : ',error)}

}

main()