import React, { Component } from 'react';
import Item from '../item/item';
import './home.css';
import Masonry from 'react-masonry-css';
import Particles from 'react-particles-js';
import particlesConfig from '../../config/particlesConfig';


class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            items:[],
            day: new Date(),
            index: 0
        }

        this.goDetail = this.goDetail.bind(this);
        
    }

    getToday(day){
        //pedir el dia en concrento
        return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
    }

    getdata(){
        let index = this.state.index; //recuperar el index
        let day = new Date(this.state.day); //recupero el dia hace la referencia la estado reazamos una instancia una clonacion

        day.setDate(day.getDate() - 1 * index);//ponemos por el index para que en la primera iteracion nos devuelva el dia de hoy

        const dayString = this.getToday(day)

        const url = "https://api.nasa.gov/planetary/apod?api_key=eHlZc7hYrWkwuKKS2E5hYKgztsd50fhKKtaPrga2&date="+dayString;
        
        fetch(url) 
        .then(res => res.json()) //me convierta esos datos en un objeto JSon
        .then(res =>{ //ya puedo tratar los datos
            let itemsActualizado = this.state.items;//recupero el dato
            itemsActualizado.push(res); //añado el dato al objeto
            index += 1;//actuñaizamos el valor antes de guardarlo en el stado

            this.setState({
                items:itemsActualizado,
                index:index
            });

            

            if(index < 15){ //si es menor a 15 registros debe volver a llamar 
                this.getdata(); //pedimos los datos
            }else{
                localStorage.setItem('nasa_data', JSON.stringify(itemsActualizado)); //convertir los datos en JSON
                localStorage.setItem('nasa_day', this.getToday(this.state.day))
            }
        })

    }

    //cuando el compoennte este montado
    componentDidMount(){
        //los posibles datos y guardalos en LocalStorege
        const LSdata = JSON.parse(localStorage.getItem('nasa_data'));//como los datos son convertidos en JSON debo convertirlos nuevamente a Objetos
        const LSday = localStorage.getItem('nasa_day');

        if(!LSdata || LSday !== this.getToday(this.state.day)){
            this.getdata();//pedimos los datos
        }else{
            this.setState({
                items: LSdata // asi estan disponibles y se renderizar
            }) //asociecie a los items los datos recuperados en LSdata
        }
    }

    //la funcion encargada de enlazar al compoenente
    goDetail(item){
        this.props.goDetail(item);
    }

    

    render(){
        
        //crear el bucle para la lectura de los datos no se debe poner en el return
        const { items } = this.state;//recuperamos las items
        const elements = items.map((item,index) =>{ //me permite mapear el arreglo tienen arroy function
            //item es cada uno de los elementos y el index es cada index
            return <Item data={item} key={index} goDetail={this.goDetail}></Item>
        })

        const breakpoints = {
            default:4,
            1100: 3,
            700: 2,
            500: 1
        }

        return (
            //La propiedad goDetail hace referencia a la funcion goDetail del mismo componente
            <div className="home" goDetail={this.goDetail}>
                
                <div id="particle-canvas" className="space" style={{ position: 'absolute'}}>
                    <Particles height="100vh" width="100vw" params={particlesConfig} />
                </div>

                <h3>NASA day of the day</h3>
                
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                    elevation={3}
                >    
                    { elements }

                </Masonry>

               
            </div>
        )
    }
}

export default Home;
