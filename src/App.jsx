import CryptocurrencyCard from "./components/CryptocurrencyCard.jsx"
import React, { useEffect, useState} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Spin} from 'antd';
import axios from "axios";


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


const App = () => {
  const [currencies, setCurrencies]     = useState([])        // items list
  const [currencyId, setCurrencyId]     = useState(1)         // load head item -> Bitcoin
  const [currencyData, setCurrencyData] = useState(null)      // full currency info for Card

  const fetchCurrency = (currencyId) => {
    //
    // Fetch data by it's id
    //
    axios.get(`http://127.0.0.1:8081/cryptocurrencies/${currencyId}`)
      .then(respone => setCurrencyData(respone.data))
      .catch(error => 
        console.log(`Failed to fetch currency, currencyId = ${currencyId}, error: `, error))
  }

  const onClick = (e) => {
    setCurrencyId(e.key)
  };

  const fetchCurrencies = () => {
    axios.get('http://127.0.0.1:8081/cryptocurrencies')
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
};


export default App
