import { useSelector } from "react-redux";

function withAuth(Component) {
  return (props) => {
    const isAuth = useSelector((state) => Boolean(state.auth.user.id));

    return <Component isAuth={isAuth} {...props} />;
  };
}

export default withAuth;