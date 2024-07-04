import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hoooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/token.verify";

const Login = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((item) => item.auth);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "ami123456",
    },
  });

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data) => {
    const loginInfo = {
      id: data.id,
      password: data.password,
    };
    const res = await login(loginInfo).unwrap();
    const user = verifyToken(res.data.accessToken);

    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };
  return (
    <>
      <div>
        <p> Login user : {state?.user?.userId}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id">ID :</label>
          <input
            type="text"
            placeholder="Your ID"
            id="id"
            {...register("id")}
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            placeholder="Your Password"
            id="password"
            {...register("password")}
          />
        </div>
        <Button htmlType="submit">Login</Button>
      </form>
    </>
  );
};

export default Login;
