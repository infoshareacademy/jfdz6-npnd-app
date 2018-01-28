import React, {Component} from 'react'

import './WelcomePage.css'

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <div className="flex-container">
          <div className="description gray-background">
            <p><span className="header-text"><b>Witaj w aplikacji, która uczyni Cię bogatym!</b></span></p>
              <ul>
                <li>Zawsze czułeś zawód po kliknięciu w reklamę mówiącą
                  "Pracuj godzinę dziennie i zarabiaj 10,000 zł?" i zorientowaniu się, że to zwykła ściema?
                </li>
                <li>Rozczarowywałeś się, kiedy wchodziłeś na stronę
                  mającą pokazać "jak dzięki tej prostej sztuczce przeszedł on na emeryturę w wieku 20 lat"?
                </li>
                <li>Czy
                  zastanawiałeś się jak to jest, że ci ludzie w dresach i złotych łańcuchah z cygarem w ustach i
                  plikiem
                  banknotów w dłoni mają już rewelacyjne życie, podczas gdy Ty nie jesteś nawet w stanie polecieć na
                  Malediwy raz w miesiącu?
                </li>
              </ul>
          </div>
          <div className="description black-background">
            <p><span className="header-text"><b>Po rejestracji zyskasz dostęp do finansowych supermocy!</b></span></p>
              <ul>
                <li>Będziesz mógł przeliczać ilość dowolnej waluty na inną!
                </li>
                <li>Będziesz mógł oglądać najbardziej aktualny kurs walut jaki tylko jest na świecie!</li>
                <li>Dostaniesz od nas w gratisie 10,000 zł, by móc handlować walutami (tak, DZIESIĘĆ TYSIĘCY NASZYCH
                  POLSKICH ZŁOTYCH!!!)
                </li>
                <li>Zyskasz dostęp do zarządzania budżetem, by móc utrzymać kontrolę nad takimi bajońskimi kwotami.</li>
              </ul>
          </div>
          <div className='summary'>
            <p>Dzięki naszej aplikacji możesz NAPRAWDĘ stać się bogatym! Wystarczy, że
              zarejestrujesz się i praktycznie większość drogi do bogactwa masz już za sobą. Tak, to naprawdę jest
              takie łatwe!
            </p>
            <p className="right-text no-bottom-margin"><em>Powodzenia!</em></p>
            <p className="right-text"><em>Kartel NPND</em></p>
          </div>
        </div>
        <div className="center-text">
          <p className="submit-text"><b>Zaloguj się lub zarejestruj i ciesz się bogactwem!</b></p>
        </div>
      </div>
    )
  }
}


export default WelcomePage