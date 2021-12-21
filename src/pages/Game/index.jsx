import React, { Fragment, useEffect, memo } from "react";
// memo có tác dụng như killComponent : có tác dụng khi component cha ko liên quan component game (thì khi cha nó load thì component này mới load)
import "./index.css";
import Controls from "../../components/Control";
import Main from "../../components/Main";
import axios from "axios";
import { useDispatch } from "react-redux";

const Game = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://deckofcardsapi.com/api/deck/new/",
    })
      .then((res) => {
        dispatch({ type: "SET_DECK_CARD", payload: res.data });
      })
      .catch((er) => {
        console.log(er);
      });
  }, [dispatch]);
  // []: rỗng sẽ chạy 1 lần , nếu có biến trong dependency thì nó sẽ render dựa  theo biến trong đó . Neếu ko có [] (ko có dependency thì sẽ render lại 3 lần : didmount , didUpdate, willUnMount)
  // Phải có dependency
  // use Effect (life cycle) là didmount là [] , didupdate [biến],willunmout
  return (
    <Fragment>
      <Controls />
      <Main />
    </Fragment>
  );
};
// fragment có tác dụng như <> </>

export default memo(Game);
