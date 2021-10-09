import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader";

const Giphy = () => {

    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [isError, setIsError] = useState(false);

    const [search, setBuscar] = useState("");

    //const [paginaActual, setPaginaActual], useState(1);
    
   // const [itemPagina, setItemPgina], useState(25)

    //page 


    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/trending", {
            params: {
                api_key: "shuNeLlTFu1sZGHerwvhss3T23dr5w52",
                limit: 100

            }
        });

        console.log(results);
        setData(results.data.data);


        } catch (err) {
            setIsError(true);
            console.log(err);
            setTimeout(() => setIsError(false), 4000)

        }

        
        setIsLoading(false);

        };

        fetchData();
    }, []);


    const renderGifs = () => {
        if (isLoading){
            return <Loader />;
        }


        return data.map(imagenes => {
            return (
            <div key={imagenes.id} className="gif">
                <img src={imagenes.images.fixed_height.url}/>
            </div>
            )
        })
    };

    const renderError = () => {
        if (isError) {
            return (
                <div className=".alert alert-danger
                alert-dismissible fabe show" role="alert">
                    No se pueden cargar los Gifs, intente mas tarde.
                    
                </div>
            )
        }
    }

    const cambiarManual = event => {
        setBuscar(event.target.value);
    };


    const cambiarEnvio = async event => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);

        
        const results = await  axios("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "shuNeLlTFu1sZGHerwvhss3T23dr5w52",
                q: search,
                limit: 100
            }
        });

        setData(results.data.data);
        setIsLoading(false);

    };



    return (
        <div className="m-2">
            {renderError()}
            <form className="form-inline justify-content-center m-2">

                <input value={search} onChange={cambiarManual} type="text" placeholder="buscar"
                className="form-control" />

                <button onClick={cambiarEnvio} type="submit" className="btn btn-primary mx-2">
                    Ir
                </button>
            </form>
        <div className="container gifs"> {renderGifs() } </div>
        </div>
    )
};

export default Giphy;