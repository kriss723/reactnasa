import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './detail.css';
import Offline from './offline.png';
import Container from '@material-ui/core/Container';

class Detail extends Component{

    constructor(props){
        super(props);

        this.state = {
            url: Offline,
            load: false
        }

        this.onErrorVideo = this.onErrorVideo.bind(this);
    }

    componentDidMount(){
        this.setState({
            url: this.props.data.url
        });
    }

    onErrorVideo(){

        this.setState({
            url: Offline,
            load: true
        });

        
    }

    render(){


        return (
        
        <Container fixed>
        
      
            <div class="card">
                <div className="button_back" onClick={this.props.goBack}>Back</div>
                <div class="col2">
                    {this.props.data.media_type === 'image'
                    ? <div>
                        <img src={this.props.data.url} alt="Imagen del dia"></img>
                      </div>
                    : <div className='divideodetail' onClick={this.goDetail}>
                        {/* <ReactPlayer 
                        width='100%'
                        height='100%'
                        onError={this.onErrorVideo}
                        // url={this.props.data.url}/>
                        url={this.state.url}/>

                        {this.state.load 
                        ?<p>True</p>
                        :<p>False</p>}
                        {view} */}

                        
                        {this.state.load 
                        ?<img className="offline" src={this.state.url} alt="Sin conexion"></img>
                        :<ReactPlayer 
                        width='100%'
                        height='100%'
                        onError={this.onErrorVideo}
                        url={this.state.url}/>}

                      </div>
                    }
                    <p>{this.props.data.copyright} / {this.props.data.date}</p>
                    
                    
                </div>    
                <div class="col1">
                    <h1>{this.props.data.title}</h1>
                    <p>{this.props.data.explanation}</p>
                    {this.state.load && <h4>you are offline the content will be loaded when you have internet</h4>}
                </div>
          </div>

        </Container>
        )
    }
}

export default Detail;