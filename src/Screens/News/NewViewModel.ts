import {useState} from "react";

export default function NewViewModel() {

    const [tagList,setTagList] = useState([])



    return{
        tagList
    }
}
