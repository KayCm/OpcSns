import {useState} from "react";

function TagsMenuViewModel() {

    const [tagsData,setTagsData] = useState([])

    return{
        tagsData
    }

}

export default TagsMenuViewModel
