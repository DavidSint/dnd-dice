import { useEffect } from "react"
import { useHistory } from "react-router"
import { Header } from "../Components"
import { useDice } from "../utils"

export default function LoadGamePage(){
  const { setMod } = useDice()
  const history = useHistory()
  useEffect(() => {
    document.title = "D&D Dice"
    const gameId = prompt("Please enter a game ID", "")
    if (gameId !== null && gameId !== "") {
      history.push(`/${gameId}`);
    }
    setMod(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <>
      <Header />

      <div className="container">
        <main className="main">
          <div className="filterScroller">
            <div className="filterScroller-container">
            </div>
          </div>
          <div className="diceTotal">
          </div>
          <div className="diceGrid" >
          </div>
          <div className="main-footer" tabIndex={-1}>
            <div className="dice">
            </div>
            <div className="modifier">
            </div>
            <div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}