const{
	readFile,
	writeFile
} = require('fs')

const{
	promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)


class Database{

	constructor(){

		this.NOME_ARQUIVO = 'herois.json'
	}

	//para usar AWAIT precisa passar o ASYNC no metodo
	async obterDadosArquivo(){
		//passa o formato de texto,,tendo certeza que vai voltar um texto
		const arquivo = await readFileAsync(this.NOME_ARQUIVO,'utf8')

		return JSON.parse( arquivo.toString() )
	}																 

	async escreverArquivo(dados){
		
		await writeFileAsync(this.NOME_ARQUIVO,JSON.stringify(dados))

		return true
	}

	// pra cadastrar a gente, OBTEM O ARQUIVO -> MODIFICA OS DADOS -> REESCREVE O ARQUIVO 
	async cadastrar(heroi){

		const dados = await this.obterDadosArquivo()
		
		//caso por algum motivo o ID venha como String ja converto para int para evitar problemas
		heroi.id = parseInt(heroi.id)

		const id = heroi.id <= 2 ? heroi.id : Date.now();

		const heroiComId = {

			id,
			...heroi
		}

		const dadosFinal = [

			...dados,
			heroiComId
		]

		const resultado = await this.escreverArquivo(dadosFinal)

		return resultado 

	}
	//para usar AWAIT precisa passar o ASYNC no metodo
	async listar(id){

		const dados = await this.obterDadosArquivo()

		const dadosFiltrados = dados.filter(item=>(id ? (item.id === id) : true)) 

		return dadosFiltrados
	}

	async remover(id){

		if (!id) {

			return await this.escreverArquivo([])

		}

		const dados = await this.obterDadosArquivo()

		const indice = await dados.findIndex(item=> item.id === parseInt(id))

		if(indice === -1){

			throw Error('O usuario informado não existe')
		}

		dados.splice(indice, 1)

		return await this.escreverArquivo(dados);
		
	}//remover

	async atualizar(id,modificacoes){

		const dados = await this.obterDadosArquivo()

		const indice = dados.findIndex(item => item.id === parseInt(id))

		if(indice === -1){

			throw Error('O heroi Infomado não existe')
		}

		const atual = dados[indice]

		const objetoAtualisado = {

			...atual,
			...modificacoes//assim ja substitui o objeto atual pelo novo
		}


		dados.splice(indice,1)

		return this.escreverArquivo([

			...dados,
			objetoAtualisado

		])

	}

}//end	

module.exports = new Database()