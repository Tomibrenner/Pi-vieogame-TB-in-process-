import React, { useState } from "react";
const axios = require("axios");

const Form = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [error, setErrors] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value });

    setForm({ ...form, [property]: value });
  };

  const validate = (form) => {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      setErrors({ ...error, email: "" });
    } else {
      setErrors({ ...error, email: "algo mal" });
    }
    if (form.email === "") setErrors({ ...error, email: "email vacio" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/videogames", form)
      .then((res) => alert(res))
      .catch(err=>alert(err))
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Email: </label>
        <input
          type="text"
          value={form.email}
          onChange={changeHandler}
          name="email"
        />
        {error.email && <span>{error.email}</span>}
      </div>

      <div>
        <label>Name: </label>
        <input
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
        />
      </div>

      <div>
        <label>Phone: </label>
        <input
          type="text"
          value={form.phone}
          onChange={changeHandler}
          name="phone"
        />
      </div>

      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default Form;
