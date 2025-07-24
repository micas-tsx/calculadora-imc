import { useState } from 'react'
import styles from './App.module.css'
import arrowImage from './assets/leftarrow.png'
import { levels, calculateImc, Level } from './helpers/imc'
import { GridItem } from './components/GridItem'

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos.");
    }
  }

  const handleBackButton = () => {
    setToShow(null)
    setWeightField(0)
    setHeightField(0)
  }

  return(
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>O IMC, ou Índice de Massa Corporal, é uma medida utilizada para avaliar se uma pessoa está com o peso ideal em relação à sua altura. É um cálculo simples, feito dividindo o peso (em quilogramas) pela altura (em metros) ao quadrado. O resultado ajuda a identificar se a pessoa está abaixo do peso, com peso normal, com sobrepeso ou obesa</p>
        
          <input 
            placeholder="Digite a sua altura. Ex 1.5 (em metros)"
            type="number"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input 
            placeholder="Digite a ser peso. Ex 75.3 (em kilogramas)"
            type="number"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton} >
                <img src={arrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App