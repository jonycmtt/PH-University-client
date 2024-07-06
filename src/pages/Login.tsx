import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hoooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/token.verify";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// type TUserData = {
//   id: string;
//   password: string;
// };

const Login = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((item) => item.auth);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "ami123456",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const tostId = toast.loading("Login is Loading");
    try {
      const loginInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(loginInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Success Login", { id: tostId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something error");
    }
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
