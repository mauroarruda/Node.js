const {

	deepEqual,
	ok

} = require('assert')


const database = require('./database')

const  DEFALT_ITEM_CADASTRAR = {

	nome: 'Flash',
	poder:'Speed',
	id: 1
}

const DEFALT_ITEM_ATUALIZAR = {

	nome: 'Lantera Verde',
	poder: 'Energia do Anel',
	id: 2
}


describe('Suite de Manipulação de Herois',()=>{

	//cadastrar um item antes do metodo de listar, caso nao tenha nenhum item cadastrado pode dar Erro
	before(async()=>{

		//await database.cadastrar(DEFALT_ITEM_CADASTRAR)
	})

	//PESQUISAR
	it('Deve pesquisar um heroi usando arquivos',async ()=>{

		const expected = DEFALT_ITEM_CADASTRAR

		//destructor([resultado]) que é o mesmo que > posicaoUm = resultado[0]
		//caso eu queira outras posicoes pode ser > [resultado, posicao1, posicao2...]
		const [resultado] = await database.listar(expected.id)

		// se passar o "ok(resultado,expected)" ele vai mostrar mesmo que eu nao passe valor nenhum
		//o correto é usar o deepEqual pra mostrar completamente igual
		deepEqual(resultado,expected)

		//console.log(resultado)

	})

	//CADASTRAR
	it('Deve Cadastrar um heroi, usando arquivos', async()=>{

		const expected = DEFALT_ITEM_CADASTRAR
		//poderia ser assim pra modificar o id e o nome
		/*
		const expected = {

			...DEFALT_ITEM_CADASTRAR,//concatena 
			id:2,					//muda o id
			nome:'Batman'			//muda o nome
		}
		*/

		const resultado = await database.cadastrar(DEFALT_ITEM_CADASTRAR)

		const [actual] = await database.listar(DEFALT_ITEM_CADASTRAR.id)

		deepEqual(actual,expected)

	})
	//REMOVER 
	//it.only() > faz com que teste apenas esse it
	it('Deve Remover um heroi por id', async ()=>{

		const expected = true

		const resultado = await database.remover(DEFALT_ITEM_CADASTRAR.id)

		deepEqual(resultado,expected)
		
	})
	//ATUALIZAR
	it('Deve Atualizar um heroi pelo id',async () =>{

		const expected = {
			
			...DEFALT_ITEM_ATUALIZAR,
			nome: 'Batman',
			poder: 'Dinheiro'

		}

		const novoDado = {

			nome: 'Batman',
			poder: 'Dinheiro'
		}

		await database.atualizar(DEFALT_ITEM_ATUALIZAR.id,novoDado)

		const [resultado] = await database.listar(DEFALT_ITEM_ATUALIZAR.id)

		deepEqual(resultado,expected)

	})

})

