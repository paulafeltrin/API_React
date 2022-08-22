import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

//https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1

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

const MyAPI_Series = axios.create({
    baseURL: 'https://api.themoviedb.org/3/tv/popular?api_key=d4504e503bd2ce845391bf5937574e1b&language=en-US&page=1'
})

export default class Series extends React.Component{
    state = {
        series: [],
        listaSerie: []
    }

    getShow = async() => {
        
        const response = await MyAPI_Series.get()
        
        const infoShow = response.data.results.map(item => {
            return{
                ShowName: item.name,
                ShowSinop: item.overview,
                nota: item.vote_average,
                ShowImg: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
            }
        })
        this.setState({series: infoShow})

        console.log(response)
    }

    componentDidMount(){ //pra fazer acontecer (ESTADO INICIAL)
        this.getShow()
    }

    handleSerie = (event) => {
        const filterSerie = this.state.series.filter(item => {
            if(item.ShowName.toLowerCase().includes(event.target.value.toLowerCase())){
                return true
            }else{
              return false
            }
        })

        this.setState({listaSerie: filterSerie})

        if(event.target.value === ' '){
            this.setState({listaSerie: []})
          }
    }


    render(){
        return(
            <Div>
            <Title>As melhores séries estão aqui</Title>
            <input onChange={this.handleSerie} placeholder="Pesquisar"/>
            <Ul>
                {this.state.series.map(item => (
                    <>
                        <li>{item.ShowName}</li>
                        <li>Avaliação: {item.nota}</li>
                        <img src={item.ShowImg} alt={`Poster da série ${item.ShowName}`}/>
                        <p>{item.ShowSinop}</p>
                        
                    </>
                ))}
            </Ul>
            </Div>
        )
    }
}