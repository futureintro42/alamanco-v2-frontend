import { useSelector } from "react-redux";

// ==============================|| CONFIG - HOOKS  ||============================== //

const useConfig = () => {
    const state = useSelector(state => state.theme);
    return state;
};

export default useConfig;
