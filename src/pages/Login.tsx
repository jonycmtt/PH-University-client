import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hoooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/token.verify";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

// type TUserData = {
//   id: string;
//   password: string;
// };

const Login = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((item) => item.auth);
  const navigate = useNavigate();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const tostId = toast.loading("Login is Loading", { duration: 2000 });
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
      toast.error("Something error", { id: tostId, duration: 2000 });
    }
  };
  return (
    <>
      <div>
        <p> Login user : {state?.user?.userId}</p>
      </div>
      <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
        <PHForm defaultValues={defaultValues} onSubmit={onSubmit}>
          <div>
            <PHInput type="text" placeholder="UserId" name="id" label={"Id"} />
          </div>
          <div>
            <PHInput
              label={"Password"}
              type="password"
              placeholder="Your Password"
              name="password"
            />
          </div>
          <Button htmlType="submit">Login</Button>
        </PHForm>
      </Row>
    </>
  );
};

export default Login;
