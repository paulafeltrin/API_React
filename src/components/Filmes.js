import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

// API KEY: d4504e503bd2ce845391bf5937574e1b
// link: https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
// link: https://api.themoviedb.org/3/movie/popular?api_key=d4504e503bd2ce845391bf5937574e1b&language=en-US&page=1

const Title = styled.h2`
text-align: center;
font-size: 2rem;
`

const Div = styled.section`
display: flex;
flex-direction: column;
text-align: center;

input{
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
`

const Ul = styled.ul`
padding: 3vh 2vw;

li{
    font-size: 1.3rem;
    list-style: none;
}
p{
    font-size: 1rem;
    margin: 0 auto;
    width: 50%;
    padding: 2vh 0 5vw 0;
}
`

const MyApi_Movie = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/popular?api_key=d4504e503bd2ce845391bf5937574e1b&language=en-US&page=1'
})

export default class Filmes extends React.Component{
    state = {
        movies:[],
        listaMovie: []
    }

    PegarApi = async () => {
        const MinhaApi = await MyApi_Movie.get() //ESPERA e PEGA o const MyApi_Movie
        console.log(MinhaApi)

        const infos = MinhaApi.data.results.map(item => {
            return{
                nome: item.title,
                nota: item.vote_average,
                sinopse: item.overview,
                img: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
            }
        })
        this.setState({movies: infos})
    }

    componentDidMount(){
        this.PegarApi()
    }

    handleMovie = (event) => {
        const filterMovie = this.state.movies.filter(item => {
            if(item.nome.toLowerCase().includes(event.target.value.toLowerCase())){
                return true
            }else{
              return false
            }
        })

        this.setState({listaMovie: filterMovie})

        if(event.target.value === ' '){
            this.setState({listaMovie: []})
          }
    }

    render(){
        return(
            <Div>
                <Title>Temos os melhores filmes para você curtir!</Title>
                <input onChange={this.handleMovie} placeholder="Pesquisar"/>
                <Ul>{this.state.movies.map(item => (
                    <>
                        <li>{item.nome}</li>
                        <li>Avaliação: {item.nota}</li>
                        <img src={item.img} alt={`Poster da série ${item.nome}`}/>
                        <p>{item.sinopse}</p>
                        
                    </>
                ))}
                </Ul>
            </Div>
        )
    }
}