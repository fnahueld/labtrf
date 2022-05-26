
import React from 'react';
import { ReactDOM } from 'react';
import '../index.css';
import axios from "axios";

export class Grilla extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            repLegales:[],
            repLegalesBackup:[]
        }        
    }

    componentDidMount = async () => {
        try {
          const endpointgetreltrf = process.env.REACT_APP_ENDPONIT;
          const response = await axios.get(endpointgetreltrf, {
              auth:
              {
                  username:'bantotal',
                  password:'123456'
              },
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "*" ,
                "Access-Control-Request-Headers": 'Content-Type, Authorization'
              } 
          });
          this.setState({ repLegales: response.data.representantes_legales, repLegalesBackup: response.data.representantes_legales });
        } catch (error) {
          this.setState({ error });
        }
    };


    render() {
        return (
        <div>
            <div>
                <h1>Search</h1>
                <input 
                    id="busqueda" 
                    placeholder='Ingrese rut o nombre' 
                    type="text"
                    value={this.state.text}
                    onChange={(text)=>this.handleChange(text)}>

                </input>
            </div>
            <table id='RepLegales'>
               <tbody>
                  
                  {this.renderTableData()}
               </tbody>
            </table>    
        </div>
        );
    }

    handleChange(event){
        var text = event.target.value
        const setBusqueda = event.target.value; 
        console.log("Busqueda: " + event.target.value)
        const data = this.state.repLegalesBackup;
        const newData = data.filter(
            function(item){
                const itemDataRut = item.rut.toUpperCase()
                const itemDataNom = item.nombre.toUpperCase()
                const campo = itemDataRut+ " " +itemDataNom
                const textData = text.toUpperCase()
                return campo.indexOf(textData)>-1
            }
        )
        this.setState(
            {
                repLegales: newData,
                text: text
            }
        )
    }

    renderTableData() {
        return this.state.repLegales.map((repLegal, index) => {
           const { rut, nombre } = repLegal //destructuring
           return (
              <tr key={rut}>
                 <td>{rut}</td>
                 <td>{nombre}</td>
              </tr>
           )
        })
     }  
     
     renderTableHeader() {
        let header = Object.keys(this.state.repLegales[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
}

