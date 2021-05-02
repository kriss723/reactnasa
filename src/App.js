import { Component } from "react";
import Home from './components/home/home';
import Detail from './components/detalle/detail';
import Particles from 'react-particles-js';
import particlesConfig from './config/particlesConfig';
import './App.css';

class App extends Component{
  
  constructor(props){
    super(props);

    this.state = {
      item: null
    }

    this.goDetail = this.goDetail.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  //funcion para retomar
  goBack(){
    this.setState({
      item: null
    })
  }

  //funcion del padre viene trayendo elementos 
  goDetail(itemFromHome){
    //actualizamos el estado con el item que traemos
    this.setState({
      item: itemFromHome
    })
  }

  render(){

    const { item } = this.state;
    let view = <Home goDetail={this.goDetail} ></Home> // Le asignamos de entrada un valor predeterminado la vista principal

    if( item ){
      view = <Detail goBack={this.goBack} data={this.state.item}></Detail>
      //pasmos el item que clicleamos es decir el elemento
    }

    return(

      



    <div className="App" > 

      {/* <header className="App-header"></header> */}
      <header>
        <section id="logo"> <img src="./logoNASA.png"/> </section>
        <h2>NASA</h2>
      </header>
      
                

      {view} {/* llammamos a la vista y se renderiza */}

      <footer>
      
      <h4>NASA copyright ©</h4>

      </footer>
      
    </div>
    )
  };
}


export default App;
