import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    // 🐨 Todo: Exercise #6
    //  ให้เขียน Logic ในการแนบ Token เข้าไปใน Header ของ Request
    // เมื่อมีการส่ง Request จาก Client ไปหา Server
    // ภายใน Callback Function axios.interceptors.request.use
    const token = localStorage.getItem("token");
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }

    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      // 🐨 Todo: Exercise #6
      //  ให้เขียน Logic ในการรองรับเมื่อ Server ได้ Response กลับมาเป็น Error
      // โดยการ Redirect ผู้ใช้งานไปที่หน้า Login และลบ Token ออกจาก Local Storage
      // ภายใน Error Callback Function ของ axios.interceptors.response.use
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      if (error.response && error.response.status === 403) {
        alert("Token is invalid");
      }

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
