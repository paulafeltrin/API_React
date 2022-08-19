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
`

const Ul = styled.ul`
padding: 3vh 2vw;

li{
    font-size: 1.3rem;
    list-style: none;
}
p{
    font-size: 1rem;
    font-size: 1rem;
    margin: 0 auto;
    width: 50%;
    padding: 2vh 0;
}
img{
    padding-bottom: 5vh;
}
`

const MyAPI_Series = axios.create({
    baseURL: 'https://api.themoviedb.org/3/tv/popular?api_key=d4504e503bd2ce845391bf5937574e1b&language=en-US&page=1'
})

export default class Series extends React.Component{
    state = {
        series: []
    }

    componentDidMount(){
        this.getShow()
    }
    
    getShow = async() => {
        
        const response = await MyAPI_Series.get()
        
        const infoShow = response.data.results.map(item => {
            return{
                ShowName: item.name,
                ShowSinop: item.overview,
                ShowImg: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
            }
        })
        this.setState({series: infoShow})

        console.log(response)
    }

    render(){
        return(
            <Div>
            <Title>As melhores séries estão aqui</Title>
            <Ul>
                {this.state.series.map(item => (
                    <>
                        <li>{item.ShowName}</li>
                        <p>{item.ShowSinop}</p>
                        <img src={item.ShowImg} />
                    </>
                ))}
            </Ul>
            </Div>
        )
    }
}