import React from 'react';
import axios from 'axios';

// API KEY: d4504e503bd2ce845391bf5937574e1b
// link: https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
// link: https://api.themoviedb.org/3/movie/popular?api_key=d4504e503bd2ce845391bf5937574e1b&language=en-US&page=1

const MyApi_Movie = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/popular?api_key=d4504e503bd2ce845391bf5937574e1b&language=en-US&page=1'
})

export default class Filmes extends React.Component{
    state = {
        movies:[]
    }

    componentDidMount(){
        this.PegarApi()
    }

    PegarApi = async () => {
        const MinhaApi = await MyApi_Movie.get() //ESPERA e PEGA o const MyApi_Movie
        //console.log(MinhaApi)

        const infos = MinhaApi.data.results.map(item => {
            return{
                nome: item.title,
                sinopse: item.overview
            }
        })
        this.setState({movies: infos})
    }

    render(){
        return(
            <div>
                <h2>Eu sou a parte do Filmes</h2>
                <ul>{this.state.movies.map(item => (
                    <>
                        <li>{item.nome}</li>
                        <p>{item.sinopse}</p>
                    </>
                ))}</ul>
            </div>
        )
    }
}