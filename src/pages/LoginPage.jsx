import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";
import LoginForms from "../components/form/LoginForms";
import { TEInput } from "./SignupPage.styled";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const { mutate: loginUser, isLoading, isError, error } = useLogin();

  const handleLoginSubmit = async (credentials) => {
    try {
      await loginUser(credentials);
      console.log(credentials);
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const handleSocialLogin = (socialLoginMethod) => async () => {
    try {
      await socialLoginMethod();
    } catch (err) {
      console.error("Social login failed:", err.message);
    }
  };

  return (
    <LoginForms>
      <div>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <div>
            <span className="text-3xl inline-block pb-8">로그인</span>
            <div className="relative w-full h-full">
              <TEInput
                type="email"
                placeholder="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "올바른 이메일 형식을 입력해주세요.",
                  },
                })}
                error={errors.email?.message}
                size="lg"
                className="mb-6 px-7 pb-2.5 pt-3 text-sm border-neutral-100 border border-solid"
                style={{
                  border: "1px solid rgb(245,245,245)",
                }}
              />
              {errors.email && (
                <p
                  className="absolute right-4 top-0 text-sm text-red-400"
                  style={{ lineHeight: "44px" }}
                >
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative w-full h-full">
              <TEInput
                type="password"
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                size="lg"
                className="mb-6 px-7 pb-2.5 pt-3 text-sm"
                style={{
                  border: "1px solid rgb(245,245,245)",
                }}
              />
              {/* {errors.password && (
                <p
                  className="absolute right-4 top-0 text-sm text-red-400"
                  style={{ lineHeight: "44px" }}
                >
                  {errors.password.message}
                </p>
              )} */}
            </div>
            {/* <!-- Submit button --> */}
            <button
              type="submit"
              className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              style={{ backgroundColor: "#8a0ec4" }}
            >
              로그인
            </button>
            {/* <!-- Divider --> */}
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                OR
              </p>
            </div>

            {/* <!-- Social login buttons --> */}
            <a
              className="mb-3 flex h-11 w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
              style={{ backgroundColor: "#FFFFFF" }}
              href="#!"
              role="button"
              // onClick={handleSocialLogin(googleLogin)}
            >
              <img src="/web_light_rd_ctn.svg" alt="google login" />
            </a>
            <a
              className="relative box-border mb-3 h-11 flex w-full items-center justify-center rounded bg-info text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(84,180,211,0.3)] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)]"
              style={{ backgroundColor: "#FEE500" }}
              href="#!"
              role="button"
              // onClick={handleSocialLogin(kakaoLogin)}
            >
              <img
                src="/kakao_login_medium_narrow.png"
                className="h-full"
                alt="kakao"
              />
            </a>
            <a
              className="relative box-border mb-3 h-11 flex w-full items-center justify-center rounded bg-info text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(84,180,211,0.3)] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)]"
              style={{ backgroundColor: "#00C73C" }}
              href="#!"
              role="button"
              // onClick={handleSocialLogin(naverLogin)}
            >
              <img src="/btnG_naver.png" className="h-full" alt="naver" />
            </a>
          </div>
        </form>
      </div>
    </LoginForms>
  );
};

export default LoginPage;
