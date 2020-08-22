//Acessa a API
import React, {Component} from 'react';
import api from '../../services/api'
import "./styles.css"
import {Link} from 'react-router-dom';

export default class Main extends Component{
    //estado que ira conter o array com os produtos
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount(){
        this.loadProducts();
    }

    //função para buscar produtos na API
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        
        //
        const { docs, ...productInfo } = response.data;

        //passa o objeto que quero atualizar
        this.setState({products: docs , productInfo , page});
        //console.log(response.data.docs); //somente para teste
    };

    //Funções para correr paginas
    nextPage = ()=>{
        const { page, productInfo } = this.state;

        if(page == productInfo.pages) return;

        const pageNumber = page +1;
        this.loadProducts(pageNumber);
    }

    prevPage=()=>{
        const {page, productInfo} = this.state;

        if(page == 1) return;

        const pageNumber = page -1;

        this.loadProducts(pageNumber);

    }

    //envia para a pagina
    render(){
        //Gera um indice de produtos
        const{ products , page , productInfo } = this.state;

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p> 
                    <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page == 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page == productInfo.pages} onClick={this.nextPage}>Proximo</button>
                </div>
            </div>
            
        );
    }
}
