import React, { Component } from "react";
import "./App.css";

const SECURITY_CODE = "enfocate";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      success: false,
      value: "",
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  componentDidMount() {}

  componentDidUpdate() {
    if (!!this.state.loading) {
      setTimeout(() => {
        if (this.state.value !== SECURITY_CODE) {
          this.setState({
            error: true,
            success: false,
          });
        } else {
          this.setState({
            success: true,
            error: false,
          });
        }
        this.setState({
          loading: false,
        });
      }, 2000);
    }
  }

  render() {
    const { error, value, loading, success } = this.state;
    return (
      <div className="container">
        <h1 className="title">{this.props.name}</h1>
        {(!success && !loading && !error) && (
          <p className="default-msg">
            Por favor, ingrese su código de seguridad
          </p>
        )}
        {(success && !loading) && <p className="aut-msg">Autenticado!</p>}
        {(error && !loading) && <p className="error-msg">Error de Consola</p>}
        {loading && <p className="loading-msg">Cargando...</p>}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Something"
            value={value}
            onChange={(e) => {
              this.setState({
                value: e.target.value,
              });
            }}
          />
          <button
            onClick={() => {
              this.setState({
                loading: true,
              });
            }}
          >
            Comprobar
          </button>
        </div>
      </div>
    );
  }
}

export default ClassComponent;
