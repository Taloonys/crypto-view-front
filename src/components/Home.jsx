import CryptocurrencyCard from "./CryptocurrencyCard.jsx"
import React, { useEffect, useState} from 'react';
import { Menu, Spin} from 'antd';
import axios from "axios";


const apiUrl = `/api`;


function getItem(label, key, icon, children, type) {
  //
  // Item former helper
  //
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


const Home = () => {
    //
    // Home page
    //

    const [currencies, setCurrencies]     = useState([])        // items list
    const [currencyId, setCurrencyId]     = useState(1)         // load head item -> Bitcoin
    const [currencyData, setCurrencyData] = useState(null)      // full currency info for Card

    const fetchCurrency = (currencyId) => {
        //
        // Fetch data by it's id
        //
        axios.get(`${apiUrl}/${currencyId}`)
            .then(respone => setCurrencyData(respone.data))
            .catch(error => 
            console.log(`Failed to fetch currency, currencyId = ${currencyId}, error: `, error))
    }

    const onClick = (e) => {
    setCurrencyId(e.key)
    };

    const fetchCurrencies = () => {
        axios.get(apiUrl)
            .then(response => {
            //
            // Form currency list with concrete data
            //
            const currenciesList = response.data
            const menuItems = [ 
                getItem(
                "Cryptocurrency", 
                'g1', 
                null,
                currenciesList.map((currency) => { 
                    return { label: currency.name, key: currency.id } 
                }),
                "group"
                )
            ]

            setCurrencies(menuItems)
            })
    }

    useEffect( () => {
        //
        // Load currency list once
        //
        fetchCurrencies()
    }, []);

    useEffect( () => {
        //
        // Fetch concrete currency data whenever currencyId is changed
        //
        setCurrencyData(null)
        fetchCurrency(currencyId)
    }, [currencyId]);

    return (
    /* List | (updateable) Card */
    <div className="flex gap-3">
        <Menu
        onClick={onClick}
        style={{
            width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={currencies}
        className="h-screen overflow-scroll"
        />
        <div className="mx-auto my-auto">
        { currencyData 
            ? ( <CryptocurrencyCard currency={currencyData}/> )
            : ( <Spin size="large"/> )
        }
        </div>
    </div>
    );
}


export default Home;