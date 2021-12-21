import React from "react";

import Player from "../Player";
import { useSelector } from "react-redux";

const MainComponent = () => {
  const playerList = useSelector((state) => {
    return state.player.playerList;
  });
  return (
    <div
      style={{ position: "relative", height: "600px" }}
      className="container"
    >
      {/* <button onClick={handleChangeState}>Change State</button> */}

      {/* <Player index={1} />
      <Player index={2} />
      <Player index={3} />
      <Player index={4} /> */}
      {playerList.map((item, i) => {
        return <Player player={item} key={item.username} index={i + 1} />;
      })}
      {/* index co tac dung de css trong ham player */}

      <img
        alt="main"
        style={{
          position: "absolute",
          width: "100px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png"
      />
    </div>
  );
};

export default MainComponent;
