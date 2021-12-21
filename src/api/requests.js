import axios from "axios";

// hàm này có tác dụng nếu gọi axios có headers để lấy tôken thì nó sẽ tự đông lấy header , ko cần gọi lại header 

export const request = ({ url, body, params, method }) => {
    const variables = {
        url,
        data: body,
        params,
        method

    }
    const token = localStorage.getItem("t")
    if (token) {
        variables.headers = {
            Authorization: "Bearer " + token,
        }
    }
    return axios(variables);


}