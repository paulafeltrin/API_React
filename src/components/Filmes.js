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
    padding: 2vh 0;
}
img{
    padding-bottom: 5vh;
}
`

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
        console.log(MinhaApi)

        const infos = MinhaApi.data.results.map(item => {
            return{
                nome: item.title,
                sinopse: item.overview,
                img: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
            }
        })
        this.setState({movies: infos})
    }

    render(){
        return(
            <Div>
                <Title>Temos os melhores filmes para você curtir!</Title>
                <Ul>{this.state.movies.map(item => (
                    <>
                        <li>{item.nome}</li>
                        <p>{item.sinopse}</p>
                        <img src={item.img} />
                    </>
                ))}
                </Ul>
            </Div>
        )
    }
}