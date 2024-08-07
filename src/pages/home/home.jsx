import React from "react";
import { useGetTodos } from "./service/query/useGetTodos";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userCreateTodo } from "./service/mutation/userCreateTodo";

export const Home = () => {
  const { isLoading, data } = useGetTodos();
  const { mutate, isPending } = userCreateTodo();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    mutate(data, {
      onSuccess: () => {
        console.log("done");
      },
    });
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input {...register("title")} type="text" />
        </div>
        <div>
          <input {...register("description")} type="text" />
        </div>
        <button type="submit">send</button>
      </form>
      {isPending ? <p>loading</p> : ""}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {data?.map((item) => (
            <div
              style={{
                border: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
              }}
              key={item.id}
            >
              <Link to={`/user/${item.id}`}>
                <h1>{item.title}</h1>
              </Link>
              <button
                onClick={() => navigate(`/change-todo/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                edit{" "}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
