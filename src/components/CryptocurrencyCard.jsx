import {Card} from "antd"

function CryptocurrencyCard(props) {
  const {currency} = props

  const price = Math.round(currency.quote.USD.price)
  const volumeChange = Math.round(currency.quote.USD.volume_change_24h * 100) / 100
  const marketDominance = Math.round(currency.quote.USD.market_cap_dominance)

  const volСolor = volumeChange < 0 ? "red" : "green";
  const prettyVolumeChange = (
    <span style={{color: volСolor}}> 
      {volumeChange} % 
    </span>
  );

  return (
    <div>
      <Card
        title={
          <div className="flex items-center gap-3">
              <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}/>
              <span> {currency.name} </span>
          </div>
          }

        headStyle={{
          height: 150,
          fontSize: `32px`
        }}

        style={{
          lineHeight: 2,
          width: 600,
          fontSize: `28px`
        }}
      >
        <p>Current quote: {price} $</p>
        <p>Volume change (24h): {prettyVolumeChange} </p>
        <p>Market cap dominance: {marketDominance} %</p>
      </Card>
    </div>
  )
}


export default CryptocurrencyCard