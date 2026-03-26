import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {R_POST} from "../../Services/NetRequestService";

export default function NewViewModel() {

    const [tagList,setTagList] = useState(['abc','cde'])


    useEffect(()=>{

        // queryTags()

    },[])





    // const queryTags = () => {
    //
    //     const info = useQuery({ queryKey: ['todos'], queryFn:()=> R_POST('/open-api/mobile/home/tag/list')})
    //
    //
    //     console.log('info:',info)
    //
    //     // R_POST('/open-api/mobile/home/tag/list').then(res=>{
    //     //     console.log(res)
    //     // })
    //
    // }


    return{
        tagList
    }
}
