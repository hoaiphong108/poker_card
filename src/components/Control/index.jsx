import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
// import Player from "../Player";
// use Selector có tác dụng nếu lấy dữ liệu trên store về thay đổi giá trị thì sẽ render lại component
//ueStore có tác dụng chỉ lấy dữ liệu trên store về sử dụng , dữ liệu thay đổi ko ảnh hưởng render

const Control = () => {
  const deckCard = useSelector((state) => {
    return state.card.deckCard;
  });
  const playerList = useSelector((state) => {
    return state.player.playerList;
  });
  const countTurnPlay = useSelector((state) => {
    return state.card.countTurnPlay;
  });
  console.log(countTurnPlay);

  // const useStore = useStore();
  const dispatch = useDispatch();

  const shuffleCards = useCallback(() => {
    axios({
      url: `https://deckofcardsapi.com/api/deck/${deckCard.deck_id}/shuffle/`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: "SHUFFLE_CARDS",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
    const players = [...playerList];
    players.map((player) => {
      return { ...player, ...(player.cards = []) };
    });
    dispatch({
      type: "SET_PLAYERS",
      payload: players,
    });

    dispatch({
      type: "REVEAL_CARDS",
      payload: false,
    });
  }, [deckCard, dispatch, playerList]);

  const drawCards = useCallback(() => {
    axios({
      method: "GET",
      url: `https://deckofcardsapi.com/api/deck/${deckCard.deck_id}/draw/?count=12`,
    })
      .then((res) => {
        const players = [...playerList];
        console.log(players);
        for (const i in res.data.cards) {
          const playerIndex = i % 4;
          // chia lấy dư  4
          // i= 0 , playerIndex = 0 =>Card[0]=>player[0]
          // ...
          //i= 5 , playerIndex = 1 =>Card[5]=>player[1]

          players[playerIndex].cards.push(res.data.cards[i]);
        }
        dispatch({ type: "SET_PLAYERS", payload: players });
        // console.log(res.data.cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deckCard, playerList, dispatch]);
  const revealCards = useCallback(() => {
    //1. lật bài
    dispatch({ type: "REVEAL_CARDS", payload: true });
    const result = [];
    const players = [...playerList];

    players.map((player) => {
      return { ...player, ...(player.totalPoint -= 5000) };
    });
    players.forEach((player) => {
      if (checkSpecialCard(player.cards) === 30) {
        result.push(player);
      }
    });
    if (result.length > 0) {
      const diemCuoc = Math.round(20000 / result.length);
      result.forEach((player) => {
        player.totalPoint += diemCuoc;
      });
    }
    if (result.length === 0) {
      const arrScore = players.map((player) => {
        return checkPoint(player.cards);
      });
      const maxScore = Math.max(...arrScore);
      const playerMax = players.filter(
        (player) => checkPoint(player.cards) === maxScore
      );
      const diemCuoc = Math.round(20000 / playerMax.length);
      playerMax.forEach((player) => {
        return (player.totalPoint += diemCuoc);
      });
    }
    dispatch({
      type: "SET_PLAYERS",
      payload: players,
    });
    dispatch({
      type: "SET_SHUFFLE",
      payload: false,
    });
    dispatch({
      type: "TURN_GAME",
    });
  }, [dispatch, playerList]);

  //Trường hợp đặc biệt
  const checkSpecialCard = (arrCard) => {
    let result = 0;
    arrCard.forEach((card) => {
      if (
        card.value === "JACK" ||
        card.value === "QUEEN" ||
        card.value === "KING"
      ) {
        result = +10;
      }
    });
    return result;
  };
  //Trường hợp thường
  const checkPoint = (arrCard) => {
    let result = 0;
    arrCard.forEach((card) => {
      if (
        card.value === "JACK" ||
        card.value === "QUEEN" ||
        card.value === "KING" ||
        card.value === "10"
      ) {
        result += 10;
      } else if (card.value === "ACE") {
        result += 1;
      } else {
        result += card.value * 1;
      }
    });
    return result % 10;
  };
  useEffect(() => {
    if (countTurnPlay === 5) {
      const players = [...playerList];
      const arrScore = players.map((player) => {
        return player.totalPoint;
      });
      const maxScore = Math.max(arrScore);
      const playerWins = players.filter((player) => {
        return player.totalPoint === maxScore;
      });

      alert("Người chiến thắng : " + playerWins.username);
    }
  }, [countTurnPlay, playerList]);

  return (
    <div className="d-flex  justify-content-end container">
      <div className="border d-flex justify-content-center align-items-center px-2">
        <button
          className="btn btn-success mr-2"
          onClick={shuffleCards}
          disabled={deckCard.shuffled}
        >
          Shuffle
        </button>
        <button
          onClick={drawCards}
          className="btn btn-info mr-2"
          disabled={!deckCard.shuffled || playerList[0].cards.length !== 0}
        >
          Draw
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={revealCards}
          disabled={!deckCard.shuffled || playerList[0].cards.length === 0}
        >
          Reveal
        </button>
      </div>

      <div className="d-flex">
        {playerList.map((item) => {
          return (
            <div key={item.username} className="border px-3 text-center">
              <p>{item.username}</p>
              <p> {item.totalPoint} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Control;
