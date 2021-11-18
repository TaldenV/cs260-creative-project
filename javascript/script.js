var coinbaseURL = 'https://api.coinbase.com/v2/exchange-rates?currency='

document
  .getElementById('coin-submit')
  .addEventListener('click', function (event) {
    event.preventDefault()
    coin = document.getElementById('select').value
    if (coin === 'not-selected') {
      document.getElementById(
        'coin-results'
      ).innerHTML = `<div class="container">
          <div class="row justify-content-center">
            <div class="col-auto p-4">
              Please Select a Currency
            </div>
          </div>
        </div>
      `
      return
    }
    coinbaseURL += coin

    fetch(coinbaseURL)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        updateCoinResults(json.data)
      })

    coinbaseURL = 'https://api.coinbase.com/v2/exchange-rates?currency='
  })

function updateCoinResults(_data) {
  let results = `
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-auto p-4">
                ${_data.currency}
              </div>
            </div>
          </div>
          ${printAllConversions(_data)}
        `
  document.getElementById('coin-results').innerHTML = results
}

function printCurrencySelector(_data) {
  results = ''
  return results
}

function printAllConversions(_data) {
  let results = `
                <div class="container-fluid">
                  <div class="row justify-content-center">
                    <div class="col text-center">
                      <b>
                        1 ${_data.currency} = 
                        ${new Intl.NumberFormat().format(
                          _data.rates['USD']
                        )} USD
                      </b>
                    </div>
                  </div>
                `

  for (const _currency in _data.rates) {
    results += `<div class="row justify-content-center">
                  <div class="col text-center">
                    1 ${_data.currency} = 
                    ${new Intl.NumberFormat().format(
                      _data.rates[_currency]
                    )} ${_currency}
                  </div>
                </div>`
  }

  results += `</div>`

  return results
}

Object.size = function (obj) {
  var size = 0,
    key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++
  }
  return size
}
