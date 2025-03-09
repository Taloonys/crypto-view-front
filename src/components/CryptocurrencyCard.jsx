import {Card} from "antd"

function CryptocurrencyCard(props) {
  const {currency} = props

  const price = Math.round(currency.quote.USD.price)
  const volumeChange = Math.round(currency.quote.USD.volume_change_24h * 100) / 100
  const marketDominance = Math.round(currency.quote.USD.market_cap_dominance)

  return (
    <div>
      <Card
        title={
          <div className="flex items-center gap-3">
              <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}/>
              <span> {currency.name} </span>
          </div>
          }

        style={{
          width: 300,
        }}
      >
        <p>Current quote: {price} $</p>
        <p>Volume change(24h): {volumeChange} %</p>
        <p>Market Dominance: {marketDominance} $</p>
      </Card>
    </div>
  )
}

export default CryptocurrencyCard