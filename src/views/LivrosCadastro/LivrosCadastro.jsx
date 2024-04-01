import {useState, useEffect} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'


const LivrosCadastro = () => {

  const [livro, setLivro] = useState({
    id: 1,
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  useEffect(() => {
    async function fetchNextId() {
      try{
        const response = await LivrosService.getLivros();
        const livros = response.data;
        if(livros.length > 0){
          const ultimoLivro = livros[livros.length - 1];
          setLivro(prevState => ({
            ...prevState,
            id: ultimoLivro.id + 1 //próximo id disponível
          }));
        }else {
          setLivro(prevState => ({
            ...prevState,
            id: 1 //Se não houver livros o próximo id é 1
          }));
        }
      }catch(error){
        console.error("Erro ao obter o próximo ID: ", error);
      }
    }
    fetchNextId();
  }, []);


  async function createLivro(e){
    e.preventDefault();
    try{
      await LivrosService.createLivro(livro);
      alert("Livro cadastrado com sucesso!");
      
    } catch (error) {
      console.error("Erro ao cadastrar o livro: ", error);
      alert("Erro ao cadastrar o livro. Por favor tente novamente mais tarde.");
    }
    
  
  }
  return (
    <>
      <Header/>    
      <SubmenuLivros/>
      <div className='livrosCadastro'>
          <h1>Cadastro de Livros</h1>
          <div>          
            <form id="formulario" onSubmit={createLivro}>
            <div className='form-group'>
              <label>Id</label>
              <input type="text" id='id' value={livro.id} readOnly></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" id='titulo' required onChange={(event)=>{ setLivro({...livro, titulo: event.target.value})}}></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" id='num' required onChange={(event)=>{ setLivro({...livro, num_paginas: event.target.value})}}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(event)=>{ setLivro({...livro, isbn: event.target.value})}}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(event)=>{ setLivro({...livro, editora: event.target.value})}}></input>
            </div> 
            <div className='form-group'>
              <button type='submit'>Cadastrar Livro</button>  
            </div>         
            </form>
          </div>
      </div>
    </>)
}
  
  

export default LivrosCadastro