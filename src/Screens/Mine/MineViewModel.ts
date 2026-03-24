import {useSelector} from "react-redux";

export default function MineViewModel() {
    const userInfo = useSelector(state => state?.userInfo);

    return{
        userInfo
    }
}
