import React, { useState, useCallback } from "react";
import Game from "../Game";
import { useFormik } from "formik";
import * as yup from "yup"; // import tất cả trong yup với tên đại diên là yup
import { useDispatch } from "react-redux";
import useStyle from "./style"; // return về 1 hook

//set Validation
const validationSchema = yup.object().shape({
  username: yup.string().required("this field is require!"),
  email: yup
    .string()
    .required("this field is required!")
    .email("Invalid email!"),
  phone: yup
    .string()
    .required("this field is reuired!")
    .matches(/^[0-9]+$/g, "Invalid phone number"),
  // schema cho phone dùnd regular expression(regEx) (cái biếu thức chính qui dành cho số)
});
const Home = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const classes = useStyle();

  const dispatch = useDispatch();

  //const [a, setA] = useState();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
    },
    validationSchema, // do đật trùng tên nên viết 1 chữ th,
    validateOnMount: true,
  });
  // console.log(formik.values);
  const setAllTouched = useCallback(() => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key);
    });

    // Hàm key() này có tác dụng lấy từng key trong, r sau đó gán giá trị vào nhữn key đó
  }, [formik]);
  //Hàm sau có tác dụng nếu giá trị trong nó thì nó sẽ thay đổi cái function đó
  // hàm này nếu ko truyên gia strij vào và nhấn nút thì sẽ tự hiện ra lỗi,
  //useCallback : chụp function lại lần đầu tirn , những lần au khi reder lại , nếu gtri sau đổi thì hàm đó sẽ dc tạo mới tại , ngước lại

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setAllTouched();

      // console.log(formik.values);
      if (!formik.isValid) return;
      setIsGameStarted(true);
      dispatch({
        type: "ADD_PLAYERS",
        payload: { ...formik.values, totalPoint: 25000, cards: [] },
      });
    },
    [formik, dispatch, setAllTouched]
  );
  const setDefaultPlayer = useCallback(() => {
    const defaultPlayer = {
      username: "poong",
      email: "poooong@pooong.poooong",
      phone: "12245",
    };
    formik.setValues(defaultPlayer);
  }, [formik]);
  // tạo hàm , gán giá trị vào fomik  , sau đó từ formik gắn giá trị vào ô input để hiện lên
  return (
    <>
      {isGameStarted ? (
        <Game></Game>
      ) : (
        <div
          className="text-center"
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="diplay-4 mb-5"> Welcome to Pocker Center</h1>
          <h3 className={classes.title}>Fill your info and start</h3>
          <form onSubmit={handleSubmit} className="w-25 mx-auto">
            <input
              type="input"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="username"
              className="w-100 form-control mb-3"
            />
            {formik.touched.username && (
              <p className="text-danger">{formik.errors.username}</p>
            )}
            {/* toán tử && có tác dụng : nếu vế đầu đúng thì xét đến vế 2, cả 2 đúng thì mới hiện ra */}
            {/* Muốn sử dụng touched  cần sử dụng onBlur trên phầnn input */}
            <input
              type="input"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="email"
              className="w-100 form-control mb-3"
            />
            {formik.touched.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
            <input
              type="input"
              value={formik.values.phone}
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="phone"
              className="w-100 form-control mb-3"
            />
            {formik.touched.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
            <button className="btn btn-success">Start new Game</button>
            <button
              className="btn btn-info"
              onClick={setDefaultPlayer}
              type="button"
            >
              Set Default Player
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Home;
