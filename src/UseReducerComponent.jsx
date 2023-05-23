import React, { useEffect, useReducer, useState } from "react";
import "./App.css";

const SECURITY_CODE = "enfocate";

const defaultState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  success: false,
};

const actionTypes = {
  error: 'ERROR',
  loading: 'LOADING',
  success: 'SUCCESS',
  deleted: 'DELETED',
  write: 'WRITE',
  reset: 'RESET'
}

const reducerObject = (state, payload) => ({
  [actionTypes.error]: { ...state, error: true, loading: false, success: false },
  [actionTypes.loading]: { ...state, loading: true },
  [actionTypes.success]: { ...state, error: false, success: true, loading: false },
  [actionTypes.deleted]: { ...state, deleted: true },
  [actionTypes.write]: {...state, value: payload},
  [actionTypes.reset]: {
    value: "",
    error: false,
    loading: false,
    success: false,
    deleted: false,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]){
    return reducerObject(state, action.paylaod)[action.type]
  } else {
    return state
  }
}

const UseReducerComponent = (props) => {

  const [state, dispatch] = useReducer(reducer, {defaultState})

  const onLoading = () => {
    dispatch({type: actionTypes.loading})
  }

  const onError = () => {
    dispatch({type: actionTypes.error})
  }

  const onSuccess = () => {
    dispatch({type: actionTypes.success})
  }

  const onWrite = (e) => {
    dispatch({type: actionTypes.write, payload: e.target.value})
  }

  const onDelete = () => {
    dispatch({type: actionTypes.deleted})
  }

  const onReset = () => {
    dispatch({type: actionTypes.reset})
  }

  console.log(state);

  useEffect(() => {
    if (!!state.loading) {
      onLoading()
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError()
        } else {
          onSuccess()
        }
      }, 2000);
    }
  }, [state.loading]);


  if (!state.success && !state.deleted) {
    return (
      <div className="container">
        <h1 className="title">{props.name}</h1>
        {!state.error && !state.loading && (
          <p className="default-msg">
            Por favor, ingrese su código de seguridad
          </p>
        )}
        {state.error && !state.loading && (
          <p className="error-msg">Error de Consola</p>
        )}
        {state.loading && <p className="loading-msg">Cargando...</p>}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Something"
            value={state.value}
            onChange={onWrite}
          />
          <button
            id=""
            onClick={onLoading}
          >
            Comprobar
          </button>
        </div>
      </div>
    );
  } else if (state.success && !state.deleted) {
    return (
      <div className="container">
        <h1 className="title">¿Confirma Eliminar Use State?</h1>
        <div className="input-container">
          <button
            className="btn"
            onClick={onDelete}
          >
            Sí, Eliminar!
          </button>
          <button
            className="btn"
            onClick={onReset}
          >
            No, volver...
          </button>
        </div>
      </div>
    );
  } else if (state.success && state.deleted) {
    return (
      <div className="container">
        <h1 className="title">UseState eliminado</h1>
        <div className="input-container">
          <button
            className="btn"
            onClick={onReset}
          >
            Regresar
          </button>
        </div>
      </div>
    );
  }
};

export default UseReducerComponent;
