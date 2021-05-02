import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './item.css';
//para utilizar en el precaheado 
import Offline from './offline.png';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';




class Item extends Component{

    constructor(props){
        super(props);

        this.state = {
            items:[],
            url:Offline,
            load: false
        }

        //solucion al problema de perder el contexto del this de clase
        this.goDetail = this.goDetail.bind(this);
        this.onError = this.onError.bind(this);
        this.onErrorVideo = this.onErrorVideo.bind(this);
    }

    getdata(){
        const url = "https://api.nasa.gov/planetary/apod?api_key=eHlZc7hYrWkwuKKS2E5hYKgztsd50fhKKtaPrga2";
        
        fetch(url) 
        .then(res => res.json()) //me convierta esos datos en un objeto JSon
        .then(res =>{ //ya puedo tratar los datos
            let itemsActualizado = this.state.items;//recupero el dato
            itemsActualizado.push(res); //añado el dato al objeto
            this.setState({
                items:itemsActualizado
            });

            console.log(res)
            console.log(this.state.items);
        })

    }

    //cuando el compoennte este montado
    componentDidMount(){
        this.getdata();
        this.setState({
            url: this.props.data.url
        });
    }

    //funcion para ir al componente Detail
    goDetail(){
        //enviando los datos mediante data
        this.props.goDetail(this.props.data);
        //se pierde la referencia del this de la clase al de la funcion realizamos un blind
        //Este metodo hace referencia al componente padre HOME
    }

    //el cambio de los elementos debe realizarse desde los estados
    //para tener un estado que podamos cambiar
    // <a href='https://www.freepik.es/vectores/fondo'>Vector de Fondo creado por BiZkettE1 - www.freepik.es</a>
    onError(){
        //cuando se esta offline y se necesita tener algo en la cache
        this.setState({
            url: Offline
        });
    }

    onErrorVideo(){

        console.log('error de la carga del video');

        this.setState({
            url: Offline,
            load: true
        });

        console.log(this.state.load);
    }

    render(){


        return (
                <div className="divcards">

                {/*Prueba de codigo material*/}
                <Card className="cards" onClick={this.goDetail}>
                    <CardActionArea className="cardcontent">
                        <li className='itemcards'>
                    {this.props.data.media_type === 'image'
                    ? <div>
                        {/* <img src={this.props.data.url} alt="Imagen del dia" onError={this.onError}></img> */}
                        <img src={this.state.url} alt="Imagen del dia" onError={this.onError}></img>
                      </div>
                    : <div className='divideo' onClick={this.goDetail}>

                        {this.state.load 
                        ?<img className="offline" src={this.state.url} alt="Sin conexion"></img>
                        :<ReactPlayer 
                        width='100%'
                        height='100%'
                        onError={this.onErrorVideo}
                        url={this.state.url}/>}

                      </div>
                    }
                </li>
                        <CardContent className="cardcontent">
                        {/* <Typography  gutterBottom variant="h5" component="h2">
                            {this.props.data.title}
                        </Typography> */}
                        <h2>{this.props.data.title}</h2>
                        <hr></hr>
                        <h4>See more</h4>
                        <h5>{this.props.data.date}</h5>
                        
                        </CardContent>
                    </CardActionArea>
                    
                </Card>

                
                
            </div>    
            
        )
    }
}

export default Item;

